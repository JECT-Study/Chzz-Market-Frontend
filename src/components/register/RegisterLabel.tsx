import { ReactNode } from 'react';

const RegisterLabel = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={title} className="cursor-pointer text-heading3">
        {title} &#42;
      </label>
      {children}
    </div>
  );
};

export default RegisterLabel;
