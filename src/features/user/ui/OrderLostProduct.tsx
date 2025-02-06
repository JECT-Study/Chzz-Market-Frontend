import { ParticipantCount, Price, ProductItem } from '@/shared';

import type { IUserAuctionLostItem } from '@/entities';

export const OrderLostProduct = ({
  product
}: {
  product: IUserAuctionLostItem;
}) => {
  return (
    <ProductItem product={product}>
      <Price title="나의 참여 금액" price={product.bidAmount} />
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};
