import CreatedAt from '../common/atomic/CreatedAt';
import type { IAuctionOngoingRegisteredItem } from '@/@types/AuctionItem';
import MinPrice from '../common/atomic/MinPrice';
import ParticipantCount from '../common/atomic/ParticipantCount';
import ProductItem from '../common/item/ProductItem';
import { useNavigate } from 'react-router-dom';

const OngoingMyRegister = ({ product }: { product: IAuctionOngoingRegisteredItem }) => {
  const navigate = useNavigate();

  return (
    <ProductItem product={product} onClick={() => navigate(`/auctions/auction/${product.auctionId}`)}>
      <MinPrice price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
      <CreatedAt createAt={product.createdAt} />
    </ProductItem>
  );
};

export default OngoingMyRegister;
