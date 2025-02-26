import { ROUTES } from '@/shared/constants/routes';
import { Price } from '@/shared/ui/Price';
import { ProductItem } from '@/shared/ui/ProductItem';

import type { IAuctionSearchItem } from '@/entities/auction/types/item';
import { ParticipantCount } from '@/shared/ui/ParticipantCount';
import { TimeRemaining } from '@/shared/ui/TimeRemaining';
import { useNavigate } from 'react-router';

export const AuctionSearchItem = ({
  product
}: {
  product: IAuctionSearchItem;
}) => {
  const navigate = useNavigate();

  const handleProductClick = () =>
    navigate(ROUTES.AUCTION.getItemRoute(product.auctionId));
  return (
    <ProductItem product={product} onClick={handleProductClick}>
      <Price title="최소 입찰 가격" price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
      <TimeRemaining
        title="남은 경매 마감 시간"
        timeRemaining={product.timeRemaining}
      />
    </ProductItem>
  );
};
