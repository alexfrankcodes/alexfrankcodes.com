import { MentorshipRequestFields } from "@/lib/mentorshipValidation";

export function buildMentorshipEmailSubject(name: string): string {
  return `Mentorship request from ${name}`;
}

export function buildMentorshipEmailBody(
  fields: Omit<MentorshipRequestFields, "honeypot">
): string {
  const areas =
    [
      fields.resumeReview && "Resume review",
      fields.coaching && "One-on-one coaching",
      fields.advice && "Career advice",
    ]
      .filter(Boolean)
      .join(", ") || "None selected";

  const lines = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Areas of interest: ${areas}`,
    "",
    "What they're looking for:",
    fields.goals.trim() || "(not provided)",
    "",
    "Current skills:",
    fields.skills.trim() || "(not provided)",
    "",
    fields.resume
      ? `Resume attached: ${fields.resume.name}`
      : "No resume attached.",
  ];

  return lines.join("\n");
}
