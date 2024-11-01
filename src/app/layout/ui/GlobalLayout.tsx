import { useEffect, useState } from 'react';

import type { IRealTimeNotification } from '@/features/notification/config/type';
import { useSSE } from '@/hooks/useSSE';
import { Modal } from "@/shared";
import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { Outlet } from 'react-router-dom';
import RealTimeNotification from '../../../components/notification/RealTimeNotification';

export const GlobalLayout = () => {
  const { state: notifications, setState: setNotifications } = useSSE<IRealTimeNotification>(`${API_END_POINT.REALTIME_NOTIFICATIONS}`);
  const [currentNotification, setCurrentNotification] = useState<IRealTimeNotification | null>(null);

  const closeModal = () => setCurrentNotification(null)

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
      <div className='relative w-[46.875rem] min-w-[23.4375rem] h-full'>
        <Outlet />
        {currentNotification && (
          <Modal>
            <Modal.Window closeModal={closeModal}>
              <RealTimeNotification onClose={closeModal} notification={currentNotification} />
            </Modal.Window>
          </Modal>
        )}
      </div>
    </div>
  );
};