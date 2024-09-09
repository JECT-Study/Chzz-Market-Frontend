import { ProductListItem } from '@/@types/productList';
import ProductLists from '../common/ProductItem';

const PreEnrollProduct = ({ product }: { product: ProductListItem }) => {
  return <ProductLists product={product} />;
};

export default PreEnrollProduct;
