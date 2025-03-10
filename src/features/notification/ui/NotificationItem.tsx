import { Icon } from '@/shared/ui/Icon';
import { getTimeAgo } from '@/shared/utils/getTimeAgo';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router';
import { NOTIFICATION_CONTENTS } from '../config/constants';
import { type INotification } from '../config/type';
import { useDeleteNotification } from '../model/useDeleteNotification';
import { useReadNotification } from '../model/useReadNotification';

export const NotificationItem = ({ item }: { item: INotification }) => {
  const {
    notificationId,
    isRead,
    imageUrl,
    message,
    createdAt,
    type,
    auctionId
  } = item;

  const navigate = useNavigate();
  const time = getTimeAgo(createdAt);
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutate: readNotification } = useReadNotification();

  const handleClick = () => {
    if (!isRead) readNotification(notificationId);
    if (NOTIFICATION_CONTENTS[type]?.link && auctionId)
      navigate(NOTIFICATION_CONTENTS[type].link!(auctionId));
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteNotification(notificationId);
  };

  return (
    <li
      onClick={handleClick}
      className={`p-10 flex justify-between items-start gap-3 ${!isRead && 'bg-notificationBgColor'} ${auctionId && 'cursor-pointer'}`}
      aria-label={`알림_${notificationId}`}
    >
      <figure className="flex justify-between w-full gap-3">
        <figcaption className="flex flex-col flex-1 justify-between min-h-[6rem]">
          <h4
            className="web:text-body1 text-body2"
            aria-label={`제목_${notificationId}`}
          >
            {message}
          </h4>
          <div
            aria-label={`시간_${notificationId}`}
            className="text-gray2 text-body2"
          >
            {time}
          </div>
        </figcaption>
        <div className="flex items-start gap-3">
          {imageUrl
            ?
            <img
              src={`${imageUrl}?h=228`}
              alt={`이미지_${notificationId}`}
              className="object-contain rounded size-24"
              {...{ fetchpriority: 'high' }} />
            :
            <Icon name='default_image' ariaLabel='기본 이미지' style='object-contain rounded size-24' />
          }
          <button aria-label={`버튼_${notificationId}`} onClick={handleDelete}>
            <Icon name='x_button' ariaLabel='알림 삭제 아이콘' style='inline rounded size-4' />
          </button>
        </div>
      </figure>
    </li>
  );
};
