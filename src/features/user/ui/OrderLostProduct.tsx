import type { IUserAuctionLostItem } from '@/@types/AuctionItem';
import { ParticipantCount, Price } from '@/shared';
import ProductItem from '../../../entities/product/ui/ProductItem';

export const OrderLostProduct = ({ product }: { product: IUserAuctionLostItem }) => {

  return (
    <ProductItem product={product}>
      <Price title='나의 참여 금액' price={product.bidAmount} />
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};
