import CreatedAt from '../common/atomic/CreatedAt';
import type { IAuctionOngoingRegisteredItem } from '@/@types/AuctionItem';
import ParticipantCount from '../common/atomic/ParticipantCount';
import ProductItem from '../common/item/ProductItem';
import { useNavigate } from 'react-router-dom';
import Price from '../common/atomic/Price';
import ROUTES from '@/constants/routes';

const OngoingMyRegister = ({ product }: { product: IAuctionOngoingRegisteredItem }) => {
  const navigate = useNavigate();

  return (
    <ProductItem product={product} onClick={() => navigate(ROUTES.getAuctionItemRoute(product.auctionId))}>
      <Price title='시작가' price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
      <CreatedAt createAt={product.createdAt} />
    </ProductItem>
  );
};

export default OngoingMyRegister;
