import type { IAuctionEndRegisteredItem } from '@/@types/AuctionItem';
import PriceIcon from '@/shared/assets/icons/price.svg';
import { ROUTES, CreatedAt, ParticipantCount, Price } from '@/shared';
import { formatCurrencyWithWon } from '@/shared/utils/formatCurrencyWithWon';
import { useNavigate } from 'react-router-dom';
import ProductItem from '../../entities/product/ui/ProductItem';

const EndMyRegister = ({ product }: { product: IAuctionEndRegisteredItem }) => {
  const navigate = useNavigate();
  const winningBidAmount = product.winningBidAmount ?? 0;
  const formattedWinningBid = formatCurrencyWithWon(winningBidAmount);

  return (
    <ProductItem product={product} onClick={() => navigate(ROUTES.AUCTION.getItemRoute(product.auctionId))}>
      <Price title='시작가' price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
      <div
        aria-label="낙찰 금액"
        className="flex items-center text-xs sm:text-body2 text-gray2"
      >
        <img src={PriceIcon} alt="참여자" />
        <span className='whitespace-nowrap'>
          낙찰 금액 <span className="text-xs text-black sm:text-body2Bold">{formattedWinningBid}</span>
        </span>
      </div>
      <div
        aria-label="참여자"
        className="flex items-center text-xs sm:text-body2 text-gray2"
      >
        <img src={PriceIcon} alt="참여자" />
        <span className='whitespace-nowrap'>
          낙찰 여부 <span className="text-xs text-black sm:text-body2Bold">{product.isWon ? '낙찰' : '유찰'}</span>
        </span>
      </div>
      <div
        aria-label="참여자"
        className="flex items-center text-xs sm:text-body2 text-gray2"
      >
        <img src={PriceIcon} alt="참여자" />
        <span className='whitespace-nowrap'>
          결제 여부 <span className="text-xs text-black sm:text-body2Bold">{product.isOrdered ? '결제 완료' : '미결제'}</span>
        </span>
      </div>
      <CreatedAt createAt={product.createAt} />
    </ProductItem>
  );
};

export default EndMyRegister;