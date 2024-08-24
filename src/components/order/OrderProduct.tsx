import { AuctionItem } from '@/types/myAuctionData';
import ProductLists from '../common/ProductItem';

export interface OrderProductProps {
  id: number;
  product: AuctionItem;
}

const OrderProduct = ({ product }: { product: OrderProductProps }) => {
  return <ProductLists product={product} />;
};

export default OrderProduct;
