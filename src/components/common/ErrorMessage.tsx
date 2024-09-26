import NoticeRed from '@/assets/icons/notice_red.svg';

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-2 text-redNotice">
      <img src={NoticeRed} alt="notice_red" className="mb-[2px] size-3" />
      <span className="text-body2">{message}</span>
    </div>
  );
};

export default ErrorMessage;
