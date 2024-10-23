import type { IPreAuctionRegisteredItem } from '@/@types/AuctionItem';
import LikeCount from '../common/atomic/LikeCount';
import MinPrice from '../common/atomic/MinPrice';
import ProductItem from '../common/item/ProductItem';

const PreEnrollMyRegister = ({ product }: { product: IPreAuctionRegisteredItem }) => {
  return (
    <ProductItem product={product}>
      <MinPrice price={product.minPrice} />
      <LikeCount count={product.likeCount} />
    </ProductItem>
  );
};

export default PreEnrollMyRegister;
