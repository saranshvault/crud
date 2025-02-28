# CRUD Application with Next.js, TailwindCSS, and DaisyUI

A comprehensive CRUD (Create, Read, Update, Delete) application built with Next.js, styled with TailwindCSS and DaisyUI components, and interacting with the JSONPlaceholder API for data management.

## Features

- **Posts Management**: Create, read, update, and delete blog posts
- **User Directory**: View user profiles and their associated posts
- **Todo List**: Manage todo items with status tracking
- **Responsive Design**: Mobile-friendly interface using TailwindCSS and DaisyUI
- **Form Validation**: Client-side validation using React Hook Form and Zod
- **Data Fetching**: Efficient data fetching with React Query

## Technologies Used

- **Next.js**: React framework for building server-side rendering and static web applications
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **DaisyUI**: Component library for TailwindCSS
- **React Query**: Data fetching and state management library
- **React Hook Form**: Form handling with validation
- **Zod**: TypeScript-first schema validation
- **JSONPlaceholder API**: Free online REST API for testing and prototyping

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saranshvault/crud
   cd nextjs-crud-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/app`: Next.js app directory with pages and components
- `/components`: Reusable UI components
- `/lib`: Utility functions, API clients, and types

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Deploy with a single click

## Challenges and Solutions

### Challenge: Managing State Across Components

**Solution**: Implemented React Query for efficient data fetching and state management, providing a consistent data layer across the application.

### Challenge: Form Validation

**Solution**: Used React Hook Form with Zod schema validation to create a type-safe form handling system with clear error messages.

### Challenge: Optimistic UI Updates

**Solution**: Implemented optimistic updates for better user experience, especially for todo item status toggling.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
