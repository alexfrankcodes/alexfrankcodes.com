import React from 'react';

const SkeletonItem: React.FC<{ className: string }> = ({ className }) => (
  <div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}></div>
);

export const LandingSkeleton: React.FC = () => (
  <div className="w-full space-y-4">
    <SkeletonItem className="h-12 w-3/4" />
    <SkeletonItem className="h-4 w-1/2" />
    <SkeletonItem className="h-10 w-1/4" />
  </div>
);

export const AboutSkeleton: React.FC = () => (
  <div className="w-full space-y-4">
    <SkeletonItem className="h-8 w-1/2" />
    <SkeletonItem className="h-32 w-full" />
    <SkeletonItem className="h-4 w-3/4" />
    <SkeletonItem className="h-4 w-2/3" />
  </div>
);

export const ProjectsSkeleton: React.FC = () => (
  <div className="w-full space-y-4">
    <SkeletonItem className="h-8 w-1/3" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonItem className="h-40 w-full" />
          <SkeletonItem className="h-4 w-3/4" />
          <SkeletonItem className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  </div>
);

export const MentorshipSkeleton: React.FC = () => (
  <div className="w-full space-y-4">
    <SkeletonItem className="h-8 w-1/3" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonItem className="h-32 w-full" />
          <SkeletonItem className="h-4 w-3/4" />
          <SkeletonItem className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  </div>
);

export const ContactSkeleton: React.FC = () => (
  <div className="w-full space-y-4">
    <SkeletonItem className="h-8 w-1/3" />
    <SkeletonItem className="h-10 w-full" />
    <SkeletonItem className="h-10 w-full" />
    <SkeletonItem className="h-32 w-full" />
    <SkeletonItem className="h-10 w-1/4" />
  </div>
);

export const FooterSkeleton: React.FC = () => (
  <div className="w-full space-y-2">
    <SkeletonItem className="h-4 w-full" />
    <SkeletonItem className="h-4 w-3/4" />
  </div>
);
