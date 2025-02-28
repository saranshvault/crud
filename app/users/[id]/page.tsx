'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowLeft, Mail, Globe, Phone, MapPin, Briefcase } from 'lucide-react';
import { getUser, getPosts } from '@/lib/api';
import { Loading } from '@/components/ui/loading';
import { ErrorDisplay } from '@/components/ui/error';
import { Navbar } from '@/components/layout/navbar';

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const userId = parseInt(params.id);
  
  const { 
    data: user, 
    isLoading: isUserLoading, 
    isError: isUserError,
    error: userError
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
  });

  const {
    data: posts,
    isLoading: isPostsLoading,
  } = useQuery({
    queryKey: ['userPosts', userId],
    queryFn: async () => {
      const allPosts = await getPosts();
      return allPosts.filter(post => post.userId === userId);
    },
    enabled: !!userId,
  });

  if (isUserLoading) return <Loading />;
  if (isUserError) return <ErrorDisplay message={userError.message} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/users" className="btn btn-ghost gap-2">
            <ArrowLeft size={16} />
            Back to Users
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col items-center mb-4">
                  <div className="avatar placeholder mb-4">
                    <div className="bg-neutral text-neutral-content rounded-full w-24">
                      <span className="text-3xl">{user.name.charAt(0)}</span>
                    </div>
                  </div>
                  <h2 className="card-title text-2xl text-center">{user.name}</h2>
                  <p className="text-gray-500">@{user.username}</p>
                </div>
                
                <div className="divider"></div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a href={`mailto:${user.email}`} className="link link-hover">{user.email}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p>{user.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Website</h3>
                      <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="link link-hover">
                        {user.website}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p>{user.address.street}, {user.address.suite}</p>
                      <p>{user.address.city}, {user.address.zipcode}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Company</h3>
                      <p className="font-semibold">{user.company.name}</p>
                      <p className="text-sm italic">"{user.company.catchPhrase}"</p>
                      <p className="text-sm">{user.company.bs}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Posts by {user.name}</h2>
                
                {isPostsLoading ? (
                  <Loading />
                ) : posts && posts.length > 0 ? (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div key={post.id} className="card bg-base-200">
                        <div className="card-body p-4">
                          <h3 className="card-title text-lg">{post.title}</h3>
                          <p className="line-clamp-2">{post.body}</p>
                          <div className="card-actions justify-end mt-2">
                            <Link href={`/posts/${post.id}`} className="btn btn-sm btn-primary">
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>No posts found for this user.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}