import { ProductListItem } from '@/models/productList';
import ProductLists from '../common/ProductLists';

const UpcomingProduct = ({ product }: { product: ProductListItem }) => {
  return <ProductLists product={product} />;
};

export default UpcomingProduct;
