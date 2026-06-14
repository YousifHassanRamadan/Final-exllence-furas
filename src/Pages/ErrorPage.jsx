import { RefreshCw, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ErrorPage() {
  const [isRetrying, setIsRetrying] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-8">
          We couldn't process your request. Please try again later or contact
          support if the problem persists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            href="/"
            className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
