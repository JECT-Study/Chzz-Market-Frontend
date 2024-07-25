import Button from './Button';

interface PopupProps {
  title: string;
  isParticipate: boolean;
  width?: string;
  height?: string;
}

const Popup: React.FC<PopupProps> = ({
  title,
  width,
  height,
  isParticipate,
}) => {
  const widthClass = width ? `w-${width}` : '300px';
  const heightClass = height ? `h-${height}` : '210px';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div
        className="bg-white p-5 rounded-lg shadow-lg"
        style={{ width: widthClass, height: heightClass }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="w-full mb-5 text-2xl font-bold">{title}</h2>
        <div className="mb-4">
          <p className="text-gray-500 text-base">
            사전 등록 알림 참여들에게 해당
            <br /> 경매 등록 알림이 갑니다.
          </p>
        </div>
        <div className="flex justify-center gap-6">
          <Button
            className="bg-gray-500 w-[116px] h-[46px] rounded-lg"
            color="gray"
          >
            취소
          </Button>
          <Button className="w-[116px] h-[46px] rounded-lg" color="black">
            {isParticipate ? '경매 등록' : '취소'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
