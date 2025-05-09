'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function LatestPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed`)
        if (!res.ok) throw new Error('Cant fetch posts')
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getPosts();
  }, [])


  if (loading) return <p>A carregar...</p>
  if (error) return <p>Erro: {error}</p>


  return (
    <div className="max-w-6xl mx-auto p-4">
        
        <h2>Latest posts</h2>

        <ul className="space-y-4">
        {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded">
                <Link href={`/${post.type}/${post.slug}`}>
                    <h3 className="text-xl font-semibold">{post.title.rendered}</h3>
                    <p
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                </Link>
            </li>
        ))}
        </ul>
    </div>
  )
}
