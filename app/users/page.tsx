'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Mail, Globe, Phone } from 'lucide-react';
import { getUsers } from '@/lib/api';
import { Loading } from '@/components/ui/loading';
import { ErrorDisplay } from '@/components/ui/error';
import { Navbar } from '@/components/layout/navbar';

export default function UsersPage() {
  const { data: users, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorDisplay message={error.message} retry={() => refetch()} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Users</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users?.map((user) => (
            <div key={user.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body">
                <h2 className="card-title text-xl">{user.name}</h2>
                <p className="text-gray-500">@{user.username}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" />
                    <a href={`mailto:${user.email}`} className="link link-hover">{user.email}</a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-500" />
                    <span>{user.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-gray-500" />
                    <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="link link-hover">
                      {user.website}
                    </a>
                  </div>
                </div>
                
                <div className="card-actions justify-end mt-4">
                  <Link href={`/users/${user.id}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}