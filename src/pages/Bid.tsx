import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import AuctionItem from '@/components/common/AuctionItem';
import BidCaution from '@/components/bid/BidCaution';
import { BidSchema } from '@/constants/schema';
import Button from '@/components/common/Button';
import FormField from '@/components/common/form/FormField';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout/Layout';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import { useEditableNumberInput } from '@/hooks/useEditableNumberInput';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetAuctionDetails } from '@/components/details/queries';

type FormFields = z.infer<typeof BidSchema>;

const Bid = ({ isParticipating = false }: { isParticipating?: boolean }) => {
  const navigate = useNavigate();
  const [check, setCheck] = useState<boolean>(false);
  const toggleCheckBox = () => setCheck((state) => !state);
  const auctionId = useLoaderData() as number;
  const { auctionDetails } = useGetAuctionDetails(auctionId);

  const {
    control,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: { minPrice: '' },
    resolver: zodResolver(BidSchema),
  });

  const { isEditing, handleBlur, handleFocus } = useEditableNumberInput({
    name: 'minPrice',
    setValue,
    getValues,
  });

  const {
    cdnPath,
    name,
    minPrice,
    participantCount,
    remainingBidCount,
    bidAmount,
    timeRemaining,
  } = auctionDetails;

  const buttonName = isSubmitting ? '제안 중...' : '제안하기';
  const title = isParticipating ? '금액 수정하기' : '경매 참여하기';

  const onSubmit: SubmitHandler<FormFields> = async () => {
    navigate(`/auctions/${auctionId}`);
  };

  return (
    <Layout>
      <Layout.Header title={title} handleBack={() => navigate(-1)} />
      <Layout.Main>
        <div className="flex flex-col gap-8">
          <AuctionItem axis="row" label="입찰 상품">
            <AuctionItem.Image src={cdnPath} time={timeRemaining} />
            <AuctionItem.Main
              kind="register"
              name={name}
              count={participantCount}
              price={minPrice}
            />
          </AuctionItem>
          {isParticipating && (
            <div className="flex flex-col gap-2">
              <div className="text-heading3">나의 참여 금액</div>
              <div
                aria-label="나의 참여 금액"
                className="text-body1Bold text-cheeseYellow"
              >
                {formatCurrencyWithWon(bidAmount)}
              </div>
            </div>
          )}
          <FormField
            label="가격 제안하기"
            name="minPrice"
            control={control}
            error={errors.minPrice?.message}
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
      <Layout.Footer type={isParticipating ? 'double' : 'single'}>
        {!isParticipating ? (
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
        ) : (
          <>
            <Button
              type="button"
              color="white"
              className="flex-1 h-full transition-colors rounded text-button active:bg-black"
              onClick={() => navigate(-1)}
            >
              참여 취소
            </Button>
            <Button
              type="button"
              color="cheeseYellow"
              className="flex-[2] h-full rounded text-button active:bg-black transition-colors"
              disabled={!check || isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              금액 수정
              {isParticipating && remainingBidCount !== 0
                ? `(${remainingBidCount}회 가능)`
                : '(소진)'}
            </Button>
          </>
        )}
      </Layout.Footer>
    </Layout>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};

export default Bid;
