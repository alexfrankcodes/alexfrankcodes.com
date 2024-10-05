import React from 'react';

const SkeletonItem: React.FC<{ className: string }> = ({ className }) => (
  <div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}></div>
);

export const LandingSkeleton: React.FC = () => (
  <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
    <SkeletonItem className="h-16 w-3/4 mb-4" />
    <SkeletonItem className="h-8 w-1/2 mb-8" />
    <SkeletonItem className="h-12 w-40" />
  </section>
);

export const AboutSkeleton: React.FC = () => (
  <section className="py-16 px-4">
    <SkeletonItem className="h-12 w-1/3 mb-8" />
    <div className="flex flex-col md:flex-row gap-8">
      <SkeletonItem className="h-64 w-64 rounded-full mb-8 md:mb-0" />
      <div className="flex-1 space-y-4">
        <SkeletonItem className="h-6 w-3/4" />
        <SkeletonItem className="h-6 w-full" />
        <SkeletonItem className="h-6 w-5/6" />
      </div>
    </div>
    <div className="mt-12 space-y-6">
      <SkeletonItem className="h-8 w-1/4" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <SkeletonItem key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  </section>
);

export const ProjectsSkeleton: React.FC = () => (
  <section className="py-16 px-4">
    <SkeletonItem className="h-12 w-1/3 mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-muted dark:bg-muted-dark rounded-lg p-6 space-y-4">
          <SkeletonItem className="h-8 w-3/4" />
          <SkeletonItem className="h-20 w-full" />
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, j) => (
              <SkeletonItem key={j} className="h-6 w-20" />
            ))}
          </div>
          <div className="flex gap-4">
            <SkeletonItem className="h-10 w-24" />
            <SkeletonItem className="h-10 w-24" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const MentorshipSkeleton: React.FC = () => (
  <section className="py-16 px-4">
    <SkeletonItem className="h-12 w-1/3 mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bg-muted dark:bg-muted-dark rounded-lg p-6 space-y-4">
          <SkeletonItem className="h-8 w-3/4" />
          <SkeletonItem className="h-24 w-full" />
          <SkeletonItem className="h-10 w-32" />
        </div>
      ))}
    </div>
  </section>
);

export const ContactSkeleton: React.FC = () => (
  <section className="py-16 px-4">
    <SkeletonItem className="h-12 w-1/3 mb-8" />
    <div className="max-w-2xl mx-auto space-y-6">
      <SkeletonItem className="h-12 w-full" />
      <SkeletonItem className="h-12 w-full" />
      <SkeletonItem className="h-32 w-full" />
      <SkeletonItem className="h-12 w-40" />
    </div>
  </section>
);

export const FooterSkeleton: React.FC = () => (
  <footer className="py-8 px-4">
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <SkeletonItem className="h-6 w-48" />
      <div className="flex space-x-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonItem key={i} className="h-8 w-8 rounded-full" />
        ))}
      </div>
    </div>
  </footer>
);
