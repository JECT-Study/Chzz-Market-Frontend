import { ROUTES } from '@/shared/constants/routes';

import type { IUserAuctionWonItem } from '@/entities/auction/types/userParticipated';
import { Icon } from '@/shared/ui/Icon';
import { ParticipantCount } from '@/shared/ui/ParticipantCount';
import { formatCurrencyWithWon } from '@/shared/utils/formatCurrencyWithWon';
import { useNavigate } from 'react-router';

export const OrderWonProduct = ({
  product
}: {
  product: IUserAuctionWonItem;
}) => {
  const navigate = useNavigate();
  const formatted = formatCurrencyWithWon(product.winningAmount);

  const handleProductClick = () =>
    navigate(ROUTES.AUCTION.getItemRoute(product.auctionId));

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.isOrdered) {
      navigate(ROUTES.PAYMENT.getRoute(product.auctionId));
    } else {
      navigate(`/payment/success?auctionId=${product.auctionId}`);
    }
  };

  return (
    <div
      key={product.auctionId}
      className="p-1 mb-4 cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="flex flex-col">
        <div className="w-full h-auto mb-4">
          <div className="relative">
            <img
              src={`${product.imageUrl}?h=840`}
              alt={product.auctionName || '제품 사진'}
              className="object-cover w-[10rem] h-[7.5rem] web:w-full web:h-[15rem] rounded-t"
              {...{ fetchpriority: "high" }} />
            {product.isOrdered ? (
              <div
                aria-label="시간"
                className="absolute bottom-0 w-full pt-1 text-center bg-white border-b-2 opacity-80 text-timeColor3 text-body1"
              >
                <p className="text-timeColor3">결제 완료</p>
              </div>
            ) : (
              <div
                aria-label="시간"
                className="absolute bottom-0 w-full pt-1 text-center bg-white border-b-2 opacity-80 text-timeColor1 text-body1"
              >
                <p className="text-redNotice">결제 전</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[2px] web:gap-[4px]">
          <div>
            <p className="text-body2 web:text-heading3">
              {product.auctionName}
            </p>
          </div>
          <div className="flex flex-col">
            <div
              aria-label="시작가"
              className="flex items-center text-body2 web:text-body1 text-gray2"
            >
              <Icon name='successful_auction_win' ariaLabel='트로피' style='w-[20px] h-[19px]' />
              <span className="overflow-hidden whitespace-nowrap pt-[2px]">
                <span className="ml-1 text-xs text-black web:text-body2Bold">
                  {formatted}
                </span>
              </span>
            </div>
            <ParticipantCount count={product.participantCount} />
            <div className="flex items-center justify-center pt-1">
              <button
                type="button"
                onClick={handleButtonClick}
                className={`w-[10.1rem] h-[2.1rem] web:w-[21rem] web:h-[2.5rem] text-body2 web:text-body1 focus:outline-none rounded-lg transition-colors box-border
                  ${product.isOrdered
                    ? 'bg-gray3 border-none'
                    : 'bg-gray1 text-white border-none'
                  }
                `}
              >
                {product.isOrdered ? '결제 내역 보기' : '결제하기'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
