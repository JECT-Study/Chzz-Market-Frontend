import DefaultImage from '@/shared/assets/icons/default_image.svg';
import XButtonIcon from '@/shared/assets/icons/x_button.svg';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router';
import { type INotification } from '../config/type';
import { getTimeAgo } from '@/shared/utils/getTimeAgo';
import { ProgressiveImage } from '@/shared/ui/ProgressiveImage';
import { useDeleteNotification } from '../model/useDeleteNotification';
import { useReadNotification } from '../model/useReadNotification';
import { NOTIFICATION_CONTENTS } from '../config/constants';

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
          <ProgressiveImage
            lowResSrc={`${imageUrl ?? DefaultImage}?h=20`}
            highResSrc={`${imageUrl ?? DefaultImage}?h=228`}
            alt={`이미지_${notificationId}`}
            className="object-contain rounded size-24"
            priority="high"
          />
          <button aria-label={`버튼_${notificationId}`} onClick={handleDelete}>
            <img
              className="inline rounded size-4"
              src={XButtonIcon}
              alt="알림 삭제 아이콘"
            />
          </button>
        </div>
      </figure>
    </li>
  );
};
