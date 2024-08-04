const NavigationItem = ({
  name,
  active,
}: {
  name: string;
  active: boolean;
}) => (
  <div className="flex justify-center items-center w-[11.25rem] h-[3.75rem]">
    <img
      src={`${name}_${active ? 'on' : 'off'}.svg`}
      alt={`${name}_${active ? 'on' : 'off'}`}
      className="cursor-pointer size-7"
    />
  </div>
);

const Navigation = ({ active }: { active: string }) => {
  const items = ['home', 'notice', 'heart', 'my'];
  return (
    <nav className="flex items-center h-full">
      {items.map((item) => (
        <NavigationItem key={item} name={item} active={active === item} />
      ))}
    </nav>
  );
};

export default Navigation;
