import { CATEGORIES } from '@/shared/constants/categories';
import { Icon } from '@/shared/ui/Icon';
import { useNavigate } from 'react-router';

const CategoryItem = ({
  code,
  name,
  icon
}: {
  code: string;
  name: string;
  icon: string;
}) => {
  const navigate = useNavigate();
  const onClickCategory = () => {
    navigate(`/product/list?category=${code}`, { state: { category: name } });
  };

  return (
    <li
      aria-label={code}
      className="flex flex-col items-center h-full gap-2 cursor-pointer"
      onClick={onClickCategory}
    >
      <Icon name={icon} ariaLabel={`${name} 카테고리`} style='p-3 rounded-full size-14 text-caption bg-categoryColor' />
      <div className="text-caption text-gray1">{name.split(' ')[0]}</div>
    </li>
  );
};

const CategoryList = () => {
  return (
    <section className="flex flex-col w-full gap-6">
      <label className="text-heading3">카테고리</label>
      <ul className="grid items-center justify-center grid-cols-5 gap-2">
        {Object.values(CATEGORIES).map((el) => (
          <CategoryItem
            key={el.value}
            code={el.lowerCode}
            name={el.value}
            icon={el.icon}
          />
        ))}
      </ul>
    </section>
  );
};

export default CategoryList;
