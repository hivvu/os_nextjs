import { Content, ContentWithSidebar, PostCard, PostsGrid } from '@/components';
import { wpFetch } from '@/lib/wp-fetch';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
// export const revalidate = 60

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
// export const dynamicParams = true // or false, to 404 on unknown paths

export default async function HomepageTemplate({ data, locale, config }) {

  const content = await wpFetch(locale, `/os/api/page?slug=${data.slug}`, {
    // next: { revalidate: 60 },
  });

  const articles = await wpFetch(locale, `/os/api/posts?per_page=4&page=1`, {
    // next: { revalidate: 60 },
  });

  const tips = await wpFetch(locale, `/os/api/betting-tips?per_page=4`, {
    // next: { revalidate: 60 },
  });

  return (
    <div className="homepage-view">


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
      <PostsGrid
        icon="/svg/icon-globe.svg"
        PostCard={PostCard}
        config={config}
        items={articles}
        title={config?.strings?.articles?.articles}
        btnUrl={config?.sections?.related_content?.articles?.see_all_url}
      />

      <PostsGrid
        icon="/svg/icon-paper.svg"
        PostCard={PostCard}
        config={config}
        items={tips}
        title={config?.strings?.tips?.tips}
        btnUrl={config?.sections?.related_content?.betting_tips?.see_all_url}
      />

      <Content data={content} config={config} />


    </div>
  );
}
