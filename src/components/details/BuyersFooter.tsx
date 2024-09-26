import React from 'react';

interface BuyersFooterProps {
  isSeller: boolean;
  status: string;
  isParticipating: boolean;
  remainingBidCount: number;
}

const BuyersFooter: React.FC<BuyersFooterProps> = ({
  isSeller,
  status,
  isParticipating,
  remainingBidCount,
}) => {
  // 판매자가 아닌 경우에만 footer 표시
  if (isSeller) return null;

  // 1. 판매자가 아니면서 경매 아이템이 PENDING일 경우
  if (status === 'PENDING') {
    return (
      <div className="bg-gray-200 text-center p-2 rounded-lg">
        오픈 알림 받기
      </div>
    );
  }

  // 2. 판매자가 아니면서 경매 아이템이 PROCEEDING이고, 아직 참여하지 않았을 경우
  if (status === 'PROCEEDING' && !isParticipating) {
    return (
      <button className="bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600 transition-colors">
        경매 참여하기
      </button>
    );
  }

  // 3. 판매자가 아니면서 경매 아이템이 PROCEEDING이고, 경매에 참여했으면서 가격 수정 횟수가 남아있을 때
  if (status === 'PROCEEDING' && isParticipating && remainingBidCount > 0) {
    return (
      <div className="flex justify-between items-center p-2 rounded-lg">
        <button className="border border-gray-400 text-gray-600 rounded-lg px-4 py-2">
          참여 취소
        </button>
        <button className="bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600 transition-colors">
          금액 수정({remainingBidCount}회 가능)
        </button>
      </div>
    );
  }

  // 4. 판매자가 아니면서 경매 아이템이 PROCEEDING이고, 경매에 참여했으면서 가격 수정 횟수가 모두 소진됐을 때
  if (status === 'PROCEEDING' && isParticipating && remainingBidCount === 0) {
    return (
      <div className="flex justify-between items-center p-2 rounded-lg">
        <button className="border border-gray-400 text-gray-600 rounded-lg px-4 py-2">
          참여 취소
        </button>
        <button className="bg-gray-400 text-white rounded-lg px-4 py-2 cursor-not-allowed">
          금액 수정(소진)
        </button>
      </div>
    );
  }

  // 5. 경매가 종료되었을 때
  if (status === 'COMPLETED') {
    return (
      <div className="bg-gray-300 text-center p-2 rounded-lg">종료된 경매</div>
    );
  }

  return null;
};

export default BuyersFooter;
