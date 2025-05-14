import { wpFetch } from '@/lib/wp-fetch';
import Image from 'next/image';
import React from 'react';

// const SUPPORTED_LOCALES = ['br', 'pt', 'fr']; 

// export async function generateStaticParams() {
//   return SUPPORTED_LOCALES.map(locale => ({ locale }));
// }

export default async function ArticlePage({ params }) {
  const { locale, category, slug } = await params;

  // console.log({ locale, category, slug });

  let data = [];

  try {
    data = await wpFetch(locale, `/os/api/post?slug=${slug}`, {
    // data = await wpFetch(locale, '/os/api/post?slug=https://cms-sandbox.oddscanner.xyz/br/artigos/noticias/anthony-taylor-e-um-dos-arbitros-com-mais-cartoes-aplicados-na-premier-league-confira-o-top-10', {
      next: { revalidate: 60 },
    });

  } catch (err) {
    console.error('Failed to fetch articles:', err);
  }

// console.log(data);

  return (
    <div className="p-7">
      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>

      <Image
          src={data.thumbnail?.url || '/placeholder.jpg'}
          alt={data.thumbnail?.alt || data.title}
          width={data.thumbnail?.width || 600}
          height={data.thumbnail?.height || 400}
          className="object-cover rounded-md mb-4"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

      <div className="mb-4 border-2 p-4">
        <span className="block" id={data.author?.id}>
          <strong>Author: </strong> 
          {data.collaborators?.author?.name}
        </span>

        <span className="block" id={data.reviewer?.id}>
          <strong>Colaborator: </strong> 
          {data.collaborators?.reviewer?.name}
        </span>

        <span className="block" id={data.reviewer?.id}>
          <strong>Published date: </strong> 
          {data.dates?.published_date}
        </span>
        
        <span className="block" id={data.reviewer?.id}>
          <strong>Updated date: </strong> 
          {data.dates?.updated_date}
        </span>
      </div>

      <div className="text-lg mb-4 border-2 p-4">
        <p>{ data.excerpt }</p>
      </div>

      <div className="text-lg mb-4 border-2 p-4">

    {/* DEBUG */}
        {/* {data.content?.content ? (
          <ul>
            {Object.entries(data.content.content).map(([key, value]) => (
              <li key={key} className="mb-2">
                <strong>{key}:</strong>{' '}
                {typeof value === 'object' ? (
                  <pre className="p-2 rounded text-sm overflow-auto">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                ) : (
                  value
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No content available</p>
        )} */}


<div className="prose max-w-none">
  {Array.isArray(data.content?.content) &&
    data.content.content.map((block, index) => {
      const HeadingTag = block.heading?.html_tag || 'h2';
      const hasHeading = block.heading?.title?.trim();
      const hasText = block.text?.trim();

      if (!hasHeading && !hasText) return null;

      return (
        <div key={index} className="mb-6">
          {hasHeading && React.createElement(HeadingTag, { className: "mb-2" }, block.heading.title)}
          {hasText && (
            <div
              dangerouslySetInnerHTML={{ __html: block.text }}
              className="text-base"
            />
          )}
        </div>
      );
    })}
</div>



      </div>
       
    </div>
  );
}
