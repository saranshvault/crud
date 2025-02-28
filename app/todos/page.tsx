'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, X, Trash2 } from 'lucide-react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/lib/api';
import { Loading } from '@/components/ui/loading';
import { ErrorDisplay } from '@/components/ui/error';
import { Navbar } from '@/components/layout/navbar';

const todoSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  userId: z.number().positive('User ID is required'),
});

type TodoFormData = z.infer<typeof todoSchema>;

export default function TodosPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      userId: 1, // Default user ID
    },
  });

  const { 
    data: todos, 
    isLoading, 
    isError, 
    error: fetchError, 
    refetch 
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const filteredTodos = todos ? todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  }) : [];

  const onSubmit = async (data: TodoFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await createTodo({
        ...data,
        completed: false,
      });
      reset({ title: '', userId: data.userId });
      refetch();
    } catch (err) {
      setError('Failed to create todo. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await updateTodo(id, { completed: !completed });
      refetch();
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodo(id);
        refetch();
      } catch (err) {
        console.error('Failed to delete todo:', err);
      }
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorDisplay message={fetchError.message} retry={() => refetch()} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Todo List</h1>
        
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">Add New Todo</h2>
            
            {error && (
              <div className="alert alert-error mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
              <div className="form-control flex-1">
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                  {...register('title')}
                />
                {errors.title && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.title.message}</span>
                  </label>
                )}
              </div>
              
              <div className="form-control w-full md:w-32">
                <input
                  type="number"
                  placeholder="User ID"
                  className={`input input-bordered w-full ${errors.userId ? 'input-error' : ''}`}
                  {...register('userId', { valueAsNumber: true })}
                />
                {errors.userId && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.userId.message}</span>
                  </label>
                )}
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Adding...
                  </>
                ) : 'Add Todo'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center mb-6">
              <h2 className="card-title text-xl">Todo Items</h2>
              
              <div className="join">
                <button 
                  className={`join-item btn ${filter === 'all' ? 'btn-active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`join-item btn ${filter === 'active' ? 'btn-active' : ''}`}
                  onClick={() => setFilter('active')}
                >
                  Active
                </button>
                <button 
                  className={`join-item btn ${filter === 'completed' ? 'btn-active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </div>
            </div>
            
            {filteredTodos.length === 0 ? (
              <div className="alert">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>No todos found. Add some tasks to get started!</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Title</th>
                      <th>User ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTodos.map((todo) => (
                      <tr key={todo.id} className={todo.completed ? 'opacity-60' : ''}>
                        <td>
                          <button 
                            className={`btn btn-circle btn-sm ${todo.completed ? 'btn-success' : 'btn-outline'}`}
                            onClick={() => handleToggleComplete(todo.id, todo.completed)}
                          >
                            {todo.completed ? <Check size={16} /> : <X size={16} />}
                          </button>
                        </td>
                        <td className={todo.completed ? 'line-through' : ''}>
                          {todo.title}
                        </td>
                        <td>{todo.userId}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-error"
                            onClick={() => handleDelete(todo.id)}
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}