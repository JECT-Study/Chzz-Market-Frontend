import type { IPreAuctionRegisteredItem } from 'AuctionItem';
import ProductItem from '../common/item/ProductItem';
import LikeCount from '../common/atomic/LikeCount';
import MinPrice from '../common/atomic/MinPrice';

const PreEnrollMyRegister = ({ product }: { product: IPreAuctionRegisteredItem }) => {  
  return (
    <ProductItem product={product}>
      <MinPrice price={product.minPrice} />
      <LikeCount count={product.likeCount} />
    </ProductItem>
  );
};

export default PreEnrollMyRegister;
