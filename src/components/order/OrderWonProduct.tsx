import type { IUserAuctionWonItem } from '@/@types/AuctionItem';
import PriceIcon from '@/assets/icons/price.svg';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import { LuUsers } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import CreatedAt from '../common/atomic/CreatedAt';
import ProductItem from '../common/item/ProductItem';

const OrderWonProduct = ({ product }: { product: IUserAuctionWonItem }) => {
  const navigate = useNavigate();
  const formattedWinningPrice = formatCurrencyWithWon(product.winningAmount);
  const formatted = formatCurrencyWithWon(product.minPrice);

  const handleProductClick = () => navigate(`/auctions/auction/${product.auctionId}`)

  const handleButtonClick = () => {
    if (!product.isOrdered) {
      navigate(`/auctions/${product.auctionId}/shipping`);
    } else {
      navigate(`/payment/success?auctionId=${product.auctionId}`);
    }
  }

  return (
    <ProductItem product={product} onClick={handleProductClick}>
      <div
        aria-label="시작가"
        className="flex items-center text-xs sm:text-body2 text-gray2"
      >
        <img src={PriceIcon} alt="시작가" />
        <span className='overflow-hidden whitespace-nowrap pt-[2px]'>
          <span className="ml-1 text-xs text-black sm:text-body2Bold">{formatted}</span>
        </span>
      </div>
      <CreatedAt createAt={product.endDateTime} />
      <div className='flex'>
        <div className='flex gap-2'>
          <LuUsers className='text-gray-500' />
          <p className='text-sm text-gray-500'>최종 낙찰금액</p>
        </div>
        <p className='ml-4 font-semibold'>{formattedWinningPrice}</p>
      </div>
      <Button type='button' onClick={handleButtonClick} color={product.isOrdered ? 'black' : 'white'}>
        {product.isOrdered ? '결제 내역 보기' : '결제하기'}
      </Button>
    </ProductItem>
  );
};

export default OrderWonProduct;
