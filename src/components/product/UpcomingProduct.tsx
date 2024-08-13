import { ProductListItem } from '@/types/productList';
import ProductLists from '../common/ProductLists';

const UpcomingProduct = ({ product }: { product: ProductListItem }) => {
  return <ProductLists product={product} />;
};

export default UpcomingProduct;
