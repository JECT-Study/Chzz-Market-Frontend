import type { INotification } from 'Notification';
import { NOTIFICATION_CONTENTS } from '@/constants/notification';
import XButtonIcon from '@/assets/icons/x_button.svg';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { useNavigate } from 'react-router-dom';

const NotificationItem = ({
  item,
  handleDelete,
  handleRead,
}: {
  item: INotification;
  handleDelete: (id: number) => void;
  handleRead: (id: number) => void;
}) => {
  const navigate = useNavigate();
  const { id, isRead, cdnPath, message, createdAt, type, auctionId } = item;
  const time = getTimeAgo(createdAt);

  const handleClick = () => {
    if (NOTIFICATION_CONTENTS[type]?.link && auctionId) {
      navigate(NOTIFICATION_CONTENTS[type].link!(auctionId));
      handleRead(id);
    }
  };

  return (
    <div className={`p-5 flex justify-between items-start gap-3 ${!isRead && 'bg-notificationBgColor'} `} aria-label={`알림 배경_${id}`}>
      <figure onClick={handleClick} className={`flex w-full ${auctionId && 'cursor-pointer'}`} aria-label={`알림_${id}`}>
        <figcaption className='flex flex-col flex-1 justify-between min-h-[6rem] p-3'>
          <h4 className='text-body1' aria-label={`알림 제목${id}`}>
            {message}
          </h4>
          <div aria-label={`알림 시간_${id}`} className='text-gray2 text-body2'>
            {time}
          </div>
        </figcaption>
        <img className='object-cover rounded size-24' src={cdnPath} alt={`알림 이미지_${item.id}`} />
      </figure>
      <button aria-label={`알림 삭제 버튼_${item.id}`} onClick={() => handleDelete(item.id)}>
        <img className='p-2 rounded size-8 hover:bg-black/30 active:bg-black/60' src={XButtonIcon} alt='알림 삭제 아이콘' />
      </button>
    </div>
  );
};

export default NotificationItem;
