import type { IAuctionItem } from '@/@types/AuctionItem';
import { useNavigate } from 'react-router-dom';
import ParticipantCount from '../common/atomic/ParticipantCount';
import ProductItem from '../common/item/ProductItem';
import Price from '../common/atomic/Price';
import ROUTES from '@/constants/routes';

const OngoingProduct = ({ product }: { product: IAuctionItem }) => {
  const navigate = useNavigate();
  const handleProductClick = () => navigate(ROUTES.getAuctionItemRoute(product.auctionId));

  return (
    <ProductItem product={product} onClick={handleProductClick}>
      <Price title='시작가' price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};

export default OngoingProduct;
