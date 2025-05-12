import Image from 'next/image';

export default function LatestArticles({ articles = [] }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map(article => (
          <a
            key={article.id}
            href={article.url}
            className="block border rounded-xl p-4 hover:shadow-lg transition"
            target="_blank"
          >
            <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden">
              <Image
                src={article.thumbnail?.url || '/placeholder.jpg'}
                alt={article.thumbnail?.alt || article.title}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
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
          </a>
        ))}
      </div>
    </section>
  );
}
