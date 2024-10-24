import type { IUserAuctionWonItem } from '@/@types/AuctionItem';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import { useNavigate } from 'react-router-dom';
import trophyImage from '@/assets/icons/successful_auction_win.svg';
import Button from '../common/Button';
import ParticipantCount from '../common/atomic/ParticipantCount';

const OrderWonProduct = ({ product }: { product: IUserAuctionWonItem }) => {
  const navigate = useNavigate();
  const formatted = formatCurrencyWithWon(product.winningAmount);

  const handleProductClick = () => navigate(`/auctions/auction/${product.auctionId}`);

  return (
    <div key={product.auctionId} className="p-1 mb-4 cursor-pointer" onClick={handleProductClick}>
      <div className="flex flex-col">
        <div className="w-full h-auto mb-4">
          <div className="relative">
            <img
              className="object-cover w-full h-[15rem] rounded-t"
              src={product.imageUrl}
              alt={product.productName || "제품 사진"}
            />
            {product.isOrdered ? (
              <div
                aria-label="시간"
                className="absolute bottom-0 w-full pt-1 text-center bg-white opacity-80 text-timeColor3 border-b-2 text-body1"
              >
                <p className="text-timeColor3">결제 완료</p>
              </div>
            ) : (
              <div
                aria-label="시간"
                className="absolute bottom-0 w-full pt-1 text-center bg-white opacity-80 text-timeColor1 border-b-2 text-body1"
              >
                <p className="text-redNotice">결제 전</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <div>
            <p className="text-sm font-semibold">{product.productName}</p>
          </div>
          <div className="flex flex-col">
            <div
              aria-label="시작가"
              className="flex items-center text-xs sm:text-body2 text-gray2"
            >
              <img src={trophyImage} alt="트로피" className="w-[20px] h-[19px]" />
              <span className="overflow-hidden whitespace-nowrap pt-[2px]">
                <span className="ml-1 text-xs text-black sm:text-body2Bold">
                  {formatted}
                </span>
              </span>
            </div>
            <ParticipantCount count={product.participantCount} />
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!product.isOrdered) {
                  navigate(`/auctions/${product.auctionId}/shipping`);
                } else {
                  navigate(`/payment/success?auctionId=${product.auctionId}`);
                }
              }}
              className={
                product.isOrdered
                  ? 'bg-[#D9D9D9] border-none'
                  : 'bg-gray1 text-white border-none'
              }
            >
              {product.isOrdered ? '결제 내역 보기' : '결제하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderWonProduct;