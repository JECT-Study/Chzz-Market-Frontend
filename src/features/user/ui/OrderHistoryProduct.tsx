import type { IUserAuctionHistoryItem } from '@/@types/AuctionItem';
import { ParticipantCount, Price } from "@/shared";
import { ROUTES } from '@/shared/constants/routes';
import { useNavigate } from 'react-router-dom';
import ProductItem from '../../../entities/product/ui/ProductItem';

export const OrderHistoryProduct = ({ product }: { product: IUserAuctionHistoryItem }) => {
  const navigate = useNavigate();

  return (
    <ProductItem product={product} onClick={() => navigate(ROUTES.getBidRoute(product.auctionId))}>
      <Price title='나의 참여 금액' price={product.bidAmount} />
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};
