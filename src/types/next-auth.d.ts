import { User as CustomUser } from '@/feature/auth/types/auth.types';

declare module 'next-auth' {
  interface Session {
    user: CustomUser;
    accessToken: string;
    error?: string;
  }

  interface User {
    id: string;
    email: string;
    nickname: string;
    teamId: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: CustomUser;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: string;
  }
}
