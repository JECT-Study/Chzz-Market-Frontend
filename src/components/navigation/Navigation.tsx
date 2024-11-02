import { navIcons } from '@/constants/navIcons';
import { useGetNotifications } from '@/features/notification';
import { useNavigate } from 'react-router-dom';

interface NavigationItemProps {
  name: string;
  active: boolean;
  path: string
  unreadNotificationsCount: number;
}

const NavigationItem = ({
  name,
  active,
  path,
  unreadNotificationsCount = 0,
}: NavigationItemProps) => {
  const navigate = useNavigate();
  const iconSrc = navIcons[name][active ? 'on' : 'off'];
  const notificationCondition = name === 'notification' && unreadNotificationsCount > 0;

  return (
    <li className='flex justify-center transition-all items-center web:w-[11.25rem] w-[5.625rem] h-[3.75rem] relative'>
      <img onClick={() => navigate(path)} src={iconSrc} alt={`${name}_${active ? 'on' : 'off'}_icon`} className='cursor-pointer size-6' />
      {notificationCondition && (
        <div aria-label='읽지 않은 알림을 표시하는 빨간 점' className='absolute top-[25%] right-[42%] rounded-full size-1 bg-cheeseYellow' />
      )}
    </li>
  );
};

const Navigation = ({ active }: { active: string }) => {
  const { notifications } = useGetNotifications();
  const unreadNotificationsCount = notifications ? notifications.reduce(
    (acc, cur) => (!cur.isRead ? acc + 1 : acc),
    0,
  ) : 0

  return (
    <nav className='flex items-center h-full'>
      {Object.entries(navIcons).map(([name, value]) => (
        <NavigationItem
          key={name}
          name={name}
          active={active === name}
          path={value.path}
          unreadNotificationsCount={unreadNotificationsCount}
        />
      ))}
    </nav>
  );
};

export default Navigation;
