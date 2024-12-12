import { CATEGORIES, Price } from "@/shared";
import { useNavigate } from 'react-router-dom';

interface DetailsBasicProps {
  auctionName: string, category: string, minPrice: number
}

export const DetailsBasic = ({ auctionName, category, minPrice }: DetailsBasicProps) => {
  const navigate = useNavigate();

  const onClickCategory = () => {
    navigate(`/product/list?category=${CATEGORIES[category].lowerCode}`, { state: { category: CATEGORIES[category].value } });
  };

  return (
    <>
      <div className='flex flex-col gap-[6px] h-[5.25rem]'>
        <p className='text-heading2'>
          {auctionName}
        </p>
        <span className='inline-flex'>
          <button onClick={onClickCategory} className='underline cursor-pointer text-gray2 text-body2'>{CATEGORIES[category].value}</button>
        </span>
        <Price title='시작가' price={minPrice} />
      </div>
    </>
  );
}