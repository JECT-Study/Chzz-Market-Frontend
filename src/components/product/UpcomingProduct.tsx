import React from 'react';
import { FaHeart } from 'react-icons/fa';

interface ProductProps {
  id: number;
  name: string;
  startPrice: string;
  likes: number;
}

const UpcomingProduct: React.FC<{ product: ProductProps }> = ({ product }) => {
  return (
    <div key={product.id} className="mb-4">
      <div className="flex h-[96px]">
        <div className="w-[96px] h-full bg-gray-300" />
        <div className="flex flex-col gap-[8px] ml-4">
          <div>
            <p className="text-xs">{product.name}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">
              {`시작가 ${product.startPrice}`}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <FaHeart />
            <p className="text-xs text-gray-500">{product.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingProduct;
