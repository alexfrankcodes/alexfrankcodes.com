import React from 'react';
import { cn } from "@/lib/utils";

const SkeletonItem: React.FC<{ className: string }> = ({ className }) => (
  <div className={cn(`bg-muted dark:bg-muted-dark rounded animate-pulse`, className)}></div>
);

export const LandingSkeleton: React.FC = () => (
  <section className="text-white py-16 text-center w-full">
    <SkeletonItem className="h-[68px] w-3/4 mb-4 mx-auto" /> {/* Name (text-7xl) */}
    <SkeletonItem className="h-[30px] w-1/2 mb-6 mx-auto" /> {/* Title (text-3xl) */}
    <div className="flex justify-center space-x-8 mb-8">
      {[...Array(3)].map((_, i) => (
        <SkeletonItem key={i} className="h-6 w-6" /> /* Social icons */
      ))}
    </div>
    <SkeletonItem className="h-[52px] w-64 rounded-full mx-auto" /> {/* Resume button */}
  </section>
);

export const AboutSkeleton: React.FC = () => (
  <section className="py-12 w-full">
    <div className="container mx-auto px-4">
      <div className="lg:flex lg:space-x-12 items-center">
        <div className="lg:w-2/3">
          <SkeletonItem className="h-[44px] w-1/3 mb-8" /> {/* About Me title (text-4xl) */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <SkeletonItem key={i} className="h-6 w-full" /> /* Paragraphs */
            ))}
          </div>
        </div>
        <div className="lg:w-1/3 flex justify-center mt-8 lg:mt-0">
          <SkeletonItem className="h-64 w-64 rounded-full" /> {/* Avatar */}
        </div>
      </div>
      <div className="mt-8 lg:mt-0">
        <SkeletonItem className="h-[32px] w-1/4 mb-8" /> {/* Skills title (text-2xl) */}
        <div className="lg:ml-24 grid lg:grid-cols-3 grid-cols-2 gap-x-8 gap-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <SkeletonItem className="h-7 w-7" /> {/* Skill icon */}
              <SkeletonItem className="h-[22px] w-24" /> {/* Skill name (text-lg) */}
            </div>
          ))}
        </div>
        <SkeletonItem className="h-[28px] w-48 mt-8 mx-auto" /> {/* "...and many more!" (text-xl) */}
      </div>
    </div>
  </section>
);

export const ProjectsSkeleton: React.FC = () => (
  <section className="py-16 w-full">
    <div className="container mx-auto px-4">
      <SkeletonItem className="h-[44px] w-1/2 mb-12 mx-auto lg:mx-0" /> {/* Featured Projects title (text-4xl) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-muted dark:bg-muted-dark rounded-lg p-6 space-y-4">
            <SkeletonItem className="h-[32px] w-3/4" /> {/* Project title (text-2xl) */}
            <SkeletonItem className="h-24 w-full" /> {/* Project description */}
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, j) => (
                <SkeletonItem key={j} className="h-[26px] w-20 rounded-full" /> /* Technologies */
              ))}
            </div>
            <div className="flex justify-between">
              <SkeletonItem className="h-[24px] w-28" /> {/* View Project link */}
              <SkeletonItem className="h-[24px] w-28" /> {/* View Source link */}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const MentorshipSkeleton: React.FC = () => (
  <section className="my-8 w-full">
    <div className="container mx-auto px-4">
      <SkeletonItem className="h-[44px] w-1/3 mb-8 mx-auto lg:mx-0" /> {/* Mentorship title (text-4xl) */}
      <SkeletonItem className="h-[84px] w-full max-w-3xl mb-12" /> {/* Description (text-xl) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-secondary dark:bg-secondary-dark rounded-lg p-6 space-y-4 flex flex-col items-center text-center h-64">
            <SkeletonItem className="h-12 w-12 rounded-full" /> {/* Icon */}
            <SkeletonItem className="h-[28px] w-3/4" /> {/* Title (text-xl) */}
            <SkeletonItem className="h-20 w-full" /> {/* Description */}
          </div>
        ))}
      </div>
      <div className="text-center">
        <SkeletonItem className="h-[52px] w-40 rounded-full mx-auto" /> {/* CTA Button */}
      </div>
    </div>
  </section>
);

export const ContactSkeleton: React.FC = () => (
  <section className="py-16 w-full">
    <div className="container mx-auto px-4 text-center">
      <SkeletonItem className="h-[44px] w-1/3 mb-8 mx-auto" /> {/* Get in Touch title (text-4xl) */}
      <SkeletonItem className="h-[84px] w-full max-w-2xl mx-auto mb-12" /> {/* Description (text-xl) */}
      <div className="flex justify-center space-x-8">
        {[...Array(3)].map((_, i) => (
          <SkeletonItem key={i} className="h-8 w-8" /> /* Social icons */
        ))}
      </div>
    </div>
  </section>
);

export const FooterSkeleton: React.FC = () => (
  <footer className="py-8 text-center w-full">
    <SkeletonItem className="h-6 w-48 mx-auto" /> {/* Footer text */}
  </footer>
);