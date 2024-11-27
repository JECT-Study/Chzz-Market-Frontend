import { ParticipantCount, Price, ProductItem } from "@/shared";

import type { IUserAuctionHistoryItem } from '@/entities';
import { ROUTES } from '@/shared/constants/routes';
import { useNavigate } from 'react-router-dom';

export const OrderHistoryProduct = ({ product }: { product: IUserAuctionHistoryItem }) => {
  const navigate = useNavigate();

  return (
    <ProductItem product={product} onClick={() => navigate(ROUTES.getBidRoute(product.auctionId))}>
      <Price title='나의 참여 금액' price={product.bidAmount} />
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};
