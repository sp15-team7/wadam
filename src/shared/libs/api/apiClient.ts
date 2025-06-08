import { API_BASE_URL } from '@/shared/constants/apiConfig';
import ky from 'ky';

/**
 * ky 인스턴스 생성
 * @description 공통 헤더 및 에러 처리 설정
 */
const apiClient = ky.create({
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

const get = <T>(path: string): Promise<T> => apiClient.get(path).json<T>();
const post = <TRequest, TResponse>(
  path: string,
  body: TRequest,
): Promise<TResponse> => apiClient.post(path, { json: body }).json<TResponse>();
const put = <TRequest, TResponse>(
  path: string,
  body: TRequest,
): Promise<TResponse> => apiClient.put(path, { json: body }).json<TResponse>();
const patch = <TRequest, TResponse>(
  path: string,
  body: TRequest,
): Promise<TResponse> =>
  apiClient.patch(path, { json: body }).json<TResponse>();
const del = <T>(path: string): Promise<T> => apiClient.delete(path).json<T>();

export { del, get, patch, post, put };
