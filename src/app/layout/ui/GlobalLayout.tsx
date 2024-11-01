
import { RealTimeNotification } from '@/features/notification';
import { Outlet } from 'react-router-dom';

export const GlobalLayout = () => {

  return (
    <div className='flex justify-center w-full h-screen'>
      <div className='relative w-[46.875rem] min-w-[23.4375rem] h-full'>
        <Outlet />
        <RealTimeNotification />
      </div>
    </div>
  );
};