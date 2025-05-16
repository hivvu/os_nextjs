import { notFound } from 'next/navigation';

const DEV = process.env.NODE_ENV === 'development';
const CMS_URL = process.env.CMS_URL;
const AUTH_HEADER = 'Basic ' + Buffer.from(`${process.env.CMS_USER}:${process.env.CMS_PASS}`).toString('base64');

/**
 * Fetch wrapper for WordPress with authentication
 * @param {string} locale - ex: 'pt', 'en'
 * @param {string} endpoint - Ex: '/wp-json/wp/v2/pages'
 * @param {object} options - Configurações adicionais do fetch
 */
export async function wpFetch(locale, endpoint, options = {}) {
    let endpointUrl = locale == 'uk' ? `${CMS_URL}/wp-json${endpoint}` : `${CMS_URL}/${locale}/wp-json${endpoint}`;

    // Debug
    if (DEV) {
        console.log(`wpFetch: ${endpointUrl}`);
    }

    const res = await fetch(endpointUrl, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: AUTH_HEADER,
        },
    });

    if (!res.ok) {
        notFound();
        throw new Error(`Error on fetching ${endpointUrl}: ${res.status}`);
    }

    return res.json();
}
