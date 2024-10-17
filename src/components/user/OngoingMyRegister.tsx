import ProductItem from '../common/item/ProductItem';
import type { IAuctionRegisteredItem } from 'AuctionItem';
import { useNavigate } from 'react-router-dom';
import MinPrice from '../common/atomic/MinPrice';
import ParticipantCount from '../common/atomic/ParticipantCount';

const OngoingMyRegister = ({ product }: { product: IAuctionRegisteredItem }) => {
  const navigate = useNavigate();

  return (
    <ProductItem product={product} onClick={() => navigate(`/auctions/bid/${product.auctionId}`)}>
      <MinPrice price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};

export default OngoingMyRegister;
