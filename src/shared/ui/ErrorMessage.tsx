import { Icon } from "./Icon";

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-2 text-redNotice">
      <Icon name='notice_red' style='mb-[2px] size-3' />
      <span className="text-body2">{message}</span>
    </div>
  );
};
