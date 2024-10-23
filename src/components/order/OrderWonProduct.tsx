import CreatedAt from '../common/atomic/CreatedAt';
import type { IUserAuctionWonItem } from '@/@types/AuctionItem';
import { LuUsers } from 'react-icons/lu';
import MinPrice from '../common/atomic/MinPrice';
import ProductItem from '../common/item/ProductItem';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';

const OrderWonProduct = ({ product }: { product: IUserAuctionWonItem }) => {
  const formattedWinningPrice = formatCurrencyWithWon(product.winningAmount);

  return (
    <ProductItem product={product}>
      <MinPrice price={product.minPrice} />
      <CreatedAt createAt={product.endDateTime} />
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
