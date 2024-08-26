import { navIcons } from '@/constants/navIcons';
import { useNavigate } from 'react-router-dom';

const NavigationItem = ({
  name,
  active,
  onClick,
}: {
  name: string;
  active: boolean;
  onClick: () => void;
}) => {
  const iconSrc = navIcons[name][active ? 'on' : 'off'];

  return (
    <li
      onClick={onClick}
      className="flex justify-center items-center w-[11.25rem] h-[3.75rem]"
    >
      <img
        src={iconSrc}
        alt={`${name}_${active ? 'on' : 'off'}_icon`}
        className="cursor-pointer size-6"
      />
    </li>
  );
};

const Navigation = ({ active }: { active: string }) => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center h-full">
      {Object.entries(navIcons).map(([name, value]) => (
        <NavigationItem
          key={name}
          name={name}
          active={active === name}
          onClick={() => navigate(value.path)}
        />
      ))}
    </nav>
  );
};

export default Navigation;
