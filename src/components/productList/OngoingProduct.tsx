import type { IAuctionItem } from '@/@types/AuctionItem';
import ROUTES from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import MinPrice from '../common/atomic/MinPrice';
import ParticipantCount from '../common/atomic/ParticipantCount';
import ProductItem from '../common/item/ProductItem';

const OngoingProduct = ({ product }: { product: IAuctionItem }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(ROUTES.getBidRoute(product.auctionId));

  return (
    <ProductItem product={product}>
      <MinPrice price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
      <Button
        color={product.isParticipated ? 'black' : 'white'}
        type='button'
        size='small'
        className={`${product.isParticipated ? '' : ''} w-full h-[33px] rounded-sm`}
        onClick={handleClick}
      >
        경매 참여하기
      </Button>
    </ProductItem>
  );
};

export default OngoingProduct;
