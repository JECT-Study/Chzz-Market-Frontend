import NoticeRed from '@/shared/assets/icons/notice_red.svg';

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-2 text-redNotice">
      <img src={NoticeRed} alt="notice_red" className="mb-[2px] size-3" />
      <span className="text-body2">{message}</span>
    </div>
  );
};