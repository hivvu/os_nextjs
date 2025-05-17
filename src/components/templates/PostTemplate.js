import Image from 'next/image';
import { wpFetch } from '@/lib/wp-fetch';
import React from 'react';

export default async function PostTemplate({ data, locale }) {
    const article = await wpFetch(locale, `/os/api/post?slug=${data.slug}`, {
      next: { revalidate: 60 },
    });
    
    return (
      <div className="p-7">
        <h1 className="text-3xl font-bold mb-6">{data.title}</h1>

        <Image
            src={article.thumbnail?.url || '/placeholder.jpg'}
            alt={article.thumbnail?.alt || article.title}
            width={article.thumbnail?.width || 600}
            height={article.thumbnail?.height || 400}
            className="object-cover rounded-md mb-4"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

        <div className="mb-4 border-2 p-4">
          <span className="block" id={article.author?.id}>
            <strong>Author: </strong> 
            {article.collaborators?.author?.name}
          </span>

          <span className="block" id={article.reviewer?.id}>
            <strong>Colaborator: </strong> 
            {article.collaborators?.reviewer?.name}
          </span>

          <span className="block" id={article.reviewer?.id}>
            <strong>Published date: </strong> 
            {article.dates?.published_date}
          </span>
          
          <span className="block" id={article.reviewer?.id}>
            <strong>Updated date: </strong> 
            {article.dates?.updated_date}
          </span>
        </div>

        <div className="text-lg mb-4 border-2 p-4">
          <p>{ article.excerpt }</p>
        </div>

        <div className="text-lg mb-4 border-2 p-4">
          <div className="prose max-w-none">
            {Array.isArray(article.content?.content) &&
              article.content.content.map((block, index) => {
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
  