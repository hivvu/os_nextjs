import { Content, ContentWithSidebar, PostCard, PostsGrid } from '@/components';
import { wpFetch } from '@/lib/wp-fetch';

export default async function HomepageTemplate({ data, locale, config }) {

  const content = await wpFetch(locale, `/os/api/page?slug=${data.slug}`, {
    next: { revalidate: 60 },
  });

  const articles = await wpFetch(locale, `/os/api/posts?per_page=4&page=1`, {
    next: { revalidate: 60 },
  });

  const tips = await wpFetch(locale, `/os/api/betting-tips?per_page=4`, {
    next: { revalidate: 60 },
  });

  return (
    <article>

      <div className="text-6xl">HOMEPAGE TEMPLATE</div>

      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.excerpt }} />


      <details className='m-3'>
        <summary className='border p-3'>More slug info</summary>
        <div className='flex flex-col border p-3'>
          <p><strong>Post ID:</strong> {data.id}</p>
          <p><strong>Slug:</strong> {data.slug}</p>
          <p><strong>Type:</strong> {data.type}</p>
          <p><strong>Status:</strong> {data.status}</p>
        </div>
      </details>
      <ContentWithSidebar sidebar={<div>SIDEBAR</div>} >
        CONTENT
      </ContentWithSidebar>
      <PostsGrid icon="/svg/icon-globe.svg" PostCard={PostCard} config={config} items={articles} />

      {/* <PostsGrid icon="icon-paper" PostCard={PostCard} title={config.sections.related_content.betting_tips.title} items={tips} btnUrl={templateData.tips_url} /> */}

      <Content data={content} config={config} />


    </article>
  );
}
