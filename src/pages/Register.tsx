import { LoaderFunction, useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/common/Button';
import FormField from '@/components/common/form/FormField';
import type { IRegister } from 'Register';
import ImageUploader from '@/components/register/ImageUploader';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout/Layout';
import NoticeIcon from '@/assets/icons/notice.svg';
import RegisterCaution from '@/components/register/RegisterCaution';
import RegisterLabel from '@/components/register/RegisterLabel';
import { RegisterSchema } from '@/constants/schema';
import { Textarea } from '@/components/ui/textarea';
import { categories } from '@/constants/categories';
import { convertCurrencyToNumber } from '@/utils/convertCurrencyToNumber';
import { useEditableNumberInput } from '@/hooks/useEditableNumberInput';
import { usePostRegister } from '@/components/register/quries';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type FormFields = z.infer<typeof RegisterSchema>;

const defaultValues = {
  productName: '',
  images: [],
  category: '',
  description: '',
  minPrice: '',
};

const Register = () => {
  // const preAuctionId = useLoaderData() as number;
  const navigate = useNavigate();
  const [caution, setCaution] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const { mutate: register } = usePostRegister();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm<FormFields>({
    defaultValues,
    resolver: zodResolver(RegisterSchema),
  });

  const { isEditing, handleBlur, handleFocus } = useEditableNumberInput({
    name: 'minPrice',
    setValue,
    getValues,
  });

  const title = caution === '' ? '경매 등록하기' : `주의사항`;
  const cautionButton = caution === 'REGISTER' ? '바로 등록하기' : '사전 등록하기';
  const finalButton = isSubmitting ? '등록 중...' : cautionButton;

  const toggleCheckBox = () => setCheck((state) => !state);
  const clickBack = () => (caution === '' ? navigate(-1) : setCaution(''));
  const handleProceed = (proceedType: 'PRE_REGISTER' | 'REGISTER') => {
    handleSubmit(() => {
      // 유효성 검사가 통과되면 실행.
      setCaution(proceedType);
    })();
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { productName, category, description, minPrice } = data;
    const formData = new FormData();

    const registerData: IRegister = {
      productName,
      category,
      description,
      minPrice: convertCurrencyToNumber(minPrice),
      auctionRegisterType: caution,
    };

    formData.append(
      'request',
      new Blob([JSON.stringify(registerData)], {
        type: 'application/json',
      })
    );

    files.forEach((file) => formData.append('images', file));
    register(formData);
  };

  return (
    <Layout>
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
                <ImageUploader files={files} setFiles={setFiles} images={field.value as string[]} setImages={(images: string[]) => field.onChange(images)} />
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
                      {Object.values(categories).map((el) => (
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
                  onBlur={handleBlur}
                  onFocus={handleFocus}
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
            <RegisterLabel label='경매 마감 시간*'>
              <Input id='경매 마감 시간*' type='text' defaultValue='24 시간' disabled className='text-gray1 border-gray2 bg-[#f1f1f1]' />
              <img src={NoticeIcon} alt='notice' className='absolute bottom-[17%] right-[2%]' />
            </RegisterLabel>
          </form>
        ) : (
          <RegisterCaution kind={caution} check={check} handleCheck={toggleCheckBox} />
        )}
      </Layout.Main>
      <Layout.Footer type={caution === '' ? 'double' : 'single'}>
        {caution === '' ? (
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
            disabled={!check || isSubmitting}
            onClick={handleSubmit(onSubmit)}
            aria-label='최종 등록 버튼'
            loading={isSubmitting}
          >
            {finalButton}
          </Button>
        )}
      </Layout.Footer>
    </Layout>
  );
};

export default Register;

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { preAuctionId } = params;

  return preAuctionId;
};
