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
        <h2 className='text-heading2' aria-label="상품 이름">
          {auctionName}
        </h2>
        <span className='inline-flex'>
          <button aria-label="카테고리" onClick={onClickCategory} className='underline cursor-pointer text-gray2 text-body2'>{CATEGORIES[category].value}</button>
        </span>
        <Price title='시작가' price={minPrice} />
      </div>
    </>
  );
}