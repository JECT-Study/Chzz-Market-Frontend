
import type { IUserAuctionLostItem } from '@/entities';
import { ParticipantCount } from '@/shared/ui/ParticipantCount';
import { Price } from '@/shared/ui/Price';
import { ProductItem } from '@/shared/ui/ProductItem';

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
