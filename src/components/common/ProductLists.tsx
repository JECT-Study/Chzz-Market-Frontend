import { ProductListItem } from '@/models/productList';
import { LuUsers } from 'react-icons/lu';
import { IoPricetagsOutline } from 'react-icons/io5';
import Button from './Button';

const ProductLists = ({ product }: { product: ProductListItem }) => {
  const remainHour = Math.floor(product.timeRemaining / 3600);

  return (
    <div key={product.id} className="mb-4">
      <div className="flex h-[106px]">
        <div className="relative w-[96px] h-full">
          <img
            className="w-full h-full"
            src="/Nike_RedWhite_Thumbnail.jpeg"
            alt="Jordan Black Shoes"
          />
          <p className="absolute bottom-0 left-3.5 text-sm font-semibold text-orange-400">
            {`${remainHour}시간 남음`}
          </p>
        </div>
        <div className="flex flex-col gap-[8px] ml-4">
          <div>
            <p className="text-sm font-semibold">{product.name}</p>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <div className="w-[104px] flex justify-center gap-2">
                <IoPricetagsOutline className="text-gray-500" />
                <p className="text-sm text-gray-500">시작가</p>
              </div>
              <p className="flex justify-center font-semibold">
                {`${product.minPrice.toLocaleString()}원`}
              </p>
            </div>
            <div className="flex flex-col">
              <div className="w-[104px] flex justify-center gap-2">
                <LuUsers className="text-gray-500" />
                <p className="text-sm text-gray-500">참여자</p>
              </div>
              <p className="flex justify-center font-semibold">
                {`${product.participantCount}명`}
              </p>
            </div>
          </div>
          <Button
            color={product.isParticipating ? 'black' : 'white'}
            type="button"
            size="small"
            className={`${product.isParticipating ? '' : ''} w-[215px] h-[33px] rounded-sm`}
          >
            {product.isParticipating ? '경매 참여 중' : '경매 참여하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductLists;
