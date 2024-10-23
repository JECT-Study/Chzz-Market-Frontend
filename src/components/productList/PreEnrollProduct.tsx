import Button from '../common/Button';
import type { IPreAuctionItem } from 'AuctionItem';
import ProductItem from '../common/item/ProductItem';
import MinPrice from '../common/atomic/MinPrice';
import LikeCount from '../common/atomic/LikeCount';
import { useNavigate } from 'react-router-dom';
import { useDeletePreAuctionHeart } from '../heart/queries';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';

const PreEnrollProduct = ({ product }: { product: IPreAuctionItem }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deletePreAuction } = useDeletePreAuctionHeart();
  const handleProductClick = () => navigate(`/auctions/pre-auction/${product.productId}`)
  const confirmDelete = () => deletePreAuction(product.productId, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.PRE_AUCTION_LIST]});
    }
  });

  return (
    <ProductItem product={product} onClick={handleProductClick}>
      <MinPrice price={product.minPrice} />
      <LikeCount count={product.likeCount} />
      <Button onClick={(event) => 
      {
        event.stopPropagation();
        confirmDelete();
      }} color={product.isLiked ? 'black' : 'white'} type='button' size='small'>
        {product.isLiked ? '좋아요 취소' : '좋아요'}
      </Button>
    </ProductItem>
  );
};

export default PreEnrollProduct;
