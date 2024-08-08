import { ProductListItem } from '@/models/productList';
import { LuUsers } from 'react-icons/lu';
import Button from './Button';

const ProductLists = ({ product }: { product: ProductListItem }) => {
  const remainHour = Math.floor(product.timeRemaining / 3600);

  return (
    <div key={product.id} className="mb-4">
      <div className="flex h-[106px]">
        <div className="relative w-[96px] h-full">
          <img
            className="w-full h-full"
            src="/bank_NH.svg"
            alt="Jordan Black Shoes"
          />
          <p className="absolute bottom-0 text-sm font-semibold text-orange-400">
            {`${remainHour}시간 남음`}
          </p>
        </div>
        <div className="flex flex-col gap-[8px] ml-4">
          <div>
            <p className="text-sm font-semibold">{product.name}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">
              {`시작가 ${product.minPrice.toLocaleString()}원`}
            </p>
            <div className="flex gap-1">
              <LuUsers />
              <p className="text-sm text-gray-500">
                {`${product.participantCount}명 참여 중`}
              </p>
            </div>
          </div>
          <Button
            color="white"
            type="button"
            size="small"
            className={`${product.isParticipating ? '' : ''} w-[100px] h-[33px] rounded`}
          >
            {product.isParticipating ? '경매 참여 중' : '경매 참여하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductLists;
