import { z } from 'zod';

export const SignupFormSchema = z.object({
  nickname: z.string().min(1, '닉네임은 최소 1자 이상 입력해 주세요.').max(15, '닉네임은 최대 15자 이하로 입력해 주세요.'),
  bio: z.string().optional(),
});

export const RegisterSchema = z.object({
  productName: z.string().superRefine((value, ctx) => {
    const name = value.replaceAll(' ', '');
    if (name.length === 0 || name.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '제목은 공백을 제외하고 2자 이상 입력해 주세요.',
      });
    }
    if (name.length > 30) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '제목은 최대 30자 이하로 입력해 주세요.',
      });
    }
  }),
  images: z.array(z.string()).min(1, '사진은 최소 1장 이상 등록해 주세요.').max(5, '사진은 최대 5장 이하로 등록해 주세요.'),
  category: z.string().min(1, '카테고리를 선택해 주세요.'),
  minPrice: z.string().superRefine((value, ctx) => {
    const num = Number(value.replace(/[^\d]/g, ''));
    if (num < 1000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '최소 1000원 이상 입력해 주세요.',
      });
    }

    if (num > 2_000_000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '2,000,000원 이하로 입력해 주세요.',
      });
    }

    if (num % 1000 !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '1000원 단위로 입력해 주세요.',
      });
    }
  }),
  description: z
    .string()
    .superRefine((value, ctx) => {
      const name = value.replaceAll(' ', '');
      const newLineCount = (value.match(/\n/g) || []).length;
      if (name.length === 0 || name.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '상품 설명은 공백을 제외하고 5자 이상 입력해 주세요.',
        });
      }
      if (name.length > 1000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '상품 설명은 최대 1000자 이하로 입력해 주세요.',
        });
      }
      if (newLineCount > 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '상품 설명은 줄바꿈을 10개 이하로 입력해 주세요.',
        });
      }
    })
    .or(z.literal('')),
});

export const AuctionShippingSchema = z.object({
  memo: z.string(),
});

export const getBidSchema = (minPrice: number, curBidAmount: number) =>
  z.object({
    bidAmount: z.string().superRefine((value, ctx) => {
      const num = Number(value.replace(/[^\d]/g, ''));
      if (num < minPrice) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `시작가보다 높은 금액을 입력해주세요.`,
        });
      }

      if (num > 2_000_000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '2,000,000원 이하로 입력해 주세요.',
        });
      }

      if (num % 1000 !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '1000원 단위로 입력해 주세요.',
        });
      }

      if (num === curBidAmount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '현재 참여 금액과 다른 금액을 입력해주세요.',
        });
      }
    }),
  });
