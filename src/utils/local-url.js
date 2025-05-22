/**
 * Transforms an absolute CMS URL into a relative path during development.
 * This will replace links url to use relative paths to point to the local Next.js app
 * instead of the full CMS domain. In production, the original URL is preserved.
 *
 * Intended for use only during local development.
 *
 * @param {string} url - The full URL provided by the CMS.
 * @returns {string} - A relative path if on localhost, otherwise the original URL.
 */
export function transformLink(url) {
    // const isLocal = process.env.NODE_ENV === 'development';

    // Temporary: Force the URL to test the build and have links on local environment
    // const isLocal = true;

    // if (!isLocal) return url;
  
    try {
      const parsed = new URL(url);

      return parsed.pathname + parsed.search + parsed.hash;

    } catch {
      return url; 
    }
}
  