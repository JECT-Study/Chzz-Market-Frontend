import { z } from 'zod';

export const AddressFormSchema = z.object({
  recipientName: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .max(15, '이름은 최대 15자 이하로 입력해주세요.'),
  phoneNumber: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, '휴대폰 번호는 010-XXXX-XXXX 형식으로 입력해주세요.'),
  zipcode: z
    .string()
    .min(1, '우편번호를 입력해주세요.')
    .max(10, '우편번호는 최대 10자 이하로 입력해주세요.'),
  roadAddress: z.string().min(1, '주소지를 입력해주세요.'),
  detailAddress: z.string().min(1, '상세주소를 입력해주세요.')
});

export type AddressFormType = z.infer<typeof AddressFormSchema>;