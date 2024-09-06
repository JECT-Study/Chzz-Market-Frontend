import type { RealTimeNotificationType } from 'Notification';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const RealTimeNotification = ({
  notification,
  onClose,
}: {
  notification: RealTimeNotificationType | null;
  onClose: () => void;
}) => {
  const { title, message, buttonName } = notification!;
  const navigate = useNavigate();

  const handleClick = () => {
    if (buttonName !== '확인') {
      // 알림에 따라 특정 링크로 이동
      navigate('/notification');
    }
    onClose();
    // 읽는 작업
  };

  return (
    <div
      aria-label="알림 박스"
      className="p-7 w-[20rem] h-[15rem] flex flex-col justify-between gap-5 bg-white rounded-lg"
      onClick={(e) => e.stopPropagation()}
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
