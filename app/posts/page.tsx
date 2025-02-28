import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { PostsList } from './components/posts-list';

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
          <Link href="/posts/new" className="btn btn-primary">
            Create New Post
          </Link>
        </div>
        
        <PostsList />
      </div>
    </div>
  );
}