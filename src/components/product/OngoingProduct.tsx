import { OngoingAuctionListItem } from '@/@types/productList';
import { LuUsers } from 'react-icons/lu';
import ProductItem from '../common/ProductItem';
import Button from '../common/Button';

const OngoingProduct = ({ product }: { product: OngoingAuctionListItem }) => {
  return (
    <ProductItem product={product}>
      <div className="flex">
        <div className="flex gap-2">
          <LuUsers className="text-gray-500" />
          <p className="text-sm text-gray-500">참여자</p>
        </div>
        <p className="ml-4 font-semibold">{`${product.participantCount}명`}</p>
      </div>
      <Button
        color={product.isParticipating ? 'black' : 'white'}
        type="button"
        size="small"
        className={`${product.isParticipating ? '' : ''} w-full h-[33px] rounded-sm`}
      >
        {product.isParticipating ? '경매 참여하기' : '경매 중단하기'}
      </Button>
    </ProductItem>
  );
};

export default OngoingProduct;
