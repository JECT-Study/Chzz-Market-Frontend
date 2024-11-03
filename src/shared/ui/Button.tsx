import classNames from 'classnames';
import { ReactNode } from 'react';
import { ButtonSpinner } from './spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  disabled?: boolean;
  color?: string;
  hoverColor?: string;
  type: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  loading?: boolean;
}

export const Button = ({
  className,
  children,
  size = 'medium',
  color = 'white',
  hoverColor = '',
  disabled = false,
  onClick,
  type,
  ariaLabel = '',
  loading = false,
}: ButtonProps) => {
  const baseClasses = 'focus:outline-none rounded-lg transition-colors box-border';
  const colorClasses = classNames({
    'bg-black text-white border border-black': color === 'black',
    'bg-white text-black border border-black': color === 'white',  // 동일한 border 유지
    'bg-gray text-white border border-gray': color === 'gray',
    'bg-gray2 text-white border border-gray2': color === 'gray2',
    'bg-gray3 text-white border border-gray3': color === 'gray3',
    'bg-gray3 text-gray1': color === 'disabled',
    'bg-cheeseYellow text-white border border-cheeseYellow': color === 'cheeseYellow',
    'bg-buttonGrayWhite text-gray1': color === 'grayWhite',
    'bg-disabledGrayWhite text-gray1': color === 'disabled',
  });
  const sizeClasses = classNames({
    'px-2 py-0.5 text-xs': size === 'xsmall',
    'px-2 py-1 text-sm': size === 'small',
    'sm:px-4 sm:py-2 px-2 py-2 sm:text-button text-sm': size === 'medium',
    'px-6 py-3 text-lg': size === 'large',
  });
  const hoverColorClasses = classNames({
    'hover:bg-black/70 hover:text-white': hoverColor === 'black',
    'hover:bg-white hover:text-black border border-black': hoverColor === 'white',
  });
  const combinedClasses = classNames(colorClasses, baseClasses, sizeClasses, hoverColorClasses, className, {
    'opacity-50 cursor-not-allowed': disabled,
  });

  return (
    <button className={combinedClasses} disabled={disabled} onClick={onClick} type={type} aria-label={ariaLabel}>
      <div className='flex items-center justify-center w-full gap-3'>
        <span className='pt-[.125rem]'>{children}</span>
        {loading && <ButtonSpinner />}
      </div>
    </button>
  );
};