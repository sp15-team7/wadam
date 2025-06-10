export const ERROR_MESSAGES = {
  INVALID_INPUT: '입력 값이 유효하지 않습니다. 다시 확인해주세요.',
  SIGN_UP_FAILED:
    '회원가입에 실패했습니다. 이미 사용 중인 이메일 또는 닉네임일 수 있습니다.',
  INVALID_CREDENTIALS: '이메일 또는 비밀번호가 올바르지 않습니다.',
  UNKNOWN: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  JWT_INITIALIZATION_FAILED: 'JWT 토큰 초기화에 실패했습니다.',
  TOKEN_REFRESH_FAILED: '토큰 갱신에 실패했습니다. 다시 로그인해주세요.',
  INVALID_USER_ID: '유효하지 않은 사용자 ID입니다.',
  TOKEN_DECODE_FAILED: '토큰 디코딩에 실패했습니다.',
} as const;

export const SUCCESS_MESSAGES = {
  SIGN_UP_SUCCESS: '회원가입이 완료되었습니다.',
  SIGN_IN_SUCCESS: '로그인되었습니다.',
  TOKEN_REFRESHED: '토큰이 성공적으로 갱신되었습니다.',
} as const;
