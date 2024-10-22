import Button from '../common/Button';
import type { IPreAuctionItem } from 'AuctionItem';
import ProductItem from '../common/item/ProductItem';
import MinPrice from '../common/atomic/MinPrice';
import LikeCount from '../common/atomic/LikeCount';
import { useNavigate } from 'react-router-dom';

const PreEnrollProduct = ({ product }: { product: IPreAuctionItem }) => {
  const navigate = useNavigate();
  const handleProductClick = () => navigate(`/auctions/pre-auction/${product.productId}`)
  const handleButtonClick = () => {

  }

  return (
    <ProductItem product={product} onClick={handleProductClick}>
      <MinPrice price={product.minPrice} />
      <LikeCount count={product.likeCount} />
      <Button onClick={handleButtonClick} color={product.isLiked ? 'black' : 'white'} type='button' size='small' className={`${product.isLiked ? '' : ''} w-full h-[33px] rounded-sm`}>
        {product.isLiked ? '좋아요' : '안좋아요'}
      </Button>
    </ProductItem>
  );
};

export default PreEnrollProduct;
