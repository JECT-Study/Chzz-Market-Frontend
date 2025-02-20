import { MAX_BID_COUNT } from '@/shared/constants/bid';
import { useToggleState } from '@/shared/hooks/useToggleState';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Layout } from '@/app/layout';
import type { IAuctionDetails } from '@/entities/auction';
import { useGetAuctionDetails } from '@/features/details';
import { useEditableNumberInput } from '@/features/register';
import { AuctionItem } from '@/shared/ui/AuctionItem';
import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/input';
import { convertCurrencyToNumber } from '@/shared/utils/convertCurrencyToNumber';
import { formatCurrencyWithWon } from '@/shared/utils/formatCurrencyWithWon';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getBidSchema } from '../config';
import { usePostBid } from '../model';
import { BidCaution } from './BidCaution';

export const BidForm = ({ auctionId }: { auctionId: number }) => {
  const { details } = useGetAuctionDetails<IAuctionDetails>(auctionId);
  const { mutate: postBid, isPending } = usePostBid(auctionId);
  const [check, toggle] = useToggleState(false);

  const {
    images,
    auctionName,
    minPrice,
    participantCount,
    remainingBidCount,
    bidAmount,
    timeRemaining,
    isParticipated
  } = details;
  const BidSchema = getBidSchema(minPrice, bidAmount);
  type FormFields = z.infer<typeof BidSchema>;
  const maxFlag = remainingBidCount === MAX_BID_COUNT;
  const zeroFlag = remainingBidCount === 0;

  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit
  } = useForm<FormFields>({
    defaultValues: { bidAmount: '' },
    resolver: zodResolver(BidSchema)
  });

  const {
    isEditing,
    handleBlur,
    handleFocus,
    preventArrowKeys,
    preventInvalidInput
  } = useEditableNumberInput({
    name: 'bidAmount',
    setValue,
    getValues
  });

  const onPostSubmit: SubmitHandler<FormFields> = async (data) => {
    const bidData = {
      auctionId: Number(auctionId),
      bidAmount: convertCurrencyToNumber(data.bidAmount)
    };

    postBid(bidData);
  };
  return (
    <Layout>
      <Layout.Header title="경매 참여하기" />
      <Layout.Main>
        <div className="flex flex-col gap-8">
          <AuctionItem axis="row" label="입찰 상품">
            <AuctionItem.Image src={images[0].imageUrl} time={timeRemaining} />
            <AuctionItem.Main
              kind="register"
              name={auctionName}
              count={participantCount}
              price={minPrice}
            />
          </AuctionItem>
          {isParticipated && (
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
            name="bidAmount"
            control={control}
            error={errors.bidAmount?.message}
            render={(field) => (
              <Input
                id="가격 제안하기"
                type={isEditing ? 'number' : 'text'}
                placeholder={`최소 입찰가는 ${formatCurrencyWithWon(minPrice)} 입니다.`}
                className=" focus-visible:ring-cheeseYellow"
                {...field}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={preventArrowKeys}
                onInput={preventInvalidInput}
              />
            )}
          />
          <BidCaution check={check} toggle={toggle} />
        </div>
      </Layout.Main>
      <Layout.Footer type={isParticipated ? 'double' : 'single'}>
        <Button
          type='button'
          color='cheeseYellow'
          className='w-full h-full transition-colors rounded text-button active:bg-black'
          ariaLabel={maxFlag ? '제안하기' : '수정하기'}
          onClick={handleSubmit(onPostSubmit)}
          disabled={zeroFlag || !check || isPending}
          loading={isPending}
        >
          {maxFlag
            ? '제안하기'
            : `금액 수정 ${zeroFlag ? '(소진)' : `(${remainingBidCount}회 가능)`}`}
        </Button>
      </Layout.Footer>
    </Layout>
  );
};
