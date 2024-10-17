import Button from '../common/Button';
import type { IPreAuctionItem } from 'AuctionItem';
import ProductItem from '../common/item/ProductItem';
import MinPrice from '../common/atomic/MinPrice';
import LikeCount from '../common/atomic/LikeCount';

const PreEnrollProduct = ({ product }: { product: IPreAuctionItem }) => {
  
  return (
    <ProductItem product={product}>
      <MinPrice price={product.minPrice} />
      <LikeCount count={product.likeCount} />
      <Button color={product.isLiked ? 'black' : 'white'} type='button' size='small' className={`${product.isLiked ? '' : ''} w-full h-[33px] rounded-sm`}>
        {product.isLiked ? '좋아요' : '안좋아요'}
      </Button>
    </ProductItem>
  );
};

export default PreEnrollProduct;
