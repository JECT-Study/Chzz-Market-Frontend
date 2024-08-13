import { useNavigate } from 'react-router-dom';

const NavigationItem = ({
  name,
  onClick,
  active,
}: {
  name: string;
  onClick: () => void;
  active: boolean;
}) => {
  return (
    <li
      onClick={onClick}
      className="flex justify-center items-center w-[11.25rem] h-[3.75rem]"
    >
      <img
        src={`${name}_${active ? 'on' : 'off'}.svg`}
        alt={`${name}_${active ? 'on' : 'off'}_icon`}
        className="cursor-pointer size-6"
      />
    </li>
  );
};

const navItems = [
  ['home', '/'],
  ['notice', '/notice'],
  ['heart', '/heart'],
  ['my', '/my_page'],
];

const Navigation = ({ active }: { active: string }) => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center h-full">
      {navItems.map(([name, path]) => (
        <NavigationItem
          key={name}
          name={name}
          active={active === name}
          onClick={() => navigate(path)}
        />
      ))}
    </nav>
  );
};

export default Navigation;
