import axios from 'axios';

export const getServerAxiosInstance = (locale) => {
  const base = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  const baseURL =
    locale === 'uk'
      ? `${base}/wp-json`
      : `${base}/${locale}/wp-json`;

  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_WP_USER}:${process.env.NEXT_PUBLIC_WP_PASS}`
  ).toString('base64');

  return axios.create({
    baseURL,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
    withCredentials: false,
  });
};
