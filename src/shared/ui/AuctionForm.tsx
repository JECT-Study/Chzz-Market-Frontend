import { Button, CATEGORIES, FormField, Input, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Textarea, convertCurrencyToNumber, formatCurrencyWithWon, useToggleState } from "@/shared";

import { Layout } from "@/app/layout";
import type { IPreAuctionDetails } from "@/entities";
import { usePatchPreAuction } from "@/features/edit-auction";
import { ImageUploaderInput, RegisterCaution, RegisterSchema, convertDataURLtoFile, getAuctionUploadURLs, uploadImagesToS3, useEditableNumberInput, usePostAuction, type IRegisterPatch, type IRegisterPost } from "@/features/register";
import NoticeIcon from '@/shared/assets/icons/notice.svg';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

type FormFields = z.infer<typeof RegisterSchema>;
interface ExistingImage {
  imageId: number;
  imageUrl: string;
  firstIdx: number
}

const defaultValues = {
  auctionName: '',
  category: '',
  minPrice: '',
  description: '',
  images: []
}

export const AuctionForm = ({ preAuction }: { preAuction?: IPreAuctionDetails }) => {
  const navigate = useNavigate();
  const [caution, setCaution] = useState<string>('');
  const [check, toggle] = useToggleState(false)
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([])

  const { mutate: patchPreAuction, isPending: patchPending } = usePatchPreAuction();
  const { mutate: register, isPending: postPending } = usePostAuction();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormFields>({
    defaultValues: preAuction ? {
      auctionName: preAuction.auctionName,
      category: CATEGORIES[preAuction.category].code,
      minPrice: formatCurrencyWithWon(preAuction.minPrice),
      description: preAuction.description,
      images: preAuction.images.map(el => el.imageUrl)
    } : defaultValues,
    resolver: zodResolver(RegisterSchema),
  });

  const { isEditing, handleBlur, handleFocus, preventArrowKeys, preventInvalidInput } = useEditableNumberInput({
    name: 'minPrice',
    setValue,
    getValues,
  });

  const title = caution ? '주의사항' : preAuction ? '사전 경매 수정하기' : '경매 등록하기';
  const clickBack = () => {
    (caution === '' ? navigate(-1) : setCaution(''));
    toggle()
  }
  const handleProceed = (proceedType: 'PRE_REGISTER' | 'REGISTER') => {
    handleSubmit(() => setCaution(proceedType))();
  };

  const onPatchSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!preAuction) {
      toast.error('잘못된 접근입니다.')
      return;
    }
    const { auctionName, images, category, description, minPrice } = data;

    // 유저가 정한 최종 이미지 순서
    const previewImageSequence = images.map((image, idx) => ({ id: idx + 1, image }))
    // 새로 삽입한 이미지만 뽑기
    const newImages = previewImageSequence.filter((el) => el.image.split(':')[0] === 'data').map((el) => ({ id: el.id, file: convertDataURLtoFile(el.image) }))

    // 기존의 이미지가 현재 어느 위치에 있는지 계산
    let imageSequence = new Map<number, number>()
    existingImages.map((el) => {
      for (const sequence of previewImageSequence) {
        if (el.imageUrl === sequence.image) {
          imageSequence.set(el.imageId, sequence.id)
        }
      }
    }).filter(Boolean)

    const newImageNames = newImages.map((el) => el.file.name)
    const newImageIds = newImages.map((el) => el.id)
    const urlsData = await getAuctionUploadURLs(newImageNames)

    const objectKeys = urlsData.map((el) => el.objectKey)
    const objectKeyBuffer = new Map()
    newImageIds.forEach((id, idx) => {
      objectKeyBuffer.set(id, objectKeys[idx])
    })

    const urls = urlsData.map((el) => el.uploadUrl)
    const results = await uploadImagesToS3(urls, newImages.map((el) => el.file))
    const resultsStatus = results.every(Boolean)
    if (resultsStatus) {
      const submitData: IRegisterPatch = {
        auctionName,
        category,
        description,
        minPrice: convertCurrencyToNumber(minPrice),
        imageSequence: Object.fromEntries(imageSequence),
        objectKeyBuffer: Object.fromEntries(objectKeyBuffer)
      };
      patchPreAuction({ preAuctionId: preAuction.auctionId, submitData })
    } else {
      toast.error('이미지 전송에 실패했습니다. 다시 시도해 주세요.')
      return;
    }
  };

  const onPostSubmit: SubmitHandler<FormFields> = async (data) => {
    const { auctionName, images, category, description, minPrice } = data;

    const imageFiles = images.map(convertDataURLtoFile)
    const imageNames = imageFiles.map((el) => el.name)

    // 이미지 이름 기반으로 presigned URL 요청
    const urlsData = await getAuctionUploadURLs(imageNames)
    const urls = urlsData.map((el) => el.uploadUrl)
    const objectKeys = urlsData.map((el) => el.objectKey)

    const results = await uploadImagesToS3(urls, imageFiles)
    const resultsStatus = results.every(Boolean)
    if (resultsStatus) {
      const submitData: IRegisterPost = {
        auctionName,
        category,
        description,
        minPrice: convertCurrencyToNumber(minPrice),
        auctionRegisterType: caution,
        objectKeys
      };
      register(submitData)
    } else {
      toast.error('이미지 전송에 실패했습니다. 다시 시도해 주세요.')
      return;
    }
  };

  useEffect(() => {
    if (preAuction) {
      setExistingImages(preAuction.images.map((image, idx) => ({ ...image, firstIdx: idx + 1 })))
    }
  }, [preAuction, setExistingImages])

  return (
    <Layout>
      <Layout.Header title={title} handleBack={clickBack} />
      <Layout.Main>
        {caution === '' ? (
          <form className='flex flex-col pt-5 gap-7'>
            <FormField
              label='사진*'
              name='images'
              control={control}
              error={errors.images?.message}
              render={(field) => (
                <ImageUploaderInput images={field.value as string[] || []} setImages={(images: string[]) => field.onChange(images)} />
              )}
            />
            <FormField
              label='제목*'
              name='auctionName'
              control={control}
              error={errors.auctionName?.message}
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
          <RegisterCaution kind={caution} check={check} toggle={toggle} />
        )}
      </Layout.Main>
      <Layout.Footer type={caution === '' ? 'double' : 'single'}>
        {preAuction ? (
          <Button disabled={patchPending} loading={patchPending} onClick={handleSubmit(onPatchSubmit)} type='button' color='cheeseYellow' className='w-full h-full'>
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
            onClick={handleSubmit(onPostSubmit)}
            aria-label='최종 등록 버튼'
            loading={postPending}
          >
            등록하기
          </Button>
        )}
      </Layout.Footer>
    </Layout>
  );
}