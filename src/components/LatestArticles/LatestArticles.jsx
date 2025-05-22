import Image from 'next/image';
import Link from 'next/link';
import { transformLink } from '@/utils/local-url';
import { wpFetch } from '@/lib/wp-fetch';

export default async function LatestArticles({ id, locale }) {

  const articles = await wpFetch(locale, `/os/api/v2/term-posts?term_id=${id}`, {
    next: { revalidate: 60 },
  });

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map(article => {
          const articleLink = transformLink(article.slug);
          console.log('article', article.featured_image);

          return (
            <Link key={article.id} href={articleLink} passHref className="block border rounded-xl p-4 hover:shadow-lg transition">
              <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden">
                {article.featured_image && (
                  <Image
                    src={article.featured_image}
                    alt={article.title}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
              <h3
                className="text-lg font-semibold mb-1"
                dangerouslySetInnerHTML={{ __html: article.title }}
              />
              {article.excerpt && (
                <p
                  className="text-sm text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: article.excerpt }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
