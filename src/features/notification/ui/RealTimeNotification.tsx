import { API_END_POINT, Modal } from "@/shared";
import { useEffect, useState } from "react";
import { RealTimeNotificationItem } from ".";
import type { IRealTimeNotification } from "../config";
import { useSSE } from "../model";

export const RealTimeNotification = () => {
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
    <>
      {currentNotification && (
        <Modal>
          <Modal.Window closeModal={closeModal}>
            <RealTimeNotificationItem onClose={closeModal} notification={currentNotification} />
          </Modal.Window>
        </Modal>
      )}
    </>
  );
}