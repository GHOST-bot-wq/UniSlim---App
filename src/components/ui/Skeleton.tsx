import React from 'react';

interface SkeletonProps { className?: string; }

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />
);

export const DashboardSkeleton: React.FC = () => (
  <div className="p-4 space-y-4">
    <Skeleton className="h-36 w-full" />
    <Skeleton className="h-48 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-20 w-full" />
  </div>
);

export default Skeleton;
