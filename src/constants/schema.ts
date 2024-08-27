import { z } from 'zod';

export const SignupFormSchema = z.object({
  nickname: z.string().min(1).max(15),
  bank: z.string().optional(),
  accountNumber: z.string().optional(),
  introduction: z.string().optional(),
  link: z.string().optional(),
});

export const RegisterSchema = z.object({
  title: z
    .string()
    .min(2, '제목은 최소 2자 이상 입력해 주세요.')
    .max(30, '제목은 최대 30자 이하로 입력해 주세요.'),
  images: z
    .array(z.string())
    .min(1, '사진은 최소 1장 이상 등록해 주세요.')
    .max(5, '사진은 최대 5장 이하로 등록해 주세요.'),
  category: z.string().min(1, '카테고리를 선택해 주세요.'),
  cost: z.string().refine(
    (value) => {
      const num = Number(value.replace(/[^\d]/g, '')); // 숫자만 추출
      return !Number.isNaN(num) && num >= 1000; // 숫자가 1000 이상이어야만 true 반환
    },
    {
      message: '최소 1000원 이상 입력해 주세요.',
    },
  ),
  description: z
    .string()
    .min(5, '상품 설명은 최소 5자 이상 입력해 주세요.')
    .max(1000, '상품 설명은 최대 1000자 이하로 입력해 주세요.')
    .or(z.literal('')),
});

export const BidSchema = RegisterSchema.pick({ cost: true });
