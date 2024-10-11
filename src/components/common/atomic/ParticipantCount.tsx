import UserIcon from '@/assets/icons/user.svg';

const ParticipantCount = ({ count }: { count: number }) => {
  return (
    <div
      aria-label="참여자"
      className="flex items-center text-body2 text-gray2"
    >
      <img src={UserIcon} alt="참여자" />
      <span className='whitespace-nowrap'>
        참여자 <span className="text-black text-body2Bold">{count}명</span>
      </span>
    </div>
  );
};

export default ParticipantCount;
