'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';
import { getPosts, deletePost } from '@/lib/api';
import { Loading } from '@/components/ui/loading';
import { ErrorDisplay } from '@/components/ui/error';
import { useEffect, useState } from 'react';

export function PostsList() {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [localPosts, setLocalPosts] = useState([]);

  const { data: posts, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    if (posts) setLocalPosts([...savedPosts, ...posts]); // Merge local and API posts
  }, [posts]);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        setDeletingId(id);
        await deletePost(id);

        // Remove post from localStorage
        const updatedPosts = localPosts.filter(post => post.id !== id);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));

        setLocalPosts(updatedPosts); // Update state instantly
        alert('Post deleted successfully!');
        refetch(); // Optional: Ensure sync with API
      } catch (error) {
        alert('Failed to delete post. Please try again.');
        console.error('Delete error:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorDisplay message={error.message} retry={() => refetch()} />;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {localPosts.length > 0 ? (
            localPosts.map((post) => (
              <tr key={post.id} className="hover">
                <td>{post.id}</td>
                <td>
                  <Link href={`/posts/${post.id}`} className="font-medium hover:text-primary">
                    {post.title}
                  </Link>
                </td>
                <td className="flex gap-2">
                  <Link href={`/posts/${post.id}/edit`} className="btn btn-sm btn-info">
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button 
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                  >
                    {deletingId === post.id ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <Trash2 size={16} />
                    )}
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4">No posts available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
