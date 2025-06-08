import {
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignInRequest,
  SignUpRequest,
} from '@/feature/auth/types/auth';
import { apiClient } from '@/shared/libs/api/apiClient';

/**
 * 회원가입 API 요청을 수행합니다.
 *
 * 클라이언트로부터 입력받은 회원가입 정보를 서버에 전송하여 계정을 생성합니다.
 * 성공 시 사용자 정보 및 액세스/리프레시 토큰을 포함한 응답을 반환합니다.
 *
 * @param `data` - 회원가입 요청 데이터 (`email`, `nickname`, `password`,
 * `passwordConfirm`)
 * @returns `Promise<AuthResponse>` - 생성된 사용자 정보 및 토큰 정보
 * @throws {Error} 닉네임 중복 시 에러 메시지(`이미 사용중인 닉네임입니다.`) 또는 일반 실패 메시지
 */
export const signUp = async (data: SignUpRequest): Promise<AuthResponse> => {
  try {
    return apiClient
      .post('/auth/signUp', {
        json: data,
      })
      .json<AuthResponse>();
  } catch (error) {
    console.error('회원가입 에러 발생 :', error);

    if (error instanceof Error) {
      if (error.message.includes('500')) {
        throw new Error('이미 사용중인 닉네임입니다.');
      }
      throw new Error('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }

    throw new Error('회원가입 중 오류가 발생했습니다.');
  }
};

/**
 * 로그인 API 요청을 수행합니다.
 *
 * 사용자의 이메일과 비밀번호를 이용해 로그인 요청을 서버에 전송하고,
 * 인증에 성공하면 사용자 정보와 JWT 토큰을 반환합니다.
 *
 * @param data - 로그인 요청 데이터 (`email`, `password`)
 * @returns `Promise<AuthResponse>` - 로그인된 사용자 정보 및 토큰 정보
 * @throws {Error} 인증 실패 시 (`401` 또는 `400`) 로그인 실패 메시지를 반환하며, 기타 오류는 일반 에러 메시지를 반환
 */
export const signIn = async (data: SignInRequest): Promise<AuthResponse> => {
  try {
    return apiClient
      .post('/auth/signIn', {
        json: data,
      })
      .json<AuthResponse>();
  } catch (error) {
    console.error('로그인 에러 발생 :', error);

    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('400')) {
        throw new Error('이메일 혹은 비밀번호를 확인해주세요.');
      }
      throw new Error('로그인에 실패했습니다. 다시 시도해 주세요.');
    }

    throw new Error('로그인 중 오류가 발생했습니다.');
  }
};

/**
 * JWT 리프레시 토큰을 통해 새로운 액세스 토큰을 요청합니다.
 *
 * 기존에 발급된 리프레시 토큰을 서버로 보내 새로운 액세스 토큰과 만료 시간을 발급받습니다.
 * 토큰 만료 또는 비정상적인 토큰 사용 시 예외가 발생합니다.
 *
 * @param data - 리프레시 토큰 요청 데이터 (`refreshToken`)
 * @returns `Promise<RefreshTokenResponse>` - 새롭게 발급된 액세스 토큰 및 관련 정보
 * @throws {Error} 토큰 만료 또는 권한 없음 시(`401`, `403`) 세션 만료 메시지를 반환하며, 기타 오류는 일반 에러 메시지를 반환
 */
export const refreshToken = async (
  data: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  try {
    return apiClient
      .post('/auth/refresh-token', {
        json: data,
      })
      .json<RefreshTokenResponse>();
  } catch (error) {
    console.error('토큰 갱신 에러 :', error);

    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('403')) {
        throw new Error('세션이 만료되었습니다. 다시 로그인해 주세요.');
      }
      throw new Error('토큰 갱신에 실패했습니다.');
    }

    throw new Error('토큰 갱신 중 오류가 발생했습니다.');
  }
};

/**
 * API 요청 중 발생한 에러 객체를 사용자에게 표시할 수 있는 메시지로 변환합니다.
 *
 * 일반적인 `Error` 객체의 경우 메시지를 반환하고,
 * 그 외의 알 수 없는 에러 유형은 기본 메시지를 반환합니다.
 *
 * @param error - 처리할 에러 객체 (`Error`, `unknown`, `AxiosError`, etc.)
 * @returns 사용자 친화적인 에러 메시지 문자열
 */
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
};
