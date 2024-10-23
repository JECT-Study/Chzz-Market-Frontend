import type { IUserAuctionHistoryItem } from '@/@types/AuctionItem';
import { useNavigate } from 'react-router-dom';
import MinPrice from '../common/atomic/MinPrice';
import ParticipantCount from '../common/atomic/ParticipantCount';
import ProductItem from '../common/item/ProductItem';

const OrderHistoryProduct = ({ product }: { product: IUserAuctionHistoryItem }) => {
  const navigate = useNavigate();

  return (
    <ProductItem product={product} onClick={() => navigate(`/auctions/bid/${product.auctionId}`)}>
      <MinPrice price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};

export default OrderHistoryProduct;
