import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BuyersFooterProps {
  auctionId: number;
  isSeller: boolean;
  status: string;
  isParticipated: boolean;
  remainingBidCount?: number;
}

const BuyersFooter: React.FC<BuyersFooterProps> = ({
  auctionId,
  isSeller,
  status,
  isParticipated,
  remainingBidCount,
}) => {
  const navigate = useNavigate();

  const onMoveToBidHandler = () => {
    navigate(`/auctions/bid/${auctionId}`);
  };

  // 판매자가 아닌 경우에만 footer 표시
  if (isSeller) return null;

  // 1. 판매자가 아니면서 경매 아이템이 PENDING일 경우
  if (status === 'PENDING') {
    return (
      <div className='p-2 text-center bg-gray-200 rounded-lg'>
        오픈 알림 받기
      </div>
    );
  }

  // 2. 판매자가 아니면서 경매 아이템이 PROCEEDING이고, 아직 참여하지 않았을 경우
  if (status === 'PROCEEDING' && !isParticipated) {
    return (
      <button
        className='w-full px-4 py-2 text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600'
        onClick={onMoveToBidHandler}
      >
        경매 참여하기
      </button>
    );
  }

  // 3. 판매자가 아니면서 경매 아이템이 PROCEEDING이고, 경매에 참여했으면서 가격 수정 횟수가 남아있을 때
  if (status === 'PROCEEDING' && isParticipated && remainingBidCount && remainingBidCount > 0) {
    return (
      <div className='flex items-center justify-between p-2 rounded-lg'>
        <button className='px-4 py-2 text-gray-600 border border-gray-400 rounded-lg'>
          참여 취소
        </button>
        <button className='px-4 py-2 text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600'>
          금액 수정({remainingBidCount}회 가능)
        </button>
      </div>
    );
  }

  // 4. 판매자가 아니면서 경매 아이템이 PROCEEDING이고, 경매에 참여했으면서 가격 수정 횟수가 모두 소진됐을 때
  if (status === 'PROCEEDING' && isParticipated && remainingBidCount === 0) {
    return (
      <div className='flex items-center justify-between p-2 rounded-lg'>
        <button className='px-4 py-2 text-gray-600 border border-gray-400 rounded-lg'>
          참여 취소
        </button>
        <button className='px-4 py-2 text-white bg-gray-400 rounded-lg cursor-not-allowed'>
          금액 수정(소진)
        </button>
      </div>
    );
  }

  // 5. 경매가 종료되었을 때
  if (status === 'ENDED') {
    return (
      <div className='p-2 text-center bg-gray-300 rounded-lg'>종료된 경매</div>
    );
  }

  return null;
};

export default BuyersFooter;
