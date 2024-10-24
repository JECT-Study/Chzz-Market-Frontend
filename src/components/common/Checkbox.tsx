import CheckOff from '@/assets/icons/check_off.svg';
import CheckOn from '@/assets/icons/check_on.svg';

interface CheckboxProps {
  check: boolean;
  handleCheck: () => void;
  title: string
}

const Checkbox = ({ check, handleCheck, title }: CheckboxProps) => {
  const state = check ? 'on' : 'off';
  const iconSrc = check ? CheckOn : CheckOff;

  return (
    <label className="flex items-center gap-3 my-5">
      <input type="checkbox" className="hidden" />
      <span
        role="checkbox"
        aria-label="체크박스"
        aria-checked={check}
        onClick={handleCheck}
        className="flex items-center cursor-pointer"
      >
        <img src={iconSrc} alt={`check_${state}`} className="w-6 h-6" />
      </span>
      <span onClick={handleCheck} className="pt-[3px] text-body2 text-gray1 cursor-pointer">
        {title}
      </span>
    </label>
  );
};

export default Checkbox;
