import { ProductListItem } from '@/models/productList';
import ProductLists from '../common/ProductLists';

const OngoingProduct = ({ product }: { product: ProductListItem }) => {
  return <ProductLists product={product} />;
};

export default OngoingProduct;
