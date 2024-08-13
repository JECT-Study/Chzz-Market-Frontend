import type { PreEnrollProduct, Product } from 'Product';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

type HomeItemProps<T> = T extends 'pre_enroll'
  ? { kind: 'pre_enroll'; product: PreEnrollProduct; idx: number }
  : T extends 'best' | 'deadline'
    ? { kind: 'best' | 'deadline'; product: Product; idx: number }
    : never;

const HomeProductItem = <T extends 'pre_enroll' | 'enroll' | 'deadline'>({
  kind,
  product,
  idx,
}: HomeItemProps<T>) => {
  const navigate = useNavigate();
  const timeColor =
    kind !== 'pre_enroll' &&
    (product.timeLeft < 8
      ? ' text-timeColor1 border-timeColor1'
      : product.timeLeft < 16
        ? ' text-timeColor2 border-timeColor2'
        : ' text-timeColor3 border-timeColor3');

  return (
    <figure
      className="flex flex-col min-w-[10rem] gap-2 border rounded text-body2"
      aria-label={kind}
      onClick={() => navigate(`/products/1`)}
    >
      <div className="relative">
        <img
          src={product.img}
          alt={`${idx}_${product.img}_${kind}`}
          className="object-cover w-full h-[10rem] rounded-t"
        />
        {kind !== 'pre_enroll' && (
          <div
            aria-label={`${idx}_남은 시간_${kind}`}
            className={`absolute bottom-0 w-full pt-1 text-center bg-white opacity-80 ${timeColor} border-b-2`}
          >
            {product.timeLeft}시간 남음
          </div>
        )}
      </div>
      <figcaption className="flex flex-col items-start justify-start flex-1 w-full p-2">
        <div aria-label={`${idx}_이름_${kind}`} className="text-gray1">
          {product.name}
        </div>
        <div
          aria-label={`${idx}_시작 가격_${kind}`}
          className="text-body2Bold text-gray1"
        >
          {product.startPrice}
        </div>
        {kind !== 'pre_enroll' && (
          <div
            aria-label={`${idx}_경매 참여자 수_${kind}`}
            className="flex items-center text-gray2"
          >
            <AiOutlineUsergroupDelete />
            <span>경매 참여자 {product.activeUserCount}명</span>
          </div>
        )}
      </figcaption>
    </figure>
  );
};

export default HomeProductItem;
