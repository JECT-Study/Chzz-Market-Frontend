import { Icon } from './Icon';

export const LikeCount = ({ count }: { count: number }) => {
  return (
    <div
      aria-label="좋아요"
      className="flex items-center gap-1 text-caption web:text-body2 pl-[2px]"
    >
      <Icon name='in_box_like' ariaLabel='좋아요' style='size-3 pl-[1px]' />
      <div className="flex items-center gap-1">
        <span className=" text-gray2 whitespace-nowrap">찜한 사람</span>
        <span className="font-bold">{count} 명</span>
      </div>
    </div>
  );
};
