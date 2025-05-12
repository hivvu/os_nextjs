import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['uk', 'br', 'pt', 'fr', 'es', 'it', 'us'],
  defaultLocale: 'uk',

  pathnames: {
    '/articles': {
      uk: '/articles',
      br: '/artigos',
      pt: '/artigos',
      fr: '/articles',
      es: '/articles',
      it: '/articles',
      us: '/articles' 
    }
  }
});
