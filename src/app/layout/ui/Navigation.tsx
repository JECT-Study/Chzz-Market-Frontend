import { useGetNotificationList } from '@/features/notification/model/useGetNotificationList';
import { useNavigate } from 'react-router';
import { NAV_ICONS } from '../config/navIcons';

interface NavigationItemProps {
  name: string;
  active: boolean;
  path: string;
  unreadNotificationsCount: number;
}

const NavigationItem = ({
  name,
  active,
  path,
  unreadNotificationsCount = 0
}: NavigationItemProps) => {
  const navigate = useNavigate();
  const iconSrc = NAV_ICONS[name][active ? 'on' : 'off'];
  const notificationCondition =
    name === 'notification' && unreadNotificationsCount > 0;

  return (
    <li aria-label={`${name}_icon`} className='flex justify-center transition-all items-center w-[11.25rem] min-w-[5.625rem] h-[3.75rem] relative'>
      <div className="relative">
        <img
          onClick={() => navigate(path)}
          src={iconSrc}
          alt={`${name}_${active ? 'on' : 'off'}_icon`}
          className="cursor-pointer size-6"
        />
        {notificationCondition && (
          <div
            aria-label="읽지 않음 표시"
            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rounded-full size-1 bg-cheeseYellow"
          />
        )}
      </div>

    </li>
  );
};

export const Navigation = ({ active }: { active: string }) => {
  const { notificationList } = useGetNotificationList();
  const unreadNotificationsCount = notificationList
    ? notificationList.reduce((acc, cur) => (!cur.isRead ? acc + 1 : acc), 0)
    : 0;

  return (
    <nav
      className="flex items-center h-full -mx-[22.5px]"
      aria-label="main navigation"
    >
      <ul className="flex w-full" role="menu">
        {Object.entries(NAV_ICONS).map(([name, value]) => (
          <NavigationItem
            key={name}
            name={name}
            active={active === name}
            path={value.path}
            unreadNotificationsCount={unreadNotificationsCount}
          />
        ))}
      </ul>
    </nav>
  );
};
