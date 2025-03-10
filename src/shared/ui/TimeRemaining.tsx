import { formatSecondsToTime } from '../utils/formatSecondsToTime';
import { Icon } from './Icon';

export const TimeRemaining = ({
  title,
  timeRemaining
}: {
  title: string;
  timeRemaining: number;
}) => {
  const formatted = formatSecondsToTime(timeRemaining);

  return (
    <div
      aria-label={title}
      className="flex items-center text-caption web:text-body2"
    >
      <Icon name='price' ariaLabel={title} style='pb-[2px]' />
      <div className="flex items-center gap-1">
        <span className=" text-gray2 whitespace-nowrap">{title}</span>
        <span className="font-bold">{formatted}</span>
      </div>
    </div>
  );
};
