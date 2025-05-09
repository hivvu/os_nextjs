export function getApiUrl(endpoint) {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  return `${baseUrl}/wp-json${endpoint}`;
}

export async function fetchPosts() {
  const url = getApiUrl("/wp/v2/posts?_embed");

  const res = await fetch(url);
  if (!res.ok) throw new Error("Can't fetch posts");

  return res.json();
}
