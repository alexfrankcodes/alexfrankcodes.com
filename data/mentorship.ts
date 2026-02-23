import { MentorshipArea } from "@/lib/types";
import { FaFile, FaGraduationCap, FaUserFriends } from "react-icons/fa";

export const mentorshipAreas: MentorshipArea[] = [
  {
    id: "coaching",
    icon: FaUserFriends,
    title: "One-on-One Coaching",
    description:
      "Personalized guidance tailored to your career goals and current skill level.",
  },
  {
    id: "resume-reviews",
    icon: FaFile,
    title: "Resume Reviews",
    description:
      "Detailed feedback to optimize your resume and improve your chances with potential employers.",
  },
  {
    id: "career-advice",
    icon: FaGraduationCap,
    title: "Career Advice",
    description:
      "Insights on job searching, interview preparation, and navigating the tech industry.",
  },
];
