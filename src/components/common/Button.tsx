import classNames from 'classnames';
import { ReactNode } from 'react';
import ButtonSpinner from './loading/ButtonSpinner';

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

const Button = ({
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
  const baseClasses = 'focus:outline-none rounded transition-colors active:bg-black active:text-white ';
  const colorClasses = classNames({
    'bg-black text-white': color === 'black',
    'bg-white text-black border border-black': color === 'white',
    'bg-gray text-white': color === 'gray',
    'bg-gray2 text-white': color === 'gray2',
    'bg-gray3 text-white': color === 'gray3',
    'bg-cheeseYellow text-white': color === 'cheeseYellow',
  });
  const sizeClasses = classNames({
    'px-2 py-0.5 text-xs': size === 'xsmall',
    'px-2 py-1 text-sm': size === 'small',
    'px-4 py-2 text-button': size === 'medium',
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
        {loading && <ButtonSpinner />}
        <span className='pt-[.125rem]'>{children}</span>
      </div>
    </button>
  );
};

export default Button;
