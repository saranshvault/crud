import Link from 'next/link';
import { Database, Users, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
            CRUD Application
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A demonstration of Create, Read, Update, and Delete operations using Next.js, 
            TailwindCSS, DaisyUI, and the JSONPlaceholder API.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link href="/posts" className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="card-body items-center text-center">
              <FileText className="w-16 h-16 text-indigo-600 mb-4" />
              <h2 className="card-title text-2xl font-bold text-gray-800">Posts</h2>
              <p className="text-gray-600">Manage blog posts with full CRUD functionality</p>
              <div className="card-actions mt-4">
                <button className="btn btn-primary">View Posts</button>
              </div>
            </div>
          </Link>

          <Link href="/users" className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="card-body items-center text-center">
              <Users className="w-16 h-16 text-indigo-600 mb-4" />
              <h2 className="card-title text-2xl font-bold text-gray-800">Users</h2>
              <p className="text-gray-600">View and manage user information</p>
              <div className="card-actions mt-4">
                <button className="btn btn-primary">View Users</button>
              </div>
            </div>
          </Link>

          <Link href="/todos" className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="card-body items-center text-center">
              <Database className="w-16 h-16 text-indigo-600 mb-4" />
              <h2 className="card-title text-2xl font-bold text-gray-800">Todos</h2>
              <p className="text-gray-600">Manage todo items with status tracking</p>
              <div className="card-actions mt-4">
                <button className="btn btn-primary">View Todos</button>
              </div>
            </div>
          </Link>
        </div>

        <footer className="text-center mt-20 text-gray-600">
          <p>Built with Next.js, TailwindCSS, and DaisyUI</p>
          <p className="mt-2">Data provided by JSONPlaceholder API</p>
        </footer>
      </div>
    </div>
  );
}