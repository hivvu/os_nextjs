const CMS_URL = process.env.CMS_URL;
const AUTH_HEADER = 'Basic ' + Buffer.from(`${process.env.CMS_USER}:${process.env.CMS_PASS}`).toString('base64');

/**
 * Função wrapper para fetch no WordPress CMS com autenticação
 * @param {string} locale - ex: 'pt', 'en'
 * @param {string} endpoint - Ex: '/wp-json/wp/v2/pages'
 * @param {object} options - Configurações adicionais do fetch
 */
export async function wpFetch(locale, endpoint, options = {}) {
  const res = await fetch(`${CMS_URL}/${locale}/wp-json${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: AUTH_HEADER,
    },
  });

console.log(`${CMS_URL}/${locale}/wp-json/${endpoint}`);

  if (!res.ok) {
    throw new Error(`Error on fetching ${endpoint}: ${res.status}`);
  }

  return res.json();
}
