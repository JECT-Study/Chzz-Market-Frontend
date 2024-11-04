import { useGetPreAuctionDetails } from "@/components/details/queries";
import { AccessDenied, Button, FormField } from "@/shared";
import { Input } from "@/shared/shadcn/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/shadcn/ui/select";
import { Textarea } from "@/shared/shadcn/ui/textarea";

import { Layout } from "@/app/layout/index";
import NoticeIcon from '@/shared/assets/icons/notice.svg';
import { CATEGORIES } from "@/shared/constants/categories";
import { convertCurrencyToNumber } from "@/shared/utils/convertCurrencyToNumber";
import { formatCurrencyWithWon } from "@/shared/utils/formatCurrencyWithWon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { IRegister, RegisterSchema } from "../config/index";
import { dataURLtoFile, useEditableNumberInput } from "../lib/index";
import { usePatchPreAuction, usePostAuction } from "../model/index";
import { ImageUploader, RegisterCaution } from "./index";

type FormFields = z.infer<typeof RegisterSchema>;

const defaultValues: FormFields = {
  productName: '',
  images: [],
  category: '',
  description: '',
  minPrice: '',
};

export const RegisterForm = ({ preAuctionId }: { preAuctionId: number }) => {
  const { preAuctionDetails } = useGetPreAuctionDetails(preAuctionId);
  if (preAuctionId && !preAuctionDetails?.isSeller) {
    return <AccessDenied />
  }

  const [caution, setCaution] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const navigate = useNavigate();

  const { mutate: patchPreAuction, isPending: patchPending } = usePatchPreAuction(preAuctionId);
  const { mutate: register, isPending: postPending } = usePostAuction();
  const [existingImages, setExistingImages] = useState<{ imageId: number; imageUrl: string; firstIdx: number }[]>([])
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormFields>({
    defaultValues,
    resolver: zodResolver(RegisterSchema),
  });
  const { isEditing, handleBlur, handleFocus, preventArrowKeys, preventInvalidInput } = useEditableNumberInput({
    name: 'minPrice',
    setValue,
    getValues,
  });

  const title = caution ? '주의사항' : preAuctionId ? '사전 경매 수정하기' : '경매 등록하기';
  const toggleCheckBox = () => setCheck((state) => !state);
  const clickBack = () => {
    (caution === '' ? navigate(-1) : setCaution(''));
    toggleCheckBox()
  }
  const handleProceed = (proceedType: 'PRE_REGISTER' | 'REGISTER') => {
    handleSubmit(() => setCaution(proceedType))();
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { productName, images, category, description, minPrice } = data;
    const formData = new FormData();

    // 유저가 정한 최종 이미지 순서
    const previewImageSequence = images.map((image, idx) => ({ id: idx + 1, image }))
    // 새로 삽입한 이미지만 뽑기
    const newFiles = previewImageSequence.filter((el) => el.image.split(':')[0] === 'data').map((el) => ({ id: el.id, file: dataURLtoFile(el.image) }))

    // 기존의 이미지가 현재 어느 위치에 있는지 계산
    let imageSequence = new Map<number, number>()
    if (preAuctionId) existingImages.map((el) => {
      for (const sequence of previewImageSequence) {
        if (el.imageUrl === sequence.image) {
          imageSequence.set(el.imageId, sequence.id)
        }
      }
    }).filter(image => image)

    const submitData: IRegister = {
      productName,
      category,
      description,
      minPrice: convertCurrencyToNumber(minPrice),
      ...(preAuctionId ? { imageSequence: Object.fromEntries(imageSequence) } : { auctionRegisterType: caution }),
    };

    formData.append(
      'request',
      new Blob([JSON.stringify(submitData)], {
        type: 'application/json',
      })
    );

    if (preAuctionId) newFiles.forEach((newFile) => formData.append(String(newFile.id), newFile.file))
    else newFiles.forEach((newFile) => formData.append('images', newFile.file))

    preAuctionId ? patchPreAuction({ preAuctionId, formData }) : register(formData);
  };

  useEffect(() => {
    if (preAuctionDetails) {
      const { productName, images, category, description, minPrice } = preAuctionDetails;
      setValue('productName', productName);
      setValue('images', images.map(el => el.imageUrl));
      setExistingImages(images.map((image, idx) => ({ ...image, firstIdx: idx + 1 })))
      setValue('description', description);
      setValue('minPrice', formatCurrencyWithWon(minPrice));
      setValue('category', CATEGORIES[category].code); // 카테고리 기본 값 설정
    }
  }, [preAuctionDetails, setValue]);
  return (
    <>
      <Layout.Header title={title} handleBack={clickBack} />
      <Layout.Main>
        {caution === '' ? (
          <form className='flex flex-col pt-5 gap-7' onSubmit={handleSubmit(onSubmit)}>
            <FormField
              label='사진*'
              name='images'
              control={control}
              error={errors.images?.message}
              render={(field) => (
                <ImageUploader images={field.value as string[]} setImages={(images: string[]) => field.onChange(images)} />
              )}
            />
            <FormField
              label='제목*'
              name='productName'
              control={control}
              error={errors.productName?.message}
              render={(field) => <Input id='제목*' type='text' placeholder='제목을 입력해주세요.' className='focus-visible:ring-cheeseYellow' {...field} />}
            />
            <FormField
              label='카테고리*'
              name='category'
              control={control}
              error={errors.category?.message}
              render={(field) => (
                <Select value={field.value as string} onValueChange={field.onChange}>
                  <SelectTrigger id='카테고리*' className='w-full focus:ring-cheeseYellow'>
                    <SelectValue placeholder='카테고리를 선택하세요.' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className='focus-visible:ring-cheeseYellow'>
                      {Object.values(CATEGORIES).map((el) => (
                        <SelectItem key={el.value} value={el.code}>
                          {el.value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FormField
              label='시작 가격*'
              name='minPrice'
              control={control}
              error={errors.minPrice?.message}
              render={(field) => (
                <Input
                  id='시작 가격*'
                  type={isEditing ? 'number' : 'text'}
                  placeholder='최소 시작가는 1,000원입니다.'
                  className=' focus-visible:ring-cheeseYellow'
                  {...field}
                  onInput={preventInvalidInput}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  onKeyDown={preventArrowKeys}
                />
              )}
            />
            <FormField
              label='상품 설명'
              name='description'
              control={control}
              error={errors.description?.message}
              render={(field) => (
                <Textarea
                  id='상품 설명'
                  placeholder='경매에 올릴 상품에 대해 자세히 설명해주세요.(최대 1,000자)'
                  className='focus-visible:ring-cheeseYellow'
                  {...field}
                />
              )}
            />
            <div className='relative flex flex-col gap-2'>
              <label htmlFor='경매 마감 시간*' className='cursor-pointer text-heading3'>
                경매 마감 시간*
              </label>
              <Input id='경매 마감 시간*' type='text' defaultValue='24 시간' disabled className='text-gray1 border-gray2 bg-[#f1f1f1]' />
              <img src={NoticeIcon} alt='notice' className='absolute bottom-[17%] right-[2%]' />
            </div>
          </form>
        ) : (
          <RegisterCaution kind={caution} check={check} handleCheck={toggleCheckBox} />
        )}
      </Layout.Main>
      <Layout.Footer type={caution === '' ? 'double' : 'single'}>
        {preAuctionId ? (
          <Button disabled={patchPending} loading={patchPending} onClick={handleSubmit(onSubmit)} type='button' color='cheeseYellow' className='w-full h-full'>
            수정 완료
          </Button>
        ) : caution === '' ? (
          <>
            <Button type='button' color='white' className='flex-1 h-full' onClick={() => handleProceed('PRE_REGISTER')}>
              사전 등록하기
            </Button>
            <Button type='button' color='cheeseYellow' className='flex-[2] h-full' onClick={() => handleProceed('REGISTER')}>
              바로 등록하기
            </Button>
          </>
        ) : (
          <Button
            type='button'
            color='cheeseYellow'
            className='w-full h-full'
            disabled={!check || postPending}
            onClick={handleSubmit(onSubmit)}
            aria-label='최종 등록 버튼'
            loading={postPending}
          >
            등록하기
          </Button>
        )}
      </Layout.Footer>
    </>
  );
}