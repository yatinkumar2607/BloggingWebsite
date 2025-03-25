import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#121212] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a] rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            href="/articles"
            className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            Browse All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
