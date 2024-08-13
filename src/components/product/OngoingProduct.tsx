import { ProductListItem } from '@/types/productList';
import ProductLists from '../common/ProductLists';

const OngoingProduct = ({ product }: { product: ProductListItem }) => {
  return <ProductLists product={product} />;
};

export default OngoingProduct;
