import { FocusEvent, useState } from 'react';
import {
  FieldValues,
  Path,
  PathValue,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';

interface UseEditableNumberProps<T extends FieldValues> {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
}

export const useEditableNumberInput = <T extends FieldValues>({
  name,
  setValue,
  getValues,
}: UseEditableNumberProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const num = Number(value.replace(/,/g, ''));
    if (!Number.isNaN(num)) {
      setValue(
        name,
        `${num.toLocaleString('en-US')} 원` as PathValue<T, Path<T>>,
      );
      setIsEditing(false);
    }
  };

  const handleFocus = () => {
    const curValue = getValues(name);
    const numericValue = curValue.replace(/[^\d]/g, '');
    setValue(name, numericValue);
    setIsEditing(true);
  };

  return {
    isEditing,
    handleBlur,
    handleFocus,
  };
};
