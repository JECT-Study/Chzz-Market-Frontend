
import type { IPreAuctionItem } from '@/entities/auction/types/item';
import { ROUTES } from '@/shared/constants/routes';
import { LikeCount } from '@/shared/ui/LikeCount';
import { Price } from '@/shared/ui/Price';
import { ProductItem } from '@/shared/ui/ProductItem';
import { useNavigate } from 'react-router';

export const PreAuctionSearchItem = ({
  product
}: {
  product: IPreAuctionItem;
}) => {
  const navigate = useNavigate();

  const handleProductClick = () =>
    navigate(ROUTES.PRE_AUCTION.getItemRoute(product.auctionId));
  return (
    <ProductItem product={product} onClick={handleProductClick}>
      <Price title="최소 입찰 가격" price={product.minPrice} />
      <LikeCount count={product.likeCount} />
    </ProductItem>
  );
};
