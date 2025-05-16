export default function HomepageTemplate({ data }) {
    return (
      <article>
        
        <div className="text-6xl">HOMEPAGE TEMPLATE</div>
        
        <h1>{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.excerpt }} />


        <details className='m-3'>
            <summary className='border p-3'>More slug info</summary>
            <div className='flex flex-col border p-3'>
                <p><strong>Post ID:</strong> {data.post_id}</p>
                <p><strong>Slug:</strong> {data.slug}</p>
                <p><strong>Type:</strong> {data.type}</p>
                <p><strong>Status:</strong> {data.post_status}</p>
            </div>
        </details>


      </article>
    );
  }
  