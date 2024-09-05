import { LuUsers } from 'react-icons/lu';
import { IoPricetagsOutline } from 'react-icons/io5';
import jordanBlackImage from '@/assets/images/jordan_black.jpeg';
import { getTimeColor } from '@/utils/getTimeColor';
import {
  OngoingProductListItem,
  PreEnrollProductListItem,
} from '@/@types/productList';
import Button from './Button';

interface ProductProps
  extends PreEnrollProductListItem,
    OngoingProductListItem {
  cdnPath: string;
}

const ProductItem = ({ product }: { product: ProductProps }) => {
  const remainHour = Math.floor(product.timeRemaining / 3600);
  const timeColor = getTimeColor(remainHour);

  return (
    <div key={product.id} className="mb-4">
      <div className="flex flex-col">
        <div className="w-full h-auto mb-4">
          <div className="relative">
            <img
              className="object-cover w-full h-[10rem] rounded-t"
              src={jordanBlackImage}
              alt="Jordan Black Shoes"
            />
            <div
              className={`absolute bottom-0 w-full pt-1 text-center bg-white opacity-80 ${timeColor} border-b-2`}
            >
              {`${remainHour}시간 남음`}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <div>
            <p className="text-sm font-semibold">{product.name}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div className="flex gap-2">
                <IoPricetagsOutline className="text-gray-500" />
                <p className="text-sm text-gray-500">시작가</p>
              </div>
              <p className="ml-4 font-semibold">
                {`${product.minPrice.toLocaleString()}원`}
              </p>
            </div>
            <div className="flex">
              <div className="flex gap-2">
                <LuUsers className="text-gray-500" />
                <p className="text-sm text-gray-500">참여자</p>
              </div>
              <p className="ml-4 font-semibold">
                {`${product.participantCount}명`}
              </p>
            </div>
          </div>
          <Button
            color={product.isParticipating ? 'black' : 'white'}
            type="button"
            size="small"
            className={`${product.isParticipating ? '' : ''} w-[160px] h-[33px] rounded-sm`}
          >
            {product.isParticipating ? '경매 참여 중' : '경매 참여하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
