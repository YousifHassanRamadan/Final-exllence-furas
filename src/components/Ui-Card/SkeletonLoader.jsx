const SkeletonLoader = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
      <div className="h-40 bg-gray-300 rounded-md"></div>
      <div className="mt-4 h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonLoader;
