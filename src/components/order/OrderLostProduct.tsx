import { MyLostAuctionListItem } from '@/@types/productList';
import { IoPricetagsOutline } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';
import ProductItem from '../common/item/ProductItem';

const OrderLostProduct = ({ product }: { product: MyLostAuctionListItem }) => {
  return (
    <ProductItem product={product}>
      <div className='flex'>
        <div className='flex gap-2'>
          <IoPricetagsOutline className='text-gray-500' />
          <p className='text-sm text-gray-500'>시작가</p>
        </div>
        <p className='ml-4 font-semibold'>{`${product.minPrice.toLocaleString()}원`}</p>
      </div>
      <div className='flex'>
        <div className='flex gap-2'>
          <LuUsers className='text-gray-500' />
          <p className='text-sm text-gray-500'>마감된 날짜</p>
        </div>
        <p className='ml-4 font-semibold'>{`${product.endDateTime}`}</p>
      </div>
      <div className='flex'>
        <div className='flex gap-2'>
          <LuUsers className='text-gray-500' />
          <p className='text-sm text-gray-500'>가장 높은 금액</p>
        </div>
        <p className='ml-4 font-semibold'>{`${product.highestBid}`}</p>
      </div>
    </ProductItem>
  );
};

export default OrderLostProduct;
