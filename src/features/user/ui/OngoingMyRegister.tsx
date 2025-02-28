import { ROUTES } from '@/shared/constants/routes';
import { CreatedAt } from '@/shared/ui/CreatedAt';
import { ParticipantCount } from '@/shared/ui/ParticipantCount';
import { Price } from '@/shared/ui/Price';
import { ProductItem } from '@/shared/ui/ProductItem';

import type { IAuctionOngoingRegisteredItem } from '@/entities/auction/types/userRegistered';
import { useNavigate } from 'react-router';

export const OngoingMyRegister = ({
  product
}: {
  product: IAuctionOngoingRegisteredItem;
}) => {
  const navigate = useNavigate();

  return (
    <ProductItem
      product={product}
      onClick={() => navigate(ROUTES.AUCTION.getItemRoute(product.auctionId))}
    >
      <Price title="시작가" price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
      <CreatedAt createAt={product.createdAt} />
    </ProductItem>
  );
};
