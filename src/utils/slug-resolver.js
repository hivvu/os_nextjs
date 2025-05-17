import { wpFetch } from '@/lib/wp-fetch';

// TOFIX: Ideally, this should not be here hardcoded
const SUPPORTED_LOCALES = ['br', 'fr', 'es', 'it', 'us', 'pt'];

export async function slugResolver(slug) {
  const slugPath = '/' + slug.join('/');

  let locale = 'uk';
  let slugSegments = [...slug];
  if (slugSegments.length > 0 && SUPPORTED_LOCALES.includes(slugSegments[0])) {
    locale = slugSegments[0];
  }

  const data = await wpFetch(
    locale,
    `/os/api/v2/slug-resolver?slug=${process.env.CMS_URL}${slugPath}`,
    {
      next: { revalidate: 60 },
    }
  );

  return {
    ...data,
    locale,
  };
}
