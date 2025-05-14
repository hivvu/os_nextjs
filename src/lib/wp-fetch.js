const CMS_URL = process.env.CMS_URL;
const AUTH_HEADER = 'Basic ' + Buffer.from(`${process.env.CMS_USER}:${process.env.CMS_PASS}`).toString('base64');

/**
 * Função wrapper para fetch no WordPress CMS com autenticação
 * @param {string} locale - ex: 'pt', 'en'
 * @param {string} endpoint - Ex: '/wp-json/wp/v2/pages'
 * @param {object} options - Configurações adicionais do fetch
 */
export async function wpFetch(locale, endpoint, options = {}) {

    
    let endpointUrl = locale == 'uk' ? `${CMS_URL}/wp-json${endpoint}` : `${CMS_URL}/${locale}/wp-json${endpoint}`;

    // let endpointUrl = 'https://cms-sandbox.oddscanner.xyz/wp-json/os/api/posts?per_page=100'

    const res = await fetch(endpointUrl, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: AUTH_HEADER,
        },
    });

    console.log(`Endpoint: ${endpointUrl}`);

    if (!res.ok) {
        throw new Error(`Error on fetching ${endpoint}: ${res.status}`);
    }

    return res.json();
}
