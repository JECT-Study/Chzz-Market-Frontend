import { useEffect, useState } from 'react';

import { API_END_POINT } from '@/constants/api';
import { Outlet } from 'react-router-dom';
import type { IRealTimeNotification } from 'Notification';
import { useSSE } from '@/hooks/useSSE';
import Popup from '../common/Popup';
import RealTimeNotification from './RealTimeNotification';
import { useReadNotification } from '../notification/queries';

const GlobalLayout = () => {
  const { state: notifications, setState: setNotifications } = useSSE<IRealTimeNotification>(`${API_END_POINT.REALTIME_NOTIFICATIONS}`);

  const [currentNotification, setCurrentNotification] = useState<IRealTimeNotification | null>(null);

  const { mutate: readNotification } = useReadNotification();

  const closePopup = () => {
    if (currentNotification && !currentNotification.auctionId) readNotification(currentNotification.notificationId);
    setCurrentNotification(null);
  };

  useEffect(() => {
    const showNextNotification = () => {
      setCurrentNotification(notifications[0]);
      setNotifications((prev) => prev.slice(1));
    };
    if (currentNotification === null && notifications.length > 0) {
      showNextNotification();
    }
  }, [currentNotification, notifications, setNotifications]);

  return (
    <div className='flex justify-center w-full h-screen'>
      <div className='relative w-[46rem] min-w-[23rem] h-full'>
        <Outlet />
        {currentNotification && (
          <Popup onClose={closePopup}>
            <RealTimeNotification onClose={closePopup} notification={currentNotification} />
          </Popup>
        )}
      </div>
    </div>
  );
};

export default GlobalLayout;
