import { Header } from '@/components/layout/Layout';

const LoadingSpinner = ({ title, text }: { title?: string; text: string }) => {
  return (
    <div
      className={`flex flex-col items-center justify-between w-full h-full gap-5 ${title && 'border-x border-gray3'}`}
    >
      {title && <Header handleBack={() => {}}>{title}</Header>}
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <span className="loader" />
        <span className="text-heading1">{text}</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
