import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../constants/categories';

const CategoryItem = ({ code, name, icon }: { code: string; name: string; icon: string }) => {
  const navigate = useNavigate();

  const onClickCategory = () => {
    navigate(`/product/list?category=${code}`, { state: { category: name }});
  };
  return (
    <li className='flex flex-col items-center h-full gap-3 cursor-pointer' onClick={onClickCategory}>
      <img src={icon} alt={`${name} 카테고리`} className='sm:w-[5rem] sm:h-[5rem] w-[3.75rem] h-[3.75rem] text-caption rounded-full bg-categoryColor sm:p-5 p-3' />
      <div className='text-body2 text-gray1'>{name.split(' ')[0]}</div>
    </li>
  );
};

const CategoryList = () => {
  return (
    <section className='flex flex-col w-full gap-4'>
      <label className='text-heading3'>카테고리</label>
      <ul className='grid items-center justify-center grid-cols-5 gap-3 sm:gap-5 sm:grid-cols-4'>
        {Object.values(CATEGORIES).map((el) => (
          <CategoryItem key={el.value} code={el.lowerCode} name={el.value} icon={el.icon} />
        ))}
      </ul>
    </section>

  );
};

export default CategoryList;
