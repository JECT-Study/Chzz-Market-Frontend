import type { PreRegisterProduct, Product } from 'Product';

import PriceIcon from '@/assets/icons/price.svg';
import UserIcon from '@/assets/icons/user.svg';
import { getTimeColor } from '@/utils/getTimeColor';
import { useNavigate } from 'react-router-dom';

type HomeItemProps<T> = T extends 'pre-register'
  ? { kind: 'pre-register'; product: PreRegisterProduct; idx: number }
  : T extends 'best' | 'imminent'
    ? { kind: 'best' | 'imminent'; product: Product; idx: number }
    : never;

const HomeProductItem = <T extends 'pre-register' | 'best' | 'imminent'>({
  kind,
  product,
  idx,
}: HomeItemProps<T>) => {
  const navigate = useNavigate();
  const timeColor = kind !== 'pre-register' && getTimeColor(product.timeLeft);

  return (
    <figure
      className="flex flex-col min-w-[10rem] gap-2 border rounded text-body2 cursor-pointer"
      aria-label={kind}
      onClick={() => navigate(`/products/1`)}
    >
      <div className="relative">
        <img
          src={product.img}
          alt={`${idx}_img_${kind}`}
          className="object-cover w-full h-[10rem] rounded-t"
        />
        {kind !== 'pre-register' && (
          <div
            aria-label={`${idx}_timeLeft_${kind}`}
            className={`absolute bottom-0 w-full pt-1 text-center bg-white opacity-80 ${timeColor} border-b-2`}
          >
            {product.timeLeft}시간 남음
          </div>
        )}
      </div>
      <figcaption className="flex flex-col items-start justify-start flex-1 w-full p-2">
        <div aria-label={`${idx}_name_${kind}`} className="text-gray1">
          {product.name}
        </div>
        <div
          aria-label={`${idx}_startPrice_${kind}`}
          className="flex items-center text-gray2"
        >
          <img src={PriceIcon} alt="price_icon" />
          <span>
            시작가{' '}
            <span className="text-black text-body2Bold">
              {product.startPrice}
            </span>
          </span>
        </div>
        {kind !== 'pre-register' && (
          <div
            aria-label={`${idx}_activeUserCount_${kind}`}
            className="flex items-center text-gray2"
          >
            <img src={UserIcon} alt="user_icon" />
            <span>
              참여자{' '}
              <span className="text-black text-body2Bold">
                {product.activeUserCount}명
              </span>
            </span>
          </div>
        )}
      </figcaption>
    </figure>
  );
};

export default HomeProductItem;
