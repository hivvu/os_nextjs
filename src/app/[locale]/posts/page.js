import { wpFetch } from '@/lib/wp-fetch';
import LatestArticles from '@/components/LatestArticles';
import { getLocale } from 'next-intl/server';

// export async function generateStaticParams() {
//   return [{ locale: 'uk' }]; 
// }

export async function generateStaticParams() {
  return ['uk'].map(locale => ({ locale }));
}

export default async function ArticlesPage() {
  console.log("ENTROU NA PAGE");

  const locale = await getLocale();

  let data = [];

  try {
    data = await wpFetch(locale, '/os/api/posts?per_page=100', {
      next: { revalidate: 60 },
    });
  } catch (err) {
    console.error('Failed to fetch articles:', err);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Páginas em {locale.toUpperCase()}</h1>
      <LatestArticles articles={data} />
    </div>
  );
}
