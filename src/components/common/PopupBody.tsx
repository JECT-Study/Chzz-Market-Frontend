import Button from './Button';

interface PopupBodyProps {
  isParticipate: boolean;
}

const PopupBody = ({ isParticipate }: PopupBodyProps) => {
  return (
    <>
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
    </>
  );
};

export default PopupBody;
