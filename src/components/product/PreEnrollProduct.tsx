import { PreEnrollProductListItem } from '@/@types/productList';
import { FaHeart } from 'react-icons/fa';
import ProductLists from '../common/ProductItem';

const PreEnrollProduct = ({
  product,
}: {
  product: PreEnrollProductListItem;
}) => {
  return (
    <ProductLists product={product}>
      <div className="flex">
        <div className="flex gap-2">
          <FaHeart className="text-gray-500" />
          <p className="text-sm text-gray-500">좋아요</p>
        </div>
        <p className="ml-4 font-semibold">{`${product.likeCount}명`}</p>
      </div>
    </ProductLists>
  );
};

export default PreEnrollProduct;
