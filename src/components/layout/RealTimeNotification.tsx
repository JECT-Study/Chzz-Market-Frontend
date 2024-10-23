import { NOTIFICATION_CONTENTS } from '@/constants/notification';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import type { IRealTimeNotification } from '@/@types/Notification';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useReadNotification } from '../notification/queries';

const RealTimeNotification = ({
  notification,
  onClose,
}: {
  notification: IRealTimeNotification;
  onClose: () => void;
}) => {
  const ref = useOutsideClick(onClose)
  const navigate = useNavigate();
  const { mutate: readNotification } = useReadNotification();
  const { message, type, auctionId, notificationId } = notification!;
  const { buttonName, title } = NOTIFICATION_CONTENTS[type];

  const handleClick = () => {
    if (NOTIFICATION_CONTENTS[type]?.link && auctionId) {
      navigate(NOTIFICATION_CONTENTS[type].link!(auctionId));
    }
    readNotification(notificationId);
    onClose();
  };

  return (
    <div
      aria-label="알림 박스"
      className="p-7 w-[20rem] h-[15rem] flex flex-col justify-between gap-5 bg-white rounded-lg"
      ref={ref}
    >
      <div className="flex flex-col gap-5">
        <h2 aria-label="알림 제목" className="text-heading2">
          {title}
        </h2>
        <div aria-label="알림 메시지" className="text-body1">
          {message}
        </div>
      </div>
      <Button
        ariaLabel={buttonName}
        type="button"
        hoverColor="black"
        className="w-full py-3"
        color="cheeseYellow"
        onClick={handleClick}
      >
        {buttonName}
      </Button>
    </div>
  );
};

export default RealTimeNotification;
