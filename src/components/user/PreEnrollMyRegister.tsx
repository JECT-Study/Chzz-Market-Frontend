import type { IPreAuctionRegisteredItem } from '@/@types/AuctionItem';
import ROUTES from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import LikeCount from '../common/atomic/LikeCount';
import MinPrice from '../common/atomic/MinPrice';
import ProductItem from '../common/item/ProductItem';

const PreEnrollMyRegister = ({ product }: { product: IPreAuctionRegisteredItem }) => {
  const navigate = useNavigate()
  const clickProduct = () => navigate(ROUTES.getPreAuctionItemRoute(product.productId))

  return (
    <ProductItem product={product} onClick={clickProduct}>
      <MinPrice title='시작가' price={product.minPrice} />
      <LikeCount count={product.likeCount} />
    </ProductItem>
  );
};

export default PreEnrollMyRegister;
