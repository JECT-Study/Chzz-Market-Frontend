import { ProductListItem } from '@/types/productList';
import ProductLists from '../common/ProductItem';

const OngoingProduct = ({ product }: { product: ProductListItem }) => {
  return <ProductLists product={product} />;
};

export default OngoingProduct;
