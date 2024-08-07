import { LuUsers } from 'react-icons/lu';
import Button from '@/components/common/Button';
import { ProductListItem } from '@/models/productList';

const OngoingProduct = ({ product }: { product: ProductListItem }) => {
  return (
    <div key={product.id} className="mb-4">
      <div className="flex h-[96px]">
        <div className="w-[96px] h-full bg-gray-300" />
        <div className="flex flex-col gap-[8px] ml-4">
          <div>
            <p className="text-xs">{}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">
              {`시작가 ${product.minPrice.toLocaleString()}원`}
            </p>
            <div className="flex gap-1">
              <LuUsers />
              <p className="text-xs text-gray-500">
                {`${product.participantCount}명 참여 중`}
              </p>
            </div>
          </div>
          <Button
            color="black"
            type="button"
            className={`${product.isParticipating ? 'bg-gray-700' : 'bg-black'} w-[100px] h-[33px] rounded-md`}
          >
            {product.isParticipating ? '경매 참여 중' : '경매 참여하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OngoingProduct;
