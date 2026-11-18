// export default async function api<T>(path: string, init?: RequestInit): Promise<T> {
//   const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
//     ...init,
//     credentials: 'include',
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (!res.ok) {
//     const body = await res.json().catch(() => null);
//     const message = body?.error?.message ?? `Request failed: ${res.status}`;
//     throw Object.assign(new Error(message), { status: res.status });
//   }

//   return res.json();
// }

import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error?.message ?? error.message;
      const status = error.response?.status;
      return Promise.reject(Object.assign(new Error(message), { status }));
    }
    return Promise.reject(error);
  },
);
