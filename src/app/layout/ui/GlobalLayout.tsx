import { Outlet } from 'react-router-dom';
import { RealTimeNotification } from '@/features/notification';

export const GlobalLayout = () => {

  return (
    <div className='flex justify-center w-full h-screen'>
      <div className='relative h-full w-web min-w-mobile'>
        <Outlet />
        <RealTimeNotification />
      </div>
    </div>
  );
};