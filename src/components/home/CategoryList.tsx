import { categories } from '../../constants/categories';
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({ name, icon }: { name: string; icon: string }) => {
  const navigate = useNavigate();

  const onClickCategory = () => {
    navigate(`/product/list?category=${name}`);
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
    <ul className='flex flex-wrap items-center gap-5'>
      {Object.values(categories).map((el) => (
        <CategoryItem key={el.value} name={el.code} icon={el.icon} />
      ))}
    </ul>
  );
};

export default CategoryList;
