import { ParticipantCount, Price } from '@/shared';

import ProductItem from '@/components/product/ui/ProductItem';
import type { IUserAuctionLostItem } from '@/entities';

export const OrderLostProduct = ({ product }: { product: IUserAuctionLostItem }) => {

  return (
    <ProductItem product={product}>
      <Price title='나의 참여 금액' price={product.bidAmount} />
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};
