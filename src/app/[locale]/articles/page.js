import { wpFetch } from '@/lib/wp-fetch';
import LatestArticles from '@/components/LatestArticles';

const SUPPORTED_LOCALES = ['br', 'pt', 'fr']; 

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default async function ArticlesPage({ params }) {
  const { locale } = await params || 'pt';

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
