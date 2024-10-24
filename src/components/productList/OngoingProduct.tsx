import type { IAuctionItem } from '@/@types/AuctionItem';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import MinPrice from '../common/atomic/MinPrice';
import ParticipantCount from '../common/atomic/ParticipantCount';
import ProductItem from '../common/item/ProductItem';

const OngoingProduct = ({ product }: { product: IAuctionItem }) => {
  const navigate = useNavigate();
  const handleProductClick = () => navigate(`/auctions/auction/${product.auctionId}`);

  return (
    <ProductItem product={product} onClick={handleProductClick}>
      <MinPrice title='시작가' price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
      <Button
        color={product.isParticipated ? 'black' : 'white'}
        type='button'
        size='small'
        className={`${product.isParticipated ? '' : ''} w-full h-[33px] rounded-sm`}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/auctions/bid/${product.auctionId}`);
        }}
      >
        경매 참여하기
      </Button>
    </ProductItem>
  );
};

export default OngoingProduct;
