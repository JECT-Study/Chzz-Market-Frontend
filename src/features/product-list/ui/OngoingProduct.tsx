import { ROUTES } from '@/shared/constants/routes';
import { Price } from '@/shared/ui/Price';
import { ProductItem } from '@/shared/ui/ProductItem';

import type { IAuctionItem } from '@/entities/auction';
import { ParticipantCount } from '@/shared/ui/ParticipantCount';
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
