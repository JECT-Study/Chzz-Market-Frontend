import { Icon } from "./Icon";

export const ParticipantCount = ({ count }: { count: number }) => {
  return (
    <div
      aria-label="참여자"
      className="flex items-center text-caption web:text-body2"
    >
      <Icon name='user' style="pb-[.125rem] size-5" />
      <div className="flex items-center gap-1">
        <span className=" text-gray2 whitespace-nowrap">참여자</span>
        <span className="font-bold">{count} 명</span>
      </div>
    </div>
  );
};
