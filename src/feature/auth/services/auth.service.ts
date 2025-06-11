import {
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignInRequest,
  SignUpRequest,
} from '@/feature/auth/types/auth.types';
import { apiClient } from '@/shared/libs/api/apiClient';

export const signUp = async (data: SignUpRequest): Promise<AuthResponse> => {
  return apiClient.post('auth/signup', { json: data }).json<AuthResponse>();
};

export const signIn = async (data: SignInRequest): Promise<AuthResponse> => {
  return apiClient.post('auth/signin', { json: data }).json<AuthResponse>();
};

export const refreshToken = async (
  data: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  return apiClient
    .post('auth/refresh-token', { json: data })
    .json<RefreshTokenResponse>();
};

/**
 * API 에러를 사용자 친화적인 메시지로 변환합니다.
 */
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    // APIError (ky에서 처리된 에러)인 경우 이미 백엔드 메시지가 설정되어 있음
    if (error.name === 'APIError') {
      return error.message;
    }

    // 네트워크 에러나 기타 에러
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
};

/**
 * 인증 관련 에러 메시지를 구체화합니다.
 */
export const getAuthErrorMessage = (error: unknown): string => {
  const message = handleApiError(error);

  // 백엔드에서 반환하는 구체적인 메시지들
  if (message.includes('이미 사용중인 이메일')) {
    return '이미 가입된 이메일입니다. 다른 이메일을 사용해주세요.';
  }

  if (message.includes('이미 사용중인 닉네임')) {
    return '이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.';
  }

  if (message.includes('비밀번호가 일치하지 않습니다')) {
    return '비밀번호가 일치하지 않습니다. 다시 확인해주세요.';
  }

  if (message.includes('사용자를 찾을 수 없습니다')) {
    return '등록되지 않은 이메일입니다. 회원가입을 먼저 진행해주세요.';
  }

  if (message.includes('이메일 형식이 올바르지 않습니다')) {
    return '올바른 이메일 형식을 입력해주세요.';
  }

  // 비밀번호 관련 에러
  if (message.includes('minLength 8')) {
    return '비밀번호는 8자 이상 입력해주세요.';
  }

  if (message.includes('maxLength')) {
    return '비밀번호가 너무 깁니다. 더 짧은 비밀번호를 입력해주세요.';
  }

  if (message.includes('비밀번호 확인이 일치하지 않습니다')) {
    return '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
  }

  // 닉네임 관련 에러
  if (message.includes('닉네임은 필수입니다')) {
    return '닉네임을 입력해주세요.';
  }

  if (message.includes('닉네임이 너무 깁니다')) {
    return '닉네임이 너무 깁니다. 더 짧은 닉네임을 입력해주세요.';
  }

  // 일반적인 유효성 검사 에러
  if (message.includes('Validation Failed')) {
    return '입력 정보를 다시 확인해주세요.';
  }

  // HTTP 상태 코드별 에러
  if (message.includes('400')) {
    return '잘못된 요청입니다. 입력 정보를 확인해주세요.';
  }

  if (message.includes('401')) {
    return '인증에 실패했습니다. 이메일과 비밀번호를 확인해주세요.';
  }

  if (message.includes('403')) {
    return '접근 권한이 없습니다.';
  }

  if (message.includes('404')) {
    return '요청한 리소스를 찾을 수 없습니다.';
  }

  if (message.includes('409')) {
    return '이미 존재하는 정보입니다. 다른 정보로 시도해주세요.';
  }

  if (message.includes('429')) {
    return '너무 많은 요청이 있었습니다. 잠시 후 다시 시도해주세요.';
  }

  // 네트워크 에러
  if (
    message.includes('Failed to fetch') ||
    message.includes('Network Error') ||
    message.includes('ERR_NETWORK') ||
    message.includes('ERR_INTERNET_DISCONNECTED')
  ) {
    return '네트워크 연결을 확인해주세요.';
  }

  // 서버 에러 (5xx)
  if (
    message.includes('500') ||
    message.includes('502') ||
    message.includes('503') ||
    message.includes('504') ||
    message.includes('Internal Server Error') ||
    message.includes('Bad Gateway') ||
    message.includes('Service Unavailable') ||
    message.includes('Gateway Timeout')
  ) {
    return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }

  // 타임아웃 에러
  if (message.includes('timeout') || message.includes('TIMEOUT')) {
    return '요청 시간이 초과되었습니다. 다시 시도해주세요.';
  }

  // 기본 메시지 반환 (백엔드에서 제공하는 메시지가 있다면 그대로 사용)
  return message || '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.';
};
