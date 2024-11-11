import { ParticipantCount, Price } from '@/shared';

import type { IUserAuctionLostItem } from '@/entities';
import ProductItem from '../product/ui/ProductItem';

const OrderLostProduct = ({ product }: { product: IUserAuctionLostItem }) => {

  return (
    <ProductItem product={product}>
      <Price title='나의 참여 금액' price={product.bidAmount} />
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};

export default OrderLostProduct;
