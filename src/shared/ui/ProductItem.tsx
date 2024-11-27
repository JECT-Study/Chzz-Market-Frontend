import { ReactNode } from 'react';
import { TimeLabel } from '@/shared/ui';

export interface ProductProps {
  id?: number;
  auctionId?: number;
  name?: string;
  productName?: string;
  minPrice: number;
  timeRemaining?: number;
  participantCount?: number;
  isParticipating?: boolean;
  likeCount?: number;
  isLiked?: boolean;
  status?: string;
  createdAt?: string;
  imageUrl?: string;
}

export const ProductItem = ({
  product,
  children,
  onClick,
}: {
  product: ProductProps;
  children: ReactNode;
  onClick?: () => void;
}) => {
  const displayName = product.productName || product.name;
  const productId = product.auctionId || product.id;

  return (
    <div key={productId} className="p-1 mb-4 cursor-pointer" onClick={onClick}>
      <div className="flex flex-col">
        <div className="w-full h-auto mb-2 web:mb-4">
          <div className="relative">
            <img
              className="object-cover w-[10rem] h-[7.5rem] web:w-full web:h-[15rem] rounded-t"
              src={product.imageUrl}
              alt={displayName || '제품 사진'}
            />
            {product.timeRemaining && <TimeLabel time={product.timeRemaining} />}
          </div>
        </div>

        <div className="flex flex-col gap-[2px] web:gap-[4px]">
          <div>
            <p className="text-body2 web:text-heading3">{displayName}</p>
          </div>
          <div className="flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
};