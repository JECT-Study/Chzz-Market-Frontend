import LikeIcon from '../assets/icons/in_box_like.svg';

export const LikeCount = ({ count }: { count: number }) => {
  return (
    <div
      aria-label="좋아요"
      className="flex items-center text-caption web:text-body2"
    >
      <div className="size-5">
        <img
          src={LikeIcon}
          alt="좋아요"
          className="w-full h-full p-1 pt-[.125rem]"
        />
      </div>
      <div className="flex items-center gap-1">
        <span className=" text-gray2 whitespace-nowrap">찜한 사람</span>
        <span className="font-bold">{count} 명</span>
      </div>
    </div>
  );
};
