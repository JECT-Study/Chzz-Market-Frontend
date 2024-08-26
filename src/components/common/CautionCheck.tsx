import CheckOn from '@/assets/icons/check_on.svg';
import CheckOff from '@/assets/icons/check_off.svg';

interface CheckProps {
  check: boolean;
  handleCheck: () => void;
}

const CautionCheck = ({ check, handleCheck }: CheckProps) => {
  const state = check ? 'on' : 'off';
  const iconSrc = check ? CheckOn : CheckOff;

  return (
    <label className="flex items-center gap-3 my-5 cursor-pointer">
      <input type="checkbox" className="hidden" />
      <span
        role="checkbox"
        aria-label="주의사항 체크박스"
        aria-checked={check}
        onClick={handleCheck}
        className="flex items-center"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCheck();
          }
        }}
      >
        <img src={iconSrc} alt={`check_${state}`} className="w-6 h-6" />
      </span>
      <span onClick={handleCheck} className="pt-[1px] text-body2 text-gray1">
        주의사항을 모두 확인하였으며 위 내용에 동의합니다.
      </span>
    </label>
  );
};

export default CautionCheck;
