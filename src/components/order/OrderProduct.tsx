import { AuctionItem } from '@/@types/myAuctionData';
import ProductItem from '../common/ProductItem';

export interface OrderProductProps {
  id: number;
  product: AuctionItem;
}

const OrderProduct = ({ product }: { product: OrderProductProps }) => {
  return <ProductItem product={product} />;
};

export default OrderProduct;
