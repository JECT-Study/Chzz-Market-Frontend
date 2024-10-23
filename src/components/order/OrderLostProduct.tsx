import type { IUserAuctionLostItem } from '@/@types/AuctionItem';
import PriceIcon from '@/assets/icons/price.svg';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import ParticipantCount from '../common/atomic/ParticipantCount';
import ProductItem from '../common/item/ProductItem';

const OrderLostProduct = ({ product }: { product: IUserAuctionLostItem }) => {
  const formattedHighPrice = formatCurrencyWithWon(product.bidAmount);


  return (
    <ProductItem product={product}>
      <div
        aria-label="시작가"
        className="flex items-center text-xs sm:text-body2 text-gray2"
      >
        <img src={PriceIcon} alt="나의 참여 금액" />
        <span className='overflow-hidden whitespace-nowrap pt-[2px]'>
          나의 참여 금액 <span className="ml-1 text-xs text-black sm:text-body2Bold">{formattedHighPrice}</span>
        </span>
      </div>
      <ParticipantCount count={product.participantCount} />
    </ProductItem>
  );
};

export default OrderLostProduct;
