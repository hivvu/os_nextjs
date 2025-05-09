export default async function Page({ params }) {
  const { slug } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { cache: 'no-store' }
  )

  const data = await res.json()
  const post = data?.[0]

  if (!post) {
    return (
      <main className="p-6 text-center text-gray-500">
        <h1>Conteúdo não encontrado</h1>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>
      {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
        <img
          src={post._embedded['wp:featuredmedia'][0].source_url}
          alt={post.title.rendered}
          className="mb-6 rounded"
        />
      )}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </main>
  )
}
