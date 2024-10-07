import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../constants/categories';

const CategoryItem = ({ code, name, icon }: { code: string; name: string; icon: string }) => {
  const navigate = useNavigate();

  const onClickCategory = () => {
    navigate(`/product/list?category=${code}`);
  };
  return (
    <li className='flex flex-col items-center gap-3 cursor-pointer' onClick={onClickCategory}>
      <img src={icon} alt={`${name} 카테고리`} className='sm:w-[5rem] sm:h-[5em] w-[3rem] h-[3rem] rounded-full bg-categoryColor sm:p-4 p-2' />
      <div className='text-body2 text-gray1'>{name}</div>
    </li>
  );
};

const CategoryList = () => {
  return (
    <section className='flex flex-col w-full gap-4'>
      <label className='text-lg font-semibold'>카테고리</label>
      <div className='flex gap-4'>
        <ul className='flex flex-wrap items-center gap-5'>
          {Object.values(CATEGORIES).map((el) => (
            <CategoryItem key={el.value} code={el.code} name={el.value} icon={el.icon} />
          ))}
        </ul>
      </div>
    </section>

  );
};

export default CategoryList;
