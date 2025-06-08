import { API_BASE_URL } from '@/shared/constants/apiConfig';
import ky from 'ky';

/**
 * ky 인스턴스 생성
 * @description 공통 헤더 및 에러 처리 설정
 */
export const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  hooks: {
    beforeError: [
      (error) => {
        const { response } = error;
        if (response && response.body) {
          error.name = 'APIError';
          error.message = `${response.status} ${response.statusText}`;
        }
        return error;
      },
    ],
  },
});
