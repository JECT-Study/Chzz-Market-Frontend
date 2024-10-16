/* eslint-disable prettier/prettier */
import Button from '@/components/common/Button';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useConvertToAuction } from './queries';

interface SellersFooterProps {
  isSeller: boolean;
  likeCount?: number;
  status?: string;
  auctionId: number;
}

const SellersFooter: React.FC<SellersFooterProps> = ({
  isSeller,
  status,
  likeCount = 0,
  auctionId,
}) => {
  const { mutate: convertToAuction } = useConvertToAuction();
  const navigate = useNavigate();
  const onConvertClickHandler = () => {
    convertToAuction(auctionId);
    navigate('/');
  };

  const HeartIcon = likeCount ? AiFillHeart : AiOutlineHeart;
  const heartColor = likeCount ? "text-red-500" : "text-gray-500";

  if (isSeller && status === 'PROCEEDING') {
    return (
      <div className='p-4 text-center text-gray-600 bg-gray-300 border border-blue-200 border-dashed rounded-lg'>
        내가 올린 경매
      </div>
    );
  }

  if (isSeller && status === 'PENDING') {
    return (
      <>
        <div className="flex items-center h-full gap-2 basis-1/3">
          <HeartIcon className={`${heartColor} size-6`} />
          <span className="pt-1 text-gray1 text-heading3">{`${likeCount}명`}</span>
        </div>
        <Button
          type="button"
          className="h-full basis-4/5"
          color={likeCount ? 'white' : "cheeseYellow"}
          onClick={onConvertClickHandler}
        >
          경매로 전환하기
        </Button>
      </>
    );
  }

  return null;
};

export default SellersFooter;
