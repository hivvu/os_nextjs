import ContentWithSidebar from '@/components/ContentWithSidebar/ContentWithSidebar';

export default function HomepageTemplate({ data, config }) {

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


    </article>
  );
}
