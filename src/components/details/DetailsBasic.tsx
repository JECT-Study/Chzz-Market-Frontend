import ProfileDefaultImage from '@/assets/icons/profile.svg';
import { CATEGORIES } from '@/constants/categories';
import { useNavigate } from 'react-router-dom';
import MinPrice from '../common/atomic/MinPrice';

interface DetailsBasicProps {
  profileImg: string, nickname: string, productName: string, category: string, minPrice: number
}

const DetailsBasic = ({ profileImg, nickname, productName, category, minPrice }: DetailsBasicProps) => {
  const navigate = useNavigate();

  const onClickCategory = () => {
    navigate(`/product/list?category=${CATEGORIES[category].lowerCode}`);
  };

  return (
    <div className='flex flex-col gap-2 sm:gap-4'>
      <div className='flex items-center gap-2'>
        <img src={profileImg ?? ProfileDefaultImage} alt="판매자 프로필" className='border rounded-full size-10' />
        <p className='text-body2'>
          {nickname}
        </p>
      </div>
      <p className='text-heading2'>
        {productName}
      </p>
      <span className='inline-flex'>
        <button onClick={onClickCategory} className='underline cursor-pointer shrink-0 grow-0 text-gray2 text-body2'>{CATEGORIES[category].value}</button>
      </span>
      <MinPrice title='시작가' price={minPrice} />
    </div>

  );
}

export default DetailsBasic;
