import type { IPreAuctionItem } from '@/@types/AuctionItem';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import LikeCount from '../common/atomic/LikeCount';
import MinPrice from '../common/atomic/MinPrice';
import ProductItem from '../common/item/ProductItem';
import { useDeletePreAuctionHeart } from '../heart/queries';

const PreEnrollProduct = ({ product }: { product: IPreAuctionItem }) => {
  const navigate = useNavigate();
  const { mutate: deletePreAuction } = useDeletePreAuctionHeart();
  const handleProductClick = () => navigate(`/auctions/pre-auction/${product.productId}`)
  const confirmDelete = () => deletePreAuction(product.productId);

  return (
    <ProductItem product={product} onClick={handleProductClick}>
      <MinPrice price={product.minPrice} />
      <LikeCount count={product.likeCount} />
      <Button onClick={(event) => {
        event.stopPropagation();
        confirmDelete();
      }} color={product.isLiked ? 'black' : 'white'} type='button' size='small'>
        {product.isLiked ? '좋아요 취소' : '좋아요'}
      </Button>
    </ProductItem>
  );
};

export default PreEnrollProduct;
