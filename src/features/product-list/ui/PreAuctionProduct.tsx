import { LikeCount, Price } from '@/shared';

import ProductItem from '@/components/product/ui/ProductItem';
import type { IPreAuctionItem } from '@/entities';
import { ROUTES } from '@/shared/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useToggleAuctionListHeart } from '../model';

export const PreAuctionProduct = ({ product }: { product: IPreAuctionItem }) => {
  const navigate = useNavigate();
  const { mutate: toggleAuctionListHeart } = useToggleAuctionListHeart();
  const handleProductClick = () => navigate(ROUTES.PRE_AUCTION.getItemRoute(product.productId))
  const confirmDelete = () => toggleAuctionListHeart(product.productId)

  return (
    <ProductItem product={product} onClick={handleProductClick}>
      <Price title='시작가' price={product.minPrice} />
      <LikeCount count={product.likeCount} />
      <button onClick={(event) => {
        event.stopPropagation();
        confirmDelete();
      }}
        type='button'
        className={
          `w-[10.1rem] h-[2.1rem] web:w-[21rem] web:h-[2.5rem] text-body2 web:text-body1 focus:outline-none rounded-lg transition-colors box-border
        ${product.isLiked
            ? 'bg-white border border-gray1'
            : 'bg-gray3 text-black border-none'
          }
      `}
      >
        {product.isSeller && '내가 등록한 물품'}
        {!product.isSeller && product.isLiked ? '찜 목록에서 제외' : '찜하기'}
      </button>
    </ProductItem>
  );
};
