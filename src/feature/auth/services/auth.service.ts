import ky from 'ky';
import {
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignInRequest,
  SignUpRequest,
} from '@/feature/auth/types/auth.types';

const serverApiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const signUp = async (data: SignUpRequest): Promise<AuthResponse> => {
  return serverApiClient
    .post('auth/signUp', { json: data })
    .json<AuthResponse>();
};

export const signIn = async (data: SignInRequest): Promise<AuthResponse> => {
  return serverApiClient
    .post('auth/signIn', { json: data })
    .json<AuthResponse>();
};

export const refreshToken = async (
  data: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  return serverApiClient
    .post('auth/refresh-token', { json: data })
    .json<RefreshTokenResponse>();
};

export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return '알 수 없는 오류가 발생했습니다.';
};
