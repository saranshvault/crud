import { getPost } from '@/lib/api';
import { notFound } from 'next/navigation';

// ✅ Required for static export — generates static paths at build time
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with your actual API
  const posts = await res.json();

  return posts.map((post: { id: number }) => ({
    id: `${post.id}`, // Ensuring `id` is a string
  }));
}

// ✅ Default export for the post page
export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(Number(params.id));

  if (!post) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg">{post.body}</p>
    </div>
  );
}
