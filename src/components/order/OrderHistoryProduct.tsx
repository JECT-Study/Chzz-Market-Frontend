import { MyHistoryAuctionListItem } from '@/@types/productList';
import { LuUsers } from 'react-icons/lu';
import { IoPricetagsOutline } from 'react-icons/io5';
import ProductItem from '../common/item/ProductItem';

const OrderHistoryProduct = ({ product }: { product: MyHistoryAuctionListItem }) => {
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
          <p className='text-sm text-gray-500'>참여자</p>
        </div>
        <p className='ml-4 font-semibold'>{`${product.participantCount}명`}</p>
      </div>
    </ProductItem>
  );
};

export default OrderHistoryProduct;
