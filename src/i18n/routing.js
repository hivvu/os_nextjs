import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['uk', 'br', 'pt', 'fr', 'es', 'it', 'us'],
  defaultLocale: 'uk',
  localePrefix: 'as-needed', // or 'always'

  pathnames: {
    // '/':'/',
    // 'articles': '/posts',

    '/posts': { 
      uk: '/articles',
      br: '/artigos',
      pt: '/artigos',
      fr: '/articles',
      es: '/articles',
      it: '/articles',
      us: '/articles' 
    },
    '/posts/[category]/[slug]': {
      uk: '/articles/[category]/[slug]',
      br: '/artigos/[category]/[slug]',
      pt: '/artigos/[category]/[slug]',
      fr: '/articles/[category]/[slug]',
      es: '/artículos/[category]/[slug]',
      it: '/articles/[category]/[slug]',
      us: '/articles/[category]/[slug]'
    }
  }
});
