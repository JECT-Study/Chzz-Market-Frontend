import { Button } from "@/shared";
import { useNavigate } from 'react-router-dom';
import { NOTIFICATION_CONTENTS, type IRealTimeNotification } from '../config';
import { useReadNotification } from '../model';

export const RealTimeNotificationItem = ({
  notification,
  onClose,
}: {
  notification: IRealTimeNotification;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const { mutate: readNotification } = useReadNotification();
  const { message, type, auctionId, notificationId } = notification!;
  const { buttonName, title } = NOTIFICATION_CONTENTS[type];

  const handleClick = () => {
    if (NOTIFICATION_CONTENTS[type]?.link && auctionId) {
      navigate(NOTIFICATION_CONTENTS[type].link!(auctionId), { replace: true });
    }
    readNotification(notificationId);
    onClose();
  };

  return (
    <div
      aria-label="알림 박스"
      className="min-w-[17rem] min-h-[13.5rem] w-2/5 max-w-[23rem] flex items-center flex-col justify-between p-8 bg-white rounded-lg web:text-body1 text-body2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col w-full gap-3">
        <h2 aria-label="제목" className="web:text-heading3 text-body2Bold">
          {title}
        </h2>
        <p aria-label="메시지" className="web:text-body2 text-caption">
          {message}
        </p>
      </div>
      <Button
        ariaLabel={buttonName}
        type="button"
        className="w-full py-3"
        color="cheeseYellow"
        onClick={handleClick}
      >
        {buttonName}
      </Button>
    </div >
  );
};