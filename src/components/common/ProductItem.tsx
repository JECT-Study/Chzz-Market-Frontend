import jordanBlackImage from '@/assets/images/jordan_black.jpeg';
import { getTimeColor } from '@/utils/getTimeColor';
import { useEffect } from 'react';

export interface ProductProps {
  id: number;
  name: string;
  minPrice: number;
  cdnPath?: string | null;
  timeRemaining?: number;
  participantCount?: number;
  isParticipating?: boolean;
  likeCount?: number;
  isLiked?: boolean;
  status?: string;
  createdAt?: string;
}

const ProductItem = ({
  product,
  children,
  onDelete,
}: {
  product: ProductProps;
  children: React.ReactNode;
  onDelete: (id: number) => void;
}) => {
  const remainHour = Math.floor(product.timeRemaining ?? 0 / 3600);
  const timeColor = getTimeColor(remainHour);

  useEffect(() => {
    if (remainHour === 0) {
      onDelete(product.id);
    }
  }, [remainHour, onDelete, product.id]);

  return (
    <div key={product.id} className="mb-4">
      <div className="flex flex-col">
        <div className="w-full h-auto mb-4">
          <div className="relative">
            <img
              className="object-cover w-full h-[10rem] rounded-t"
              src={`${product.cdnPath ? product.cdnPath : jordanBlackImage}`}
              alt="Jordan Black Shoes"
            />
            {remainHour && (
              <div
                className={`absolute bottom-0 w-full pt-1 text-center bg-white opacity-80 ${timeColor} border-b-2`}
              >
                {`${remainHour}시간 남음`}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <div>
            <p className="text-sm font-semibold">{product.name}</p>
          </div>
          <div className="flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
