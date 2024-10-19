import ProfileDefaultImage from '@/assets/icons/profile.svg';
import { CATEGORIES } from '@/constants/categories';
import MinPrice from '../common/atomic/MinPrice';

interface DetailsBasicProps {
  profileImg: string, nickname: string, productName: string, category: string, minPrice: number
}

const DetailsBasic = ({ profileImg, nickname, productName, category, minPrice }: DetailsBasicProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-2'>
        <img src={profileImg ?? ProfileDefaultImage} alt="판매자 프로필" className='border rounded-full size-10' />
        <p className='text-body2'>
          {nickname}
        </p>
      </div>
      <p className='text-heading2'>
        {productName}
      </p>
      <span className='inline underline cursor-pointer text-gray2 text-body2'>{CATEGORIES[category].value}</span>
      <MinPrice price={minPrice} />
    </div>

  );
}

export default DetailsBasic;
