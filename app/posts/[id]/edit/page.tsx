'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getPost, updatePost } from '@/lib/api';
import { Navbar } from '@/components/layout/navbar';
import { Loading } from '@/components/ui/loading';

const postSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  body: z.string().min(10, 'Content must be at least 10 characters'),
  userId: z.number().positive('User ID is required'),
});

type PostFormData = z.infer<typeof postSchema>;

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const postId = parseInt(params.id);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPost(postId);
        reset({
          title: post.title,
          body: post.body,
          userId: post.userId,
        });
      } catch (err) {
        setError('Failed to load post. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId, reset]);

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await updatePost(postId, data);
      router.push(`/posts/${postId}`);
    } catch (err) {
      setError('Failed to update post. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href={`/posts/${postId}`} className="btn btn-ghost gap-2">
            <ArrowLeft size={16} />
            Back to Post
          </Link>
        </div>

        <div className="card bg-base-100 shadow-xl max-w-3xl mx-auto">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Post</h2>
            
            {error && (
              <div className="alert alert-error mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter post title"
                  className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                  {...register('title')}
                />
                {errors.title && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.title.message}</span>
                  </label>
                )}
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Enter post content"
                  className={`textarea textarea-bordered h-32 ${errors.body ? 'textarea-error' : ''}`}
                  {...register('body')}
                ></textarea>
                {errors.body && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.body.message}</span>
                  </label>
                )}
              </div>
              
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">User ID</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter user ID"
                  className={`input input-bordered w-full ${errors.userId ? 'input-error' : ''}`}
                  {...register('userId', { valueAsNumber: true })}
                />
                {errors.userId && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.userId.message}</span>
                  </label>
                )}
              </div>
              
              <div className="card-actions justify-end">
                <Link href={`/posts/${postId}`} className="btn btn-ghost">Cancel</Link>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Updating...
                    </>
                  ) : 'Update Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}