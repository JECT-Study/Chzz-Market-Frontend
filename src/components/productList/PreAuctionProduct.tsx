import type { IPreAuctionItem } from '@/@types/AuctionItem';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import LikeCount from '../common/atomic/LikeCount';
import ProductItem from '../common/item/ProductItem';
import { useDeletePreAuctionHeart } from '../heart/queries';
import { toast } from 'sonner';
import Price from '../common/atomic/Price';

const PreAuctionProduct = ({ product }: { product: IPreAuctionItem }) => {
  const navigate = useNavigate();
  const { mutate: deletePreAuction } = useDeletePreAuctionHeart();
  const handleProductClick = () => navigate(`/auctions/pre-auction/${product.productId}`)
  const confirmDelete = () => {
    deletePreAuction(product.productId)
    if (product.isLiked) {
      toast.success('좋아요 취소되었습니다.');
    } else {
      toast.success('좋아요 추가되었습니다.');
    }
  };

  return (
    <ProductItem product={product} onClick={handleProductClick}>
      <Price title='시작가' price={product.minPrice} />
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

export default PreAuctionProduct;
