import { ProgressiveImage } from '@/shared/ui/ProgressiveImage';
import { TimeLabel } from '@/shared/ui/TimeLabel';
import { ReactNode } from 'react';

export interface ProductProps {
  id?: number;
  auctionId?: number;
  name?: string;
  auctionName?: string;
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
  onClick
}: {
  product: ProductProps;
  children: ReactNode;
  onClick?: () => void;
}) => {
  const displayName = product.auctionName || product.name;
  const productId = product.auctionId || product.id;

  return (
    <div key={productId} className="p-1 mb-4 cursor-pointer" onClick={onClick}>
      <div className="flex flex-col">
        <div className="w-full h-auto mb-2 web:mb-4">
          <div className="relative">
            <ProgressiveImage lowResSrc={`${product.imageUrl}?h=20`} highResSrc={`${product.imageUrl}?h=228`} alt={displayName || '제품 사진'} className="object-cover w-[10rem] h-[7.5rem] web:w-full web:h-[15rem] rounded-t" priority='high' />
            {product.timeRemaining && (
              <TimeLabel time={product.timeRemaining} />
            )}
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
