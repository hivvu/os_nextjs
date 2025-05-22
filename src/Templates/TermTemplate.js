import { LatestArticles } from "@/components";

export default async function TermTemplate({ data }) {

  return (
    <article>

      <div className="text-6xl">TERM TEMPLATE</div>

      <h1>{data.title}</h1>

      <details className='m-3'>
        <summary className='border p-3'>More slug info</summary>
        <div className='flex flex-col border p-3'>
          <p><strong>Term ID:</strong> {data.id}</p>
          <p><strong>Slug:</strong> {data.slug}</p>
          <p><strong>Type:</strong> {data.type}</p>
          <p><strong>Count:</strong> {data.count}</p>
        </div>
      </details>

      <LatestArticles id={data.id} locale={data.locale} />

    </article>
  );
}
