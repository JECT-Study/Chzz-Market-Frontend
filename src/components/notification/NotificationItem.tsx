import type { NotificationType } from 'Notification';
import XButtonIcon from '@/assets/icons/x_button.svg';
import { useNavigate } from 'react-router-dom';

const NotificationItem = ({
  item,
  handleDelete,
}: {
  item: NotificationType;
  handleDelete: (id: number) => void;
}) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(item.link);

  return (
    <div
      className={`p-5 flex justify-between items-start gap-3 ${!item.check && 'bg-notificationBgColor'} `}
      aria-label={`알림 배경_${item.id}`}
    >
      <figure
        onClick={handleClick}
        className="flex w-full cursor-pointer"
        aria-label={`알림_${item.id}`}
      >
        <figcaption className="flex flex-col flex-1 cursor-pointer justify-between min-h-[6rem] p-3">
          <h4 className="text-body1" aria-label={`알림 제목${item.id}`}>
            {item.message}
          </h4>
          <div
            aria-label={`알림 시간_${item.id}`}
            className="text-gray2 text-body2"
          >
            {item.time}
          </div>
        </figcaption>
        <img
          className="object-cover rounded size-24"
          src={item.img}
          alt={`알림 이미지_${item.id}`}
        />
      </figure>
      <button
        aria-label={`알림 삭제 버튼_${item.id}`}
        onClick={() => handleDelete(item.id)}
      >
        <img
          className="p-2 rounded size-8 hover:bg-black/30 active:bg-black/60"
          src={XButtonIcon}
          alt="알림 삭제 아이콘"
        />
      </button>
    </div>
  );
};

export default NotificationItem;
