import { CATEGORIES } from '@/constants/categories';
import { useNavigate } from 'react-router-dom';
import Price from '../common/atomic/Price';

interface DetailsBasicProps {
  productName: string, category: string, minPrice: number
}

const DetailsBasic = ({ productName, category, minPrice }: DetailsBasicProps) => {
  const navigate = useNavigate();

  const onClickCategory = () => {
    navigate(`/product/list?category=${category}`, { state: { category: CATEGORIES[category].value } });
  };

  return (
    <>
      <div className='flex flex-col gap-[6px] h-[5.25rem]'>
        <p className='text-heading2'>
          {productName}
        </p>
        <span className='inline-flex'>
          <button onClick={onClickCategory} className='underline cursor-pointer text-gray2 text-body2'>{CATEGORIES[category].value}</button>
        </span>
        <Price title='시작가' price={minPrice} />
      </div>
    </>
  );
}

export default DetailsBasic;
