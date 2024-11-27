import { LikeCount, Price, ProductItem, ROUTES } from '@/shared';

import type { IPreAuctionRegisteredItem } from '@/entities';
import { useNavigate } from 'react-router-dom';

export const PreAuctionMyRegister = ({ product }: { product: IPreAuctionRegisteredItem }) => {
  const navigate = useNavigate()
  const clickProduct = () => navigate(ROUTES.PRE_AUCTION.getItemRoute(product.auctionId))

  return (
    <ProductItem product={product} onClick={clickProduct}>
      <Price title='시작가' price={product.minPrice} />
      <LikeCount count={product.likeCount} />
    </ProductItem>
  );
};
