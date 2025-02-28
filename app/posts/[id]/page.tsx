'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowLeft, Edit } from 'lucide-react';
import { getPost, getUser } from '@/lib/api';
import { Loading } from '@/components/ui/loading';
import { ErrorDisplay } from '@/components/ui/error';
import { Navbar } from '@/components/layout/navbar';

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);
  
  const { 
    data: post, 
    isLoading: isPostLoading, 
    isError: isPostError,
    error: postError
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
  });

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ['user', post?.userId],
    queryFn: () => getUser(post!.userId),
    enabled: !!post?.userId,
  });

  if (isPostLoading) return <Loading />;
  if (isPostError) return <ErrorDisplay message={postError.message} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/posts" className="btn btn-ghost gap-2">
            <ArrowLeft size={16} />
            Back to Posts
          </Link>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <h2 className="card-title text-2xl">{post.title}</h2>
              <Link href={`/posts/${post.id}/edit`} className="btn btn-primary gap-2">
                <Edit size={16} />
                Edit Post
              </Link>
            </div>
            
            {isUserLoading ? (
              <div className="badge badge-neutral">Loading author...</div>
            ) : isUserError ? (
              <div className="badge badge-error">Error loading author</div>
            ) : (
              <div className="flex items-center gap-2 my-2">
                <div className="badge badge-primary">Author</div>
                <Link href={`/users/${user?.id}`} className="link link-hover">
                  {user?.name}
                </Link>
              </div>
            )}
            
            <div className="divider"></div>
            
            <p className="whitespace-pre-line text-lg">{post.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}