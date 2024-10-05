import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const LandingSkeleton: React.FC = () => (
  <div className="w-full space-y-4">
    <Skeleton className="h-12 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-10 w-1/4" />
  </div>
);

export const AboutSkeleton: React.FC = () => (
  <div className="w-full space-y-4">
    <Skeleton className="h-8 w-1/2" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

export const ProjectsSkeleton: React.FC = () => (
  <div className="w-full space-y-4">
    <Skeleton className="h-8 w-1/3" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  </div>
);

export const MentorshipSkeleton: React.FC = () => (
  <div className="w-full space-y-4">
    <Skeleton className="h-8 w-1/3" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  </div>
);

export const ContactSkeleton: React.FC = () => (
  <div className="w-full space-y-4">
    <Skeleton className="h-8 w-1/3" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-10 w-1/4" />
  </div>
);

export const FooterSkeleton: React.FC = () => (
  <div className="w-full space-y-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);
