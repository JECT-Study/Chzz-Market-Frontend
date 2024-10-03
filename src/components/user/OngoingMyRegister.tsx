import { LuUsers } from 'react-icons/lu';
import { IoPricetagsOutline } from 'react-icons/io5';
import ProductItem from '../common/item/ProductItem';
import Button from '../common/Button';
import type { IAuctionRegisteredItem } from 'AuctionItem';

const OngoingMyRegister = ({ product }: { product: IAuctionRegisteredItem }) => {
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
      <Button
        color={product.participantCount ? 'black' : 'white'}
        type='button'
        size='small'
        className={`${product.participantCount ? '' : ''} w-full h-[33px] rounded-sm`}
      >
        {product.participantCount ? '경매 참여하기' : '경매 중단하기'}
      </Button>
    </ProductItem>
  );
};

export default OngoingMyRegister;
