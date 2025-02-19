import { ROUTES } from '@/shared';
import { ProductItem } from '@/shared/ui/ProductItem';
import { Price } from '@/shared/ui/Price';

import type { IAuctionItem } from '@/entities';
import { useNavigate } from 'react-router';
import { ParticipantCount } from '@/shared/ui/ParticipantCount';

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
