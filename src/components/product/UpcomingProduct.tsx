import { ProductListItem } from '@/models/productList';
import { FaHeart } from 'react-icons/fa';

const UpcomingProduct = ({ product }: { product: ProductListItem }) => {
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
          </div>
          <div className="flex items-center gap-1">
            <FaHeart />
            <p className="text-xs text-gray-500">{product.participantCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingProduct;
