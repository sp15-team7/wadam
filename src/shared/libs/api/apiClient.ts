import { API_BASE_URL } from '@/shared/constants/api.config';
import ky from 'ky';

/**
 * ky 인스턴스 생성
 * @description 공통 헤더 및 에러 처리 설정
 */
const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = useAuthStore.getState().session?.accessToken;
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    beforeError: [
      async (error) => {
        console.error('API Error:', error);
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
