import Button from '../common/Button';
import type { IAuctionItem } from 'AuctionItem';
import ProductItem from '../common/item/ProductItem';
import { useNavigate } from 'react-router-dom';
import MinPrice from '../common/atomic/MinPrice';
import ParticipantCount from '../common/atomic/ParticipantCount';

const OngoingProduct = ({ product }: { product: IAuctionItem }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/auctions/bid/${product.auctionId}`);

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
