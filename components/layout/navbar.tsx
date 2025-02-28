'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Users, Database } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li className={pathname === '/' ? 'active' : ''}>
              <Link href="/" className="flex items-center gap-2">
                <Home size={18} />
                Home
              </Link>
            </li>
            <li className={pathname.startsWith('/posts') ? 'active' : ''}>
              <Link href="/posts" className="flex items-center gap-2">
                <FileText size={18} />
                Posts
              </Link>
            </li>
            <li className={pathname.startsWith('/users') ? 'active' : ''}>
              <Link href="/users" className="flex items-center gap-2">
                <Users size={18} />
                Users
              </Link>
            </li>
            <li className={pathname.startsWith('/todos') ? 'active' : ''}>
              <Link href="/todos" className="flex items-center gap-2">
                <Database size={18} />
                Todos
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">CRUD App</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className={pathname === '/' ? 'active' : ''}>
            <Link href="/" className="flex items-center gap-2">
              <Home size={18} />
              Home
            </Link>
          </li>
          <li className={pathname.startsWith('/posts') ? 'active' : ''}>
            <Link href="/posts" className="flex items-center gap-2">
              <FileText size={18} />
              Posts
            </Link>
          </li>
          <li className={pathname.startsWith('/users') ? 'active' : ''}>
            <Link href="/users" className="flex items-center gap-2">
              <Users size={18} />
              Users
            </Link>
          </li>
          <li className={pathname.startsWith('/todos') ? 'active' : ''}>
            <Link href="/todos" className="flex items-center gap-2">
              <Database size={18} />
              Todos
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="User avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Profile</a></li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}