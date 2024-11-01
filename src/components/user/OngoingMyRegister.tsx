import type { IAuctionOngoingRegisteredItem } from '@/@types/AuctionItem';
import { CreatedAt, ParticipantCount, Price, ROUTES } from '@/shared';
import { useNavigate } from 'react-router-dom';
import ProductItem from '../../entities/product/ui/ProductItem';

const OngoingMyRegister = ({ product }: { product: IAuctionOngoingRegisteredItem }) => {
  const navigate = useNavigate();

  return (
    <ProductItem product={product} onClick={() => navigate(ROUTES.AUCTION.getItemRoute(product.auctionId))}>
      <Price title='시작가' price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
      <CreatedAt createAt={product.createdAt} />
    </ProductItem>
  );
};

export default OngoingMyRegister;
