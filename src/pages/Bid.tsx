import BidCaution from '@/components/bid/BidCaution';
import { useGetProductDetails } from '@/components/bid/queries';
import Button from '@/components/common/Button';
import FormField from '@/components/form/FormField';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { BidSchema } from '@/constants/schema';
import { useEditableNumberInput } from '@/hooks/useEditableNumberInput';
import { getTimeColor } from '@/utils/getTimeColor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import { z } from 'zod';

type FormFields = z.infer<typeof BidSchema>;

const Bid = () => {
  const navigate = useNavigate();
  const [check, setCheck] = useState<boolean>(false);
  const toggleCheckBox = () => setCheck((state) => !state);
  const auctionId = useLoaderData() as number;

  const {
    control,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: { cost: '' },
    resolver: zodResolver(BidSchema),
  });

  const { isEditing, handleBlur, handleFocus } = useEditableNumberInput({
    name: 'cost',
    setValue,
    getValues,
  });

  const { isLoading, productDetails } = useGetProductDetails(auctionId);
  if (isLoading) return <p>Loading...</p>;
  if (!productDetails) return <p>Product not found</p>;

  const { img, name, startPrice, timeLeft, activeUserCount } = productDetails;
  const timeColor = getTimeColor(timeLeft);

  const buttonName = isSubmitting ? '제안 중...' : '제안하기';

  const onSubmit: SubmitHandler<FormFields> = async () => {
    navigate(`/product/${auctionId}`);
  };

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate(-1)}>
        경매 참여하기
      </Layout.Header>
      <Layout.Main>
        <div className="flex flex-col gap-8">
          <figure
            className="flex gap-3 py-1 text-body1 min-w-[12rem] rounded"
            aria-label="입찰 상품"
          >
            <div className="relative">
              <img
                src={img}
                alt="이미지"
                className="object-cover w-full h-[10rem] rounded"
              />
              <div
                aria-label="남은 시간"
                className={`absolute text-body2 bottom-0 w-full pt-1 text-center bg-white opacity-80 ${timeColor} border-b-2`}
              >
                {timeLeft}시간 남음
              </div>
            </div>
            <figcaption className="flex flex-col gap-1">
              <h3 aria-label="이름" className="text-gray1 text-heading3">
                {name}
              </h3>
              <div aria-label="시작 가격" className="text-body1Bold text-gray1">
                {startPrice}
              </div>
              <div
                aria-label="경매 참여자 수"
                className="flex items-center text-body2 text-gray2"
              >
                <AiOutlineUsergroupDelete />
                <span>경매 참여자 {activeUserCount}명</span>
              </div>
            </figcaption>
          </figure>
          <FormField
            label="가격 제안하기"
            name="cost"
            control={control}
            error={errors.cost?.message}
            render={(field) => (
              <Input
                id="가격 제안하기"
                type={isEditing ? 'number' : 'text'}
                placeholder="최소 입찰가는 1,000원 입니다."
                className=" focus-visible:ring-cheeseYellow"
                {...field}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
            )}
          />
          <BidCaution check={check} handleCheck={toggleCheckBox} />
        </div>
      </Layout.Main>
      <Layout.Footer>
        <Button
          type="button"
          color="cheeseYellow"
          className="w-full h-full transition-colors rounded text-button active:bg-black"
          aria-label="제안하기 버튼"
          onClick={handleSubmit(onSubmit)}
          disabled={!check || isSubmitting}
        >
          {buttonName}
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};

export default Bid;
