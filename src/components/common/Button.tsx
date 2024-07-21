import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: 'xsmall' | 'small' | 'medium' | 'large';
  disabled?: boolean;
  color: string;
  hoverColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  size,
  color,
  hoverColor,
  disabled,
  onClick,
}) => {
  const baseClasses = 'border-0 rounded focus:outline-none';
  const colorClasses = classNames({
    'bg-black text-white': color === 'black',
    'bg-white text-black border border-black': color === 'white',
    [`bg-${color}`]: color !== 'black' && color !== 'white',
  });
  const sizeClasses = classNames({
    'w-[54px] h-[22px] text-xs': size === 'xsmall',
    'px-2 py-1 text-sm': size === 'small',
    'w-[100px] h-[36px] text-sm': size === 'medium',
    'px-6 py-3 text-lg': size === 'large',
  });
  const hoverColorClasses = classNames({
    'hover:bg-black hover:text-white': hoverColor === 'black',
    'hover:bg-white hover:text-black': hoverColor === 'white',
  });
  const combinedClasses = classNames(
    baseClasses,
    colorClasses,
    sizeClasses,
    hoverColorClasses,
    className,
    {
      'opacity-50 cursor-not-allowed': disabled,
    },
  );

  return (
    <button
      className={combinedClasses}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  hoverColor: '',
};

export default Button;
