export interface User {
  nickname: string;
  bankName: string | null;
  accountNumber: string | null;
  bio?: string | null;
  link?: string | null;
}

export interface UserProfile {
  nickname: string;
  bio: string;
  link: string;
}
