import { ParticipantCount, Price, ProductItem, ROUTES } from '@/shared';

import type { IAuctionItem } from '@/entities';
import { useNavigate } from 'react-router';

export const OngoingProduct = ({ product }: { product: IAuctionItem }) => {
  const navigate = useNavigate();
  const handleProductClick = () =>
    navigate(ROUTES.AUCTION.getItemRoute(product.auctionId));

  return (
    <ProductItem product={product} onClick={handleProductClick}>
      <Price title="시작가" price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};
