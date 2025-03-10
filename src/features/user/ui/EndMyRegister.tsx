import { ROUTES } from '@/shared/constants/routes';
import { CreatedAt } from '@/shared/ui/CreatedAt';
import { ParticipantCount } from '@/shared/ui/ParticipantCount';
import { Price } from '@/shared/ui/Price';
import { ProductItem } from '@/shared/ui/ProductItem';

import type { IAuctionEndRegisteredItem } from '@/entities/auction/types/userRegistered';
import { Icon } from '@/shared/ui/Icon';
import { formatCurrencyWithWon } from '@/shared/utils/formatCurrencyWithWon';
import { useNavigate } from 'react-router';

export const EndMyRegister = ({
  product
}: {
  product: IAuctionEndRegisteredItem;
}) => {
  const navigate = useNavigate();
  const winningBidAmount = product.winningBidAmount ?? 0;
  const formattedWinningBid = formatCurrencyWithWon(winningBidAmount);

  return (
    <ProductItem
      product={product}
      onClick={() => navigate(ROUTES.AUCTION.getItemRoute(product.auctionId))}
    >
      <Price title="시작가" price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
      <div
        aria-label="낙찰 금액"
        className="flex items-center text-xs web:text-body2 text-gray2"
      >
        <Icon name='price' ariaLabel='참여자' />
        <span className="whitespace-nowrap">
          낙찰 금액{' '}
          <span className="text-xs text-black web:text-body2Bold">
            {formattedWinningBid}
          </span>
        </span>
      </div>
      <div
        aria-label="참여자"
        className="flex items-center text-xs web:text-body2 text-gray2"
      >
        <Icon name='price' ariaLabel='참여자' />
        <span className="whitespace-nowrap">
          낙찰 여부{' '}
          <span className="text-xs text-black web:text-body2Bold">
            {product.isWon ? '낙찰' : '유찰'}
          </span>
        </span>
      </div>
      <div
        aria-label="참여자"
        className="flex items-center text-xs web:text-body2 text-gray2"
      >
        <Icon name='price' ariaLabel='참여자' />
        <span className="whitespace-nowrap">
          결제 여부{' '}
          <span className="text-xs text-black web:text-body2Bold">
            {product.isOrdered ? '결제 완료' : '미결제'}
          </span>
        </span>
      </div>
      <CreatedAt createAt={product.createAt} />
    </ProductItem>
  );
};
