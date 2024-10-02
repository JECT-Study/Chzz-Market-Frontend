import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePatchBid, usePostBid } from '@/components/bid/queries';

import AuctionItem from '@/components/common/item/AuctionItem';
import BidCaution from '@/components/bid/BidCaution';
import BidFooter from '@/components/bid/BidFooter';
import FormField from '@/components/common/form/FormField';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout/Layout';
import { convertCurrencyToNumber } from '@/utils/convertCurrencyToNumber';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import { getBidSchema } from '@/constants/schema';
import { useEditableNumberInput } from '@/hooks/useEditableNumberInput';
import { useGetAuctionDetails } from '@/components/details/queries';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Bid = () => {
  const [check, setCheck] = useState<boolean>(false);
  const toggleCheckBox = () => setCheck((state) => !state);
  const auctionId = useLoaderData() as number;
  const { auctionDetails } = useGetAuctionDetails(auctionId);
  const { mutate: postBid } = usePostBid(auctionId);
  const { mutate: patchBid } = usePatchBid(auctionId);

  const { imageList, productName, minPrice, participantCount, remainingBidCount, bidAmount, timeRemaining, isParticipating, bidId } = auctionDetails;
  const title = isParticipating ? '금액 수정하기' : '경매 참여하기';

  const BidSchema = getBidSchema(minPrice);
  type FormFields = z.infer<typeof BidSchema>;

  const {
    control,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: { bidAmount: '' },
    resolver: zodResolver(BidSchema),
  });

  const { isEditing, handleBlur, handleFocus } = useEditableNumberInput({
    name: 'bidAmount',
    setValue,
    getValues,
  });

  const onPostSubmit: SubmitHandler<FormFields> = async (data) => {
    const bidData = {
      auctionId: Number(auctionId),
      amount: convertCurrencyToNumber(data.bidAmount),
    };

    postBid(bidData);
  };
  const onPatchSubmit = () => {
    if (bidId) patchBid(bidId);
  };

  return (
    <Layout>
      <Layout.Header title={title} />
      <Layout.Main>
        <div className='flex flex-col gap-8'>
          <AuctionItem axis='row' label='입찰 상품'>
            <AuctionItem.Image src={imageList[0]} time={timeRemaining} />
            <AuctionItem.Main kind='register' name={productName} count={participantCount} price={minPrice} />
          </AuctionItem>
          {isParticipating && (
            <div className='flex flex-col gap-2'>
              <div className='text-heading3'>나의 참여 금액</div>
              <div aria-label='나의 참여 금액' className='text-body1Bold text-cheeseYellow'>
                {formatCurrencyWithWon(bidAmount)}
              </div>
            </div>
          )}
          <FormField
            label='가격 제안하기'
            name='bidAmount'
            control={control}
            error={errors.bidAmount?.message}
            render={(field) => (
              <Input
                id='가격 제안하기'
                type={isEditing ? 'number' : 'text'}
                placeholder={`최소 입찰가는 ${formatCurrencyWithWon(minPrice + 1000)} 입니다.`}
                className=' focus-visible:ring-cheeseYellow'
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
        <BidFooter remain={remainingBidCount} check={check} isSubmitting={isSubmitting} handlePatch={onPatchSubmit} handlePost={handleSubmit(onPostSubmit)} />
      </Layout.Footer>
    </Layout>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};

export default Bid;
