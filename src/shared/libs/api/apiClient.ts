import ky from 'ky';

const apiClient = ky.create({
  prefixUrl: 'http://localhost:3000/api',
  throwHttpErrors: false,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [],
    afterResponse: [],
    beforeError: [],
  },
});

const get = (path: string) => {
  return apiClient.get(path).json();
};

const post = (path: string, body: any) => {
  return apiClient.post(path, { json: body }).json();
};

const put = (path: string, body: any) => {
  return apiClient.put(path, { json: body }).json();
};

const del = (path: string) => {
  return apiClient.delete(path).json();
};

const patch = (path: string, body: any) => {
  return apiClient.patch(path, { json: body }).json();
};

export { get, post, put, del, patch };
