import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_END_POINT } from '@/constants/api';
import type { RealTimeNotificationType } from 'Notification';
import { useSSE } from '@/hooks/useSSE';
import RealTimeNotification from './RealTimeNotification';
import Popup from '../common/Popup';

const GlobalLayout = () => {
  const { state: notifications, setState: setNotifications } =
    useSSE<RealTimeNotificationType>(
      `${API_END_POINT.REALTIME_NOTIFICATION}?userId=1`,
    );

  const [currentNotification, setCurrentNotification] =
    useState<RealTimeNotificationType | null>(null);

  const closePopup = () => {
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
    <div className="flex justify-center w-full h-screen">
      <div className="relative w-[46rem] min-w-[23rem] h-full">
        <Outlet />
        {currentNotification && (
          <Popup onClose={closePopup}>
            <RealTimeNotification
              onClose={closePopup}
              notification={currentNotification}
            />
          </Popup>
        )}
      </div>
    </div>
  );
};

export default GlobalLayout;
