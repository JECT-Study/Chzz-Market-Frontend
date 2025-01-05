import { LikeCount, Price, ProductItem, ROUTES } from "@/shared";

import type { IPreAuctionItem } from '@/entities';
import { useNavigate } from 'react-router-dom';

export const PreAuctionSearchItem = ({ product }: { product: IPreAuctionItem }) => {
  const navigate = useNavigate();

  const handleProductClick = () => navigate(ROUTES.PRE_AUCTION.getItemRoute(product.auctionId))
  return (
    <ProductItem product={product} onClick={handleProductClick}>
      <Price title='최소 입찰 가격' price={product.minPrice} />
      <LikeCount count={product.likeCount} />
    </ProductItem>
  );
};
