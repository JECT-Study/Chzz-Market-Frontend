import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  disabled?: boolean;
  color: 'black' | 'white' | string;
  hoverColor?: string;
}

const Button = ({
  className,
  children,
  size,
  color,
  hoverColor,
  disabled,
  onClick,
  type,
}: ButtonProps) => {
  const baseClasses = 'focus:outline-none';
  const colorClasses = classNames({
    'bg-black text-white': color === 'black',
    'bg-white text-black border border-black': color === 'white',
  });
  const sizeClasses = classNames({
    'px-2 py-0.5 text-xs': size === 'xsmall',
    'px-2 py-1 text-sm': size === 'small',
    'px-4 py-2 text-base': size === 'medium',
    'px-6 py-3 text-lg': size === 'large',
  });
  const hoverColorClasses = classNames({
    'hover:bg-black hover:text-white': hoverColor === 'black',
    'hover:bg-white hover:text-black border border-black':
      hoverColor === 'white',
  });
  const combinedClasses = classNames(
    colorClasses,
    baseClasses,
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
      type={type}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  hoverColor: '',
  size: undefined,
};

export default Button;
