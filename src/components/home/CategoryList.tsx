import { useNavigate } from 'react-router-dom';
import { categories } from '../../constants/categories';

const CategoryItem = ({ name, icon }: { name: string; icon: string }) => {
  const navigate = useNavigate();

  const onClickCategory = () => {
    navigate(`/product/list?category=${name}`);
  };
  return (
    <li
      className="flex flex-col items-center gap-3 cursor-pointer"
      onClick={onClickCategory}
    >
      <img
        src={icon}
        alt={`${name} 카테고리`}
        className="sm:w-[7rem] sm:h-[7em] w-[4rem] h-[4rem] rounded-full bg-categoryColor sm:p-7 p-3"
      />
      <div className="text-body2 text-gray1">{name}</div>
    </li>
  );
};

const CategoryList = () => {
  return (
    <ul className="flex flex-wrap items-center gap-5">
      {Object.values(categories).map((el) => (
        <CategoryItem key={el.value} name={el.value} icon={el.icon} />
      ))}
    </ul>
  );
};

export default CategoryList;
