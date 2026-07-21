export const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;

export const ALLOWED_RESUME_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export interface ResumeFileMeta {
  name: string;
  type: string;
  size: number;
}

export interface MentorshipRequestFields {
  name: string;
  email: string;
  resumeReview: boolean;
  coaching: boolean;
  advice: boolean;
  goals: string;
  skills: string;
  honeypot: string;
  resume: ResumeFileMeta | null;
}

export interface ValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    email?: string;
    checkboxes?: string;
    resume?: string;
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isHoneypotTripped(
  fields: Pick<MentorshipRequestFields, "honeypot">
): boolean {
  return fields.honeypot.trim().length > 0;
}

export function validateMentorshipRequest(
  fields: MentorshipRequestFields
): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  if (!fields.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!fields.resumeReview && !fields.coaching && !fields.advice) {
    errors.checkboxes = "Select at least one option.";
  }

  if (fields.resume) {
    if (fields.resume.size > MAX_RESUME_SIZE_BYTES) {
      errors.resume = "Resume must be under 5MB.";
    } else if (!ALLOWED_RESUME_MIME_TYPES.includes(fields.resume.type)) {
      errors.resume = "Resume must be a PDF or Word document.";
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
