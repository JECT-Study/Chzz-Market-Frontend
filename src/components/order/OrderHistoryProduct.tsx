import type { IUserAuctionHistoryItem } from '@/@types/AuctionItem';
import PriceIcon from '@/assets/icons/price.svg';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import { useNavigate } from 'react-router-dom';
import ParticipantCount from '../common/atomic/ParticipantCount';
import ProductItem from '../common/item/ProductItem';

const OrderHistoryProduct = ({ product }: { product: IUserAuctionHistoryItem }) => {
  const navigate = useNavigate();
  const formatted = formatCurrencyWithWon(product.minPrice);

  return (
    <ProductItem product={product} onClick={() => navigate(`/auctions/bid/${product.auctionId}`)}>
      <div
        aria-label="시작가"
        className="flex items-center text-xs sm:text-body2 text-gray2"
      >
        <img src={PriceIcon} alt="나의 참여 금액" />
        <span className='overflow-hidden whitespace-nowrap pt-[2px]'>
          나의 참여 금액 <span className="ml-1 text-xs text-black sm:text-body2Bold">{formatted}</span>
        </span>
      </div>
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};

export default OrderHistoryProduct;
