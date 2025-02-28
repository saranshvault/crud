'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createPost } from '@/lib/api';
import { Navbar } from '@/components/layout/navbar';

const postSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  body: z.string().min(10, 'Content must be at least 10 characters'),
  userId: z.number().positive('User ID is required'),
});

type PostFormData = z.infer<typeof postSchema>;

export default function NewPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      body: '',
      userId: 1, // Default user ID
    },
  });

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const newPost = await createPost(data);

      // Store new post in localStorage
      const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      localStorage.setItem("posts", JSON.stringify([newPost, ...savedPosts]));

      router.push('/posts'); // Navigate to post list
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="card bg-base-100 shadow-xl max-w-3xl mx-auto">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Create New Post</h2>
            
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control mb-4">
                <label className="label">Title</label>
                <input
                  type="text"
                  placeholder="Enter post title"
                  className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                  {...register('title')}
                />
                {errors.title && <span className="text-error">{errors.title.message}</span>}
              </div>
              
              <div className="form-control mb-4">
                <label className="label">Content</label>
                <textarea
                  placeholder="Enter post content"
                  className={`textarea textarea-bordered h-32 ${errors.body ? 'textarea-error' : ''}`}
                  {...register('body')}
                ></textarea>
                {errors.body && <span className="text-error">{errors.body.message}</span>}
              </div>
              
              <div className="form-control mb-6">
                <label className="label">User ID</label>
                <input
                  type="number"
                  placeholder="Enter user ID"
                  className={`input input-bordered w-full ${errors.userId ? 'input-error' : ''}`}
                  {...register('userId', { valueAsNumber: true })}
                />
                {errors.userId && <span className="text-error">{errors.userId.message}</span>}
              </div>
              
              <div className="card-actions justify-end">
                <Link href="/posts" className="btn btn-ghost">Cancel</Link>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
