import { ROUTES } from '@/shared/constants/routes';

import type { IPreAuctionRegisteredItem } from '@/entities/auction';
import { LikeCount } from '@/shared/ui/LikeCount';
import { Price } from '@/shared/ui/Price';
import { ProductItem } from '@/shared/ui/ProductItem';
import { useNavigate } from 'react-router';

export const PreAuctionMyRegister = ({
  product
}: {
  product: IPreAuctionRegisteredItem;
}) => {
  const navigate = useNavigate();
  const clickProduct = () =>
    navigate(ROUTES.PRE_AUCTION.getItemRoute(product.auctionId));

  return (
    <ProductItem product={product} onClick={clickProduct}>
      <Price title="시작가" price={product.minPrice} />
      <LikeCount count={product.likeCount} />
    </ProductItem>
  );
};
