import { categories } from '../../constants/categories';

const CategoryItem = ({ name }: { name: string }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src="/air-jordan-row.jpeg"
        alt="air-jordan-row"
        className="w-[4rem] h-[4rem] rounded-full"
      />
      <div className="text-sm">{name}</div>
    </div>
  );
};

const CategoryList = () => {
  return (
    <div className="grid w-full grid-cols-4 gap-4">
      {Object.values(categories).map((value: string) => (
        <CategoryItem key={value} name={value} />
      ))}
    </div>
  );
};

export default CategoryList;
