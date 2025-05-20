import { wpFetch } from '@/lib/wp-fetch';
import i18nConfig from '@/i18nConfig';

// TOFIX: Ideally, this should not be here hardcoded
// const SUPPORTED_LOCALES = ['br', 'fr', 'es', 'it', 'us', 'pt'];

export async function slugResolver(locale, slug) {
  // Validate locale - must be a string and must be in supported locales
  if (typeof locale !== 'string' || !i18nConfig.locales.includes(locale)) {
    locale = i18nConfig.defaultLocale;
  }

  const slugPath = '/' + slug.join('/');
  let localeSlug = '';

  if (locale !== i18nConfig.defaultLocale) {
    localeSlug = `/${locale}`;
  }

  // let slugSegments = [...slug];
  // if (slugSegments.length > 0 && SUPPORTED_LOCALES.includes(slugSegments[0])) {
  //   locale = slugSegments[0];
  // }

  console.log('Validated locale:', locale);
  console.log('localeSlug:', localeSlug);
  console.log('slugPath:', slugPath);

  const data = await wpFetch(
    locale,
    `/os/api/v2/slug-resolver?slug=${process.env.CMS_URL}${localeSlug}${slugPath}`,
    {
      next: { revalidate: 60 },
    }
  );

  return {
    ...data,
    locale,
  };
}
