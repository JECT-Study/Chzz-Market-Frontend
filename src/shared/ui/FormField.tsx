import { ReactElement } from 'react';
import { Control, Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  render: (field: ControllerRenderProps<T>) => ReactElement;
  error?: string;
}

export const FormField = <T extends FieldValues>({ name, control, label, render, error }: FormFieldProps<T>) => {
  return (
    <div className='relative flex flex-col gap-2'>
      <label htmlFor={label} className='cursor-pointer text-body2 web:text-heading3'>
        {label}
      </label>
      <Controller name={name} control={control} render={({ field }) => render(field)} />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};