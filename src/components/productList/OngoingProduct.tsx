import type { IAuctionItem } from '@/@types/AuctionItem';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
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
      <Button
        color={product.isParticipated ? 'black' : 'white'}
        type='button'
        size='small'
        className={`${product.isParticipated ? '' : ''} w-full h-[33px] rounded-sm`}
        onClick={(e) => {
          e.stopPropagation();
          navigate(ROUTES.getBidRoute(product.auctionId));
        }}
      >
        경매 참여하기
      </Button>
    </ProductItem>
  );
};

export default OngoingProduct;
