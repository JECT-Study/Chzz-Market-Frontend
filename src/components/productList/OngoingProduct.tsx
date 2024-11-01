import type { IAuctionItem } from '@/@types/AuctionItem';
import { Button, ParticipantCount, Price, ROUTES } from '@/shared';
import { useNavigate } from 'react-router-dom';
import ProductItem from '../../entities/product/ui/ProductItem';

const OngoingProduct = ({ product }: { product: IAuctionItem }) => {
  const navigate = useNavigate();
  const handleProductClick = () => navigate(ROUTES.AUCTION.getItemRoute(product.auctionId));

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
