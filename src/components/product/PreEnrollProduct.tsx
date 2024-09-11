import { PreEnrollProductListItem } from '@/@types/productList';
import { FaHeart } from 'react-icons/fa';
import ProductItem from '../common/ProductItem';
import Button from '../common/Button';

const PreEnrollProduct = ({
  product,
}: {
  product: PreEnrollProductListItem;
}) => {
  return (
    <ProductItem product={product}>
      <div className="flex">
        <div className="flex gap-2">
          <FaHeart className="text-gray-500" />
          <p className="text-sm text-gray-500">좋아요</p>
        </div>
        <p className="ml-4 font-semibold">{`${product.likeCount}`}</p>
      </div>
      <Button
        color={product.isLiked ? 'black' : 'white'}
        type="button"
        size="small"
        className={`${product.isLiked ? '' : ''} w-full h-[33px] rounded-sm`}
      >
        {product.isLiked ? '좋아요' : '안좋아요'}
      </Button>
    </ProductItem>
  );
};

export default PreEnrollProduct;
