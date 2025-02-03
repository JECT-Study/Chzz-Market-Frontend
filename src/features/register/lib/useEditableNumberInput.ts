import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from 'react';
import {
  FieldValues,
  Path,
  PathValue,
  UseFormGetValues,
  UseFormSetValue
} from 'react-hook-form';

import { formatCurrencyWithWon } from '@/shared/utils/formatCurrencyWithWon';

interface UseEditableNumberProps<T extends FieldValues> {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
}

export const useEditableNumberInput = <T extends FieldValues>({
  name,
  setValue,
  getValues
}: UseEditableNumberProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const num = Number(value.replace(/,/g, ''));
    if (!Number.isNaN(num)) {
      setValue(
        name,
        num < 1000
          ? ('' as PathValue<T, Path<T>>)
          : (formatCurrencyWithWon(num) as PathValue<T, Path<T>>)
      );
      setIsEditing(false);
    }
  };

  const handleFocus = () => {
    const curValue = getValues(name);
    const numericValue = curValue.replace(/[^\d]/g, '');
    setValue(name, numericValue === '0' ? '' : numericValue);
    setIsEditing(true);
  };

  const preventInvalidInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  };

  const preventArrowKeys = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
  };

  return {
    isEditing,
    handleBlur,
    handleFocus,
    preventInvalidInput,
    preventArrowKeys
  };
};
