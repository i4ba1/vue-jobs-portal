// plugins/api.ts
import axios from 'axios';
import type { AxiosInstance } from 'axios';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api: AxiosInstance = axios.create({
    baseURL: config.public.apiBaseUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return {
    provide: {
      api
    }
  };
});