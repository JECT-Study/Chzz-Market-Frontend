import { z } from 'zod';

export const SignupFormSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임은 최소 1자 이상 입력해 주세요.')
    .max(15, '닉네임은 최대 15자 이하로 입력해 주세요.'),
  bio: z.string().optional()
});

export const UserProfileEditFormSchema = z.object({
  nickname: z.string().superRefine((value, ctx) => {
    const trimmedNickname = value.trim();
    if (trimmedNickname === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '닉네임을 입력해주세요.'
      });
    }
    if (trimmedNickname.length > 15) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '닉네임은 15자 이하로 입력해 주세요.'
      });
    }
  }),
  bio: z.string().superRefine((value, ctx) => {
    const bio = value.replaceAll(' ', '');
    const newLineCount = (value.match(/\n/g) || []).length;
    if (bio.length > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '자기소개는 최대 100자 이하로 입력해 주세요.'
      });
    }
    if (newLineCount > 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '자기소개는 줄바꿈을 5줄 이하로 입력해 주세요.'
      });
    }
  })
});

export const AuctionShippingSchema = z.object({
  memoSelect: z.string(),
  memoInput: z.string()
});
