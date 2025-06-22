import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Finance Hub. Built with React, TypeScript, and Tailwind CSS.</p>
            <p className="mt-1 text-sm">
              A comprehensive portfolio management and financial news platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
