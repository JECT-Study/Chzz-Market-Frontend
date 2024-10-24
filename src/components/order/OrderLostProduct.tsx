import type { IUserAuctionLostItem } from '@/@types/AuctionItem';
import ParticipantCount from '../common/atomic/ParticipantCount';
import ProductItem from '../common/item/ProductItem';
import MinPrice from '../common/atomic/MinPrice';

const OrderLostProduct = ({ product }: { product: IUserAuctionLostItem }) => {

  return (
    <ProductItem product={product}>
      <MinPrice title='나의 참여 금액' price={product.bidAmount} />
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};

export default OrderLostProduct;
