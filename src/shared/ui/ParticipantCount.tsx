import UserIcon from '../assets/icons/user.svg';

export const ParticipantCount = ({ count }: { count: number }) => {
  return (
    <div
      aria-label="참여자"
      className="flex items-center text-caption web:text-body2"
    >
      <img src={UserIcon} alt="참여자" className="pb-[.125rem]" />
      <div className="flex items-center gap-1">
        <span className=" text-gray2 whitespace-nowrap">참여자</span>
        <span className="font-bold">{count} 명</span>
      </div>
    </div>
  );
};
