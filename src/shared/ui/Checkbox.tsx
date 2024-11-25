import CheckOff from '@/shared/assets/icons/check_off.svg';
import CheckOn from '@/shared/assets/icons/check_on.svg';

interface CheckboxProps {
  check: boolean;
  title?: string
  toggle: () => void;
}

export const Checkbox = ({ check, toggle, title = '주의사항을 모두 확인하였으며 위 내용에 동의합니다.' }: CheckboxProps) => {
  const state = check ? 'on' : 'off';
  const iconSrc = check ? CheckOn : CheckOff;

  return (
    <label className="flex items-center gap-3 my-5">
      <input type="checkbox" className="hidden" />
      <span
        role="checkbox"
        aria-label="체크박스"
        aria-checked={check}
        onClick={toggle}
        className="flex items-center cursor-pointer"
      >
        <img src={iconSrc} alt={`check_${state}`} className="w-6 h-6" />
      </span>
      <span onClick={toggle} className="pt-[3px] text-body2 text-gray1 cursor-pointer">
        {title}
      </span>
    </label>
  );
};