import { useNavigate } from 'react-router-dom';
import newBalance from '@/assets/images/newbalance_993.jpeg';
import { categories } from '../../constants/categories';

const CategoryItem = ({ name }: { name: string }) => {
  const navigate = useNavigate();
  return (
    <li
      className="flex flex-col items-center gap-3 cursor-pointer"
      onClick={() => navigate(`/register`)}
    >
      <img
        src={newBalance}
        alt={`${name} 카테고리`}
        className="w-[5rem] h-[5em] rounded-full border p-1"
      />
      <div className="text-body2 text-gray1">{name}</div>
    </li>
  );
};

const CategoryList = () => {
  return (
    <ul className="flex flex-wrap items-center gap-5">
      {Object.values(categories).map((value: string) => (
        <CategoryItem key={value} name={value} />
      ))}
    </ul>
  );
};

export default CategoryList;
