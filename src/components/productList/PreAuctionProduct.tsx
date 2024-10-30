import type { IPreAuctionItem } from '@/@types/AuctionItem';
import ROUTES from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import LikeCount from '../common/atomic/LikeCount';
import Price from '../common/atomic/Price';
import ProductItem from '../common/item/ProductItem';
import { useToggleAuctionListHeart } from './queries';

const PreAuctionProduct = ({ product }: { product: IPreAuctionItem }) => {
  const navigate = useNavigate();
  const { mutate: toggleAuctionListHeart } = useToggleAuctionListHeart();
  const handleProductClick = () => navigate(ROUTES.getPreAuctionItemRoute(product.productId))
  const confirmDelete = () => toggleAuctionListHeart(product.productId)

  return (
    <ProductItem product={product} onClick={handleProductClick}>
      <Price title='시작가' price={product.minPrice} />
      <LikeCount count={product.likeCount} />
      <button onClick={(event) => {
        event.stopPropagation();
        confirmDelete();
      }} type='button' 
      className={
        `w-[10.1rem] h-[2.1rem] web:w-[21rem] web:h-[2.5rem] text-body2 web:text-body1 focus:outline-none rounded-lg transition-colors box-border
        ${product.isLiked
          ? 'bg-white border border-gray1'
          : 'bg-gray3 text-black border-none'
        }
      `}
      >
        {product.isLiked ? '찜 목록에서 제외' : '미리 찜하기'}
      </button>
    </ProductItem>
  );
};

export default PreAuctionProduct;
