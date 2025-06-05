import { get } from '@/shared/libs/api/apiClient';

const getUser = async () => {
  const response = await get('/user/me');
  return response;
};

export { getUser };
