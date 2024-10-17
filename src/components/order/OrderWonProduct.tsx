import type { IUserAuctionWonItem } from 'AuctionItem';
import { LuUsers } from 'react-icons/lu';
import ProductItem from '../common/item/ProductItem';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import MinPrice from '../common/atomic/MinPrice';

const OrderWonProduct = ({ product }: { product: IUserAuctionWonItem }) => {
  const date = new Date(product.endDateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}년 ${month}월 ${day}일`;
  const formattedWinningPrice = formatCurrencyWithWon(product.winningAmount);
  
  return (
    <ProductItem product={product}>
      <MinPrice price={product.minPrice} />
      <div className='flex'>
        <div className='flex gap-2'>
          <LuUsers className='text-gray-500' />
          <p className='text-sm text-gray-500'>마감된 날짜</p>
        </div>
        <p className='ml-4 font-semibold'>{formattedDate}</p>
      </div>
      <div className='flex'>
        <div className='flex gap-2'>
          <LuUsers className='text-gray-500' />
          <p className='text-sm text-gray-500'>최종 낙찰금액</p>
        </div>
        <p className='ml-4 font-semibold'>{formattedWinningPrice}</p>
      </div>
    </ProductItem>
  );
};

export default OrderWonProduct;
