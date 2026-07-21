import { describe, expect, it } from "vitest";
import {
  MAX_RESUME_SIZE_BYTES,
  isHoneypotTripped,
  validateMentorshipRequest,
} from "@/lib/mentorshipValidation";

const baseFields = {
  name: "Jamie Rivera",
  email: "jamie@example.com",
  resumeReview: true,
  coaching: false,
  advice: false,
  goals: "",
  skills: "",
  honeypot: "",
  resume: null,
};

describe("validateMentorshipRequest", () => {
  it("passes for a valid minimal submission", () => {
    const result = validateMentorshipRequest(baseFields);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("requires a name", () => {
    const result = validateMentorshipRequest({ ...baseFields, name: "  " });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe("Name is required.");
  });

  it("requires a valid email", () => {
    const result = validateMentorshipRequest({
      ...baseFields,
      email: "not-an-email",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe("Enter a valid email address.");
  });

  it("requires at least one checkbox", () => {
    const result = validateMentorshipRequest({
      ...baseFields,
      resumeReview: false,
      coaching: false,
      advice: false,
    });
    expect(result.valid).toBe(false);
    expect(result.errors.checkboxes).toBe("Select at least one option.");
  });

  it("rejects a resume over the size limit", () => {
    const result = validateMentorshipRequest({
      ...baseFields,
      resume: {
        name: "resume.pdf",
        type: "application/pdf",
        size: MAX_RESUME_SIZE_BYTES + 1,
      },
    });
    expect(result.valid).toBe(false);
    expect(result.errors.resume).toBe("Resume must be under 4MB.");
  });

  it("rejects a disallowed file type", () => {
    const result = validateMentorshipRequest({
      ...baseFields,
      resume: { name: "resume.txt", type: "text/plain", size: 1024 },
    });
    expect(result.valid).toBe(false);
    expect(result.errors.resume).toBe("Resume must be a PDF or Word document.");
  });

  it("accepts a valid resume", () => {
    const result = validateMentorshipRequest({
      ...baseFields,
      resume: { name: "resume.pdf", type: "application/pdf", size: 1024 },
    });
    expect(result.valid).toBe(true);
  });
});

describe("isHoneypotTripped", () => {
  it("is false when empty", () => {
    expect(isHoneypotTripped({ honeypot: "" })).toBe(false);
  });

  it("is true when filled in", () => {
    expect(isHoneypotTripped({ honeypot: "Acme Inc" })).toBe(true);
  });
});
