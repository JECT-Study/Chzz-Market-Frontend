import type { IUserAuctionHistoryItem } from '@/@types/AuctionItem';
import { useNavigate } from 'react-router-dom';
import ParticipantCount from '../common/atomic/ParticipantCount';
import ProductItem from '../common/item/ProductItem';
import MinPrice from '../common/atomic/MinPrice';

const OrderHistoryProduct = ({ product }: { product: IUserAuctionHistoryItem }) => {
  const navigate = useNavigate();

  return (
    <ProductItem product={product} onClick={() => navigate(`/auctions/bid/${product.auctionId}`)}>
      <MinPrice title='나의 참여 금액' price={product.bidAmount} />
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};

export default OrderHistoryProduct;
