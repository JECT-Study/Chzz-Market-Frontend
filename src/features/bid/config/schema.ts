import { z } from 'zod';

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
