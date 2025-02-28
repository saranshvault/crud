import { getPost } from '@/lib/api';

// ✅ Generate static paths at build time
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with actual API
  const posts = await res.json();

  return posts.map((post: { id: number }) => ({
    id: `${post.id}`, // Convert to string
  }));
}
