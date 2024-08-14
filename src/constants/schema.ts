import { z } from 'zod';

export const SignupFormSchema = z.object({
  nickname: z.string().min(1).max(15),
  region: z.string().min(1),
  bank: z.string().optional(),
  accountNumber: z.string().optional(),
  introduction: z.string().optional(),
  link: z.string().optional(),
});
