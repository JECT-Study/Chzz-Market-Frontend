import { navIcons } from '@/constants/navIcons';
import { useNavigate } from 'react-router-dom';
import { useGetNotifications } from '../notification/queries';

const NavigationItem = ({
  name,
  active,
  onClick,
  unreadNotificationsCount = 0,
}: {
  name: string;
  active: boolean;
  onClick: () => void;
  unreadNotificationsCount?: number;
}) => {
  const iconSrc = navIcons[name][active ? 'on' : 'off'];
  const notificationCondition =
    name === 'notification' && unreadNotificationsCount > 0;

  return (
    <li className="flex justify-center transition-all items-center w-[11.25rem] h-[3.75rem] relative">
      <img
        onClick={onClick}
        src={iconSrc}
        alt={`${name}_${active ? 'on' : 'off'}_icon`}
        className="cursor-pointer size-6"
      />
      {notificationCondition && (
        <div
          aria-label="읽지 않은 알림을 표시하는 빨간 점"
          className="absolute top-[25%] right-[42%] rounded-full size-1 bg-cheeseYellow"
        />
      )}
    </li>
  );
};

const Navigation = ({ active }: { active: string }) => {
  const navigate = useNavigate();
  const { notifications } = useGetNotifications();

  const unreadNotificationsCount = notifications?.reduce(
    (acc, cur) => (!cur.isRead ? acc + 1 : acc),
    0,
  );

  return (
    <nav className="flex items-center h-full">
      {Object.entries(navIcons).map(([name, value]) => (
        <NavigationItem
          key={name}
          name={name}
          active={active === name}
          onClick={() => {
            navigate(value.path);
          }}
          unreadNotificationsCount={unreadNotificationsCount}
        />
      ))}
    </nav>
  );
};

export default Navigation;
