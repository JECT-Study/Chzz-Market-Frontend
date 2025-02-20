import { API_END_POINT } from "@/shared/constants/apiEndPoint";
import { useEffect, useState } from "react";

import type { IRealTimeNotification } from "../config";
import { RealTimeNotificationItem } from ".";
import { useSSE } from "../model";
import { Modal } from "@/shared/ui/Modal";

export const RealTimeNotification = () => {
  const { state: notifications, setState: setNotifications } =
    useSSE<IRealTimeNotification>(`${API_END_POINT.REALTIME_NOTIFICATIONS}`);
  const [currentNotification, setCurrentNotification] =
    useState<IRealTimeNotification | null>(null);

  const closeModal = () => setCurrentNotification(null);

  useEffect(() => {
    const showNextNotification = () => {
      setCurrentNotification(notifications[0]);
      setNotifications((prev) => prev.slice(1));
    };
    if (currentNotification === null && notifications.length > 0) {
      if (import.meta.env.MODE === 'development') return;
      showNextNotification();
    }
  }, [currentNotification, notifications, setNotifications]);
  return (
    <>
      {currentNotification && (
        <Modal>
          <Modal.Window closeModal={closeModal}>
            <RealTimeNotificationItem
              onClose={closeModal}
              notification={currentNotification}
            />
          </Modal.Window>
        </Modal>
      )}
    </>
  );
};
