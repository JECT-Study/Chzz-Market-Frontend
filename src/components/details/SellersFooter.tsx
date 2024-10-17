/* eslint-disable prettier/prettier */
import Button from '@/components/common/Button';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useConvertAuction } from './queries';
import Layout from '../layout/Layout';

interface SellersFooterProps {
  likeCount?: number;
  status?: string;
  auctionId: number;
}

const SellersFooter: React.FC<SellersFooterProps> = ({
  status,
  likeCount = 0,
  auctionId,
}) => {
  const { mutate: convertToAuction, isPending } = useConvertAuction();
  const onConvertClickHandler = () => convertToAuction(auctionId)

  const HeartIcon = likeCount ? AiFillHeart : AiOutlineHeart;
  const heartColor = likeCount ? "text-redNotice" : "text-gray2";

  if (status === 'PROCEEDING') {
    return (
      <Layout.Footer type='single'>
        <Button type='button' disabled className='w-full h-full'>
          내가 올린 경매
        </Button>
      </Layout.Footer>
    );
  }

  if (status === 'PENDING') {
    return (
      <Layout.Footer type='double'>
        <div className="flex items-center h-full gap-2 basis-1/3">
          <HeartIcon className={`${heartColor} size-6`} />
          <span className="pt-1 text-gray1 text-heading3">{`${likeCount}명`}</span>
        </div>
        <Button
          type="button"
          className="h-full basis-4/5"
          color="cheeseYellow"
          onClick={onConvertClickHandler}
          disabled={isPending}
          loading={isPending}
        >
          경매로 전환하기
        </Button>
      </Layout.Footer>
    );
  }

  return null;
};

export default SellersFooter;
