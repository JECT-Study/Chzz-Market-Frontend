import JordanBlack from '@/assets/images/jordan_black.jpeg';
import { SyntheticEvent } from 'react';

export const addDefaultImg = (e: SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = JordanBlack;
};
