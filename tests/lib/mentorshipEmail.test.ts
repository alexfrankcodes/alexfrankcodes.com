import { describe, expect, it } from "vitest";
import {
  buildMentorshipEmailBody,
  buildMentorshipEmailSubject,
} from "@/lib/mentorshipEmail";

describe("buildMentorshipEmailSubject", () => {
  it("includes the requester's name", () => {
    expect(buildMentorshipEmailSubject("Jamie Rivera")).toBe(
      "Mentorship request from Jamie Rivera"
    );
  });
});

describe("buildMentorshipEmailBody", () => {
  const fields = {
    name: "Jamie Rivera",
    email: "jamie@example.com",
    resumeReview: true,
    coaching: true,
    advice: false,
    goals: "Help prepping for interviews",
    skills: "React, TypeScript",
    resume: {
      name: "jamie-resume.pdf",
      type: "application/pdf",
      size: 2048,
    },
  };

  it("includes all submitted fields", () => {
    const body = buildMentorshipEmailBody(fields);
    expect(body).toContain("Name: Jamie Rivera");
    expect(body).toContain("Email: jamie@example.com");
    expect(body).toContain("Resume review, One-on-one coaching");
    expect(body).toContain("Help prepping for interviews");
    expect(body).toContain("React, TypeScript");
    expect(body).toContain("Resume attached: jamie-resume.pdf");
  });

  it("notes when there's no resume", () => {
    const body = buildMentorshipEmailBody({ ...fields, resume: null });
    expect(body).toContain("No resume attached.");
  });

  it("shows placeholders for empty optional text", () => {
    const body = buildMentorshipEmailBody({
      ...fields,
      goals: "",
      skills: "   ",
    });
    expect(body).toContain("(not provided)");
  });
});
