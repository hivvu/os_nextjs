'use client';

import axios from 'axios';
import Cookies from 'js-cookie';

export const getAxiosInstance = (locale) => {
  const base = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  const baseURL =
    locale === 'uk'
      ? `${base}/wp-json`
      : `${base}/${locale}/wp-json`;

  const instance = axios.create({
    baseURL,
    method: 'get',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false,
    fetchOptions: {
      // cache: 'force-cache',
      cache: 'no-cache',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const auth = btoa(`${process.env.NEXT_PUBLIC_WP_USER}:${process.env.NEXT_PUBLIC_WP_PASS}`);
      config.headers.Authorization = `Basic ${auth}`;

      if (typeof window !== 'undefined') {
        const userCookie = Cookies.get('os-user');
        if (userCookie) {
          const token = JSON.parse(userCookie).token;
          if (token) {
            config.headers['X-Auth-Token'] = token;
          }
        }
      }

      const fullUrl = config.baseURL + config.url;
      console.log('Endpoint called (Axios.js):', fullUrl);

      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};
