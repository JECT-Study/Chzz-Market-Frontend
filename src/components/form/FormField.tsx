import { ReactElement } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  render: (field: ControllerRenderProps<T>) => ReactElement;
  error?: string;
}

const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  render,
  error,
}: FormFieldProps<T>) => {
  return (
    <div className="relative flex flex-col gap-2">
      <label htmlFor={label} className="cursor-pointer text-heading3">
        {`${label}${label !== '상품 설명' ? '*' : ''}`}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => render(field)}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default FormField;
