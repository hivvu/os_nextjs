import { getServerAxiosInstance } from '@/lib/axios-server';
import LatestArticles from '@/components/LatestArticles'; 

export default async function ArticlesPage({ params }) {
  const locale = params.locale || 'pt'; 
  const axios = getServerAxiosInstance(locale);

  let data = [];

  try {
    const res = await axios.get('/os/api/posts?per_page=100');
    data = res.data;
  } catch (err) {
    console.error('Failed to fetch articles:', err);
  }

  return (
    <div>
      <h1>Custom API Data ({locale.toUpperCase()})</h1>
      <h1 className="text-3xl font-bold mb-6">Artigos Recentes ({locale.toUpperCase()})</h1>

      <LatestArticles articles={data} />
      <div className='overflow-y-scroll max-h-[500px]'>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      </div>
    </div>
  );
}