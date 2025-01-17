import { Outlet } from 'react-router-dom';
import { RealTimeNotification } from '@/features/notification';

export const GlobalLayout = () => {

  return (
    <div className='flex justify-center w-full' style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      <div className='relative h-full w-web min-w-mobile'>
        <Outlet />
        <RealTimeNotification />
      </div>
    </div>
  );
};