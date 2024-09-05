import { OngoingProductListItem } from '@/@types/productList';
import { LuUsers } from 'react-icons/lu';
import ProductLists from '../common/ProductItem';

const OngoingProduct = ({ product }: { product: OngoingProductListItem }) => {
  return (
    <ProductLists product={product}>
      <div className="flex">
        <div className="flex gap-2">
          <LuUsers className="text-gray-500" />
          <p className="text-sm text-gray-500">참여자</p>
        </div>
        <p className="ml-4 font-semibold">{`${product.participantCount}명`}</p>
      </div>
    </ProductLists>
  );
};

export default OngoingProduct;
