# Mentorship Request Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "Request mentorship" `mailto:` link with an inline form (name, email, interest checkboxes, free-text goals/skills, resume upload) that emails the submission via Resend.

**Architecture:** A pure validation library (`lib/mentorshipValidation.ts`) and email-body builder (`lib/mentorshipEmail.ts`) are unit-tested with Vitest. A Next.js Route Handler (`app/api/mentorship-request/route.ts`) wires them together and calls the Resend API, with its own Vitest suite mocking Resend. A client component (`components/MentorshipForm.tsx`) renders and submits the form; `components/Mentorship.tsx` gets a toggle button that reveals it in place.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind, Resend (email delivery), Vitest (new dev dependency, first test framework in this repo).

## Global Constraints

- Resume upload: accept `.pdf`, `.doc`, `.docx`; reject anything else; max size 5MB — reject larger.
- At least one of the three interest checkboxes (resume review / coaching / advice) is required; name and email are required; the two textareas are optional.
- Email: `from: mentorship@alexfrankcodes.com`, `to: alexfrankcodes@gmail.com`, `reply_to` set to the requester's email, subject `Mentorship request from {name}`.
- No database, no file storage service (e.g. Vercel Blob) — resume is attached directly to the outgoing email.
- No confirmation email sent to the requester — page shows a success message only.
- Honeypot field (`company`) — visually hidden (not `display:none`), and if filled in, the server returns success but silently skips sending the email.
- On Resend/network failure, the user sees a generic error with a `mailto:` fallback link so the old escape hatch still exists.
- New env var `RESEND_API_KEY` must be added to Vercel's project settings in production — this plan cannot do that remotely; it's a manual follow-up for the user.
- Match the existing design system: colors via `border-border`/`bg-surface`/`text-foreground`/`text-muted`/`text-accent` tokens (see `tailwind.config.ts`), `font-mono` for labels/buttons (see `Section.tsx`/`Mentorship.tsx`), and the existing `.fade-rise` CSS utility (see `globals.css`, used in `Hero.tsx`) for the reveal-on-open animation.

---

### Task 1: Mentorship validation library + Vitest setup

**Files:**
- Create: `lib/mentorshipValidation.ts`
- Create: `vitest.config.ts`
- Test: `tests/lib/mentorshipValidation.test.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `MAX_RESUME_SIZE_BYTES: number`, `ALLOWED_RESUME_MIME_TYPES: string[]`, `interface ResumeFileMeta { name: string; type: string; size: number }`, `interface MentorshipRequestFields { name: string; email: string; resumeReview: boolean; coaching: boolean; advice: boolean; goals: string; skills: string; honeypot: string; resume: ResumeFileMeta | null }`, `interface ValidationResult { valid: boolean; errors: { name?: string; email?: string; checkboxes?: string; resume?: string } }`, `function isHoneypotTripped(fields: Pick<MentorshipRequestFields, "honeypot">): boolean`, `function validateMentorshipRequest(fields: MentorshipRequestFields): ValidationResult` — later tasks (route handler, tests) import all of these from `@/lib/mentorshipValidation`.

- [ ] **Step 1: Install Vitest**

Run: `npm install -D vitest`

- [ ] **Step 2: Add the test script to package.json**

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run"
```

- [ ] **Step 3: Create the Vitest config**

Create `vitest.config.ts`:

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 4: Write the failing test file**

Create `tests/lib/mentorshipValidation.test.ts`:

```ts
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
    expect(result.errors.resume).toBe("Resume must be under 5MB.");
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
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `npx vitest run tests/lib/mentorshipValidation.test.ts`
Expected: FAIL — cannot resolve `@/lib/mentorshipValidation` (module doesn't exist yet).

- [ ] **Step 6: Implement the validation library**

Create `lib/mentorshipValidation.ts`:

```ts
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
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `npx vitest run tests/lib/mentorshipValidation.test.ts`
Expected: PASS (7 tests)

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts lib/mentorshipValidation.ts tests/lib/mentorshipValidation.test.ts
git commit -m "Add mentorship request validation library with Vitest"
```

---

### Task 2: Mentorship email body builder

**Files:**
- Create: `lib/mentorshipEmail.ts`
- Test: `tests/lib/mentorshipEmail.test.ts`

**Interfaces:**
- Consumes: `MentorshipRequestFields` from `@/lib/mentorshipValidation` (Task 1).
- Produces: `function buildMentorshipEmailSubject(name: string): string`, `function buildMentorshipEmailBody(fields: Omit<MentorshipRequestFields, "honeypot">): string` — the route handler (Task 3) imports both.

- [ ] **Step 1: Write the failing test file**

Create `tests/lib/mentorshipEmail.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/lib/mentorshipEmail.test.ts`
Expected: FAIL — cannot resolve `@/lib/mentorshipEmail`.

- [ ] **Step 3: Implement the email body builder**

Create `lib/mentorshipEmail.ts`:

```ts
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run tests/lib/mentorshipEmail.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/mentorshipEmail.ts tests/lib/mentorshipEmail.test.ts
git commit -m "Add mentorship email body builder"
```

---

### Task 3: API route `/api/mentorship-request`

**Files:**
- Create: `app/api/mentorship-request/route.ts`
- Test: `tests/api/mentorship-request.test.ts`
- Create: `.env.local.example`
- Modify: `package.json`

**Interfaces:**
- Consumes: `isHoneypotTripped`, `validateMentorshipRequest`, `MentorshipRequestFields` from `@/lib/mentorshipValidation` (Task 1); `buildMentorshipEmailBody`, `buildMentorshipEmailSubject` from `@/lib/mentorshipEmail` (Task 2).
- Produces: `POST(request: Request): Promise<Response>` at `app/api/mentorship-request/route.ts`, reachable at `/api/mentorship-request`. Success response: `{ ok: true }` (200). Validation failure: `{ ok: false, errors: {...} }` (400). Send failure: `{ ok: false, errors: { _global: string } }` (502). Form field names it expects: `name`, `email`, `resumeReview`/`coaching`/`advice` (each `"true"`/`"false"`), `goals`, `skills`, `company` (honeypot), `resume` (file, optional) — `components/MentorshipForm.tsx` (Task 4) must send exactly these.

- [ ] **Step 1: Install Resend**

Run: `npm install resend`

- [ ] **Step 2: Document the required env var**

Create `.env.local.example`:

```
# Get this from https://resend.com/api-keys — the mentorship request form
# (app/api/mentorship-request/route.ts) needs it to send email notifications.
RESEND_API_KEY=
```

- [ ] **Step 3: Write the failing test file**

Create `tests/api/mentorship-request.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}));

import { POST } from "@/app/api/mentorship-request/route";

function buildRequest(
  fields: Record<string, string>,
  file?: { name: string; type: string; content: string }
) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.append(key, value);
  }
  if (file) {
    formData.append(
      "resume",
      new File([file.content], file.name, { type: file.type })
    );
  }
  return new Request("http://localhost/api/mentorship-request", {
    method: "POST",
    body: formData,
  });
}

const validFields = {
  name: "Jamie Rivera",
  email: "jamie@example.com",
  resumeReview: "true",
  coaching: "false",
  advice: "false",
  goals: "",
  skills: "",
  company: "",
};

beforeEach(() => {
  sendMock.mockReset();
  sendMock.mockResolvedValue({ data: { id: "email_123" }, error: null });
});

describe("POST /api/mentorship-request", () => {
  it("sends an email for a valid submission", async () => {
    const response = await POST(buildRequest(validFields));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledTimes(1);
    const call = sendMock.mock.calls[0][0];
    expect(call.to).toBe("alexfrankcodes@gmail.com");
    expect(call.replyTo).toBe("jamie@example.com");
    expect(call.subject).toBe("Mentorship request from Jamie Rivera");
  });

  it("attaches the resume when one is uploaded", async () => {
    await POST(
      buildRequest(validFields, {
        name: "resume.pdf",
        type: "application/pdf",
        content: "%PDF-1.4 fake content",
      })
    );

    const call = sendMock.mock.calls[0][0];
    expect(call.attachments).toHaveLength(1);
    expect(call.attachments[0].filename).toBe("resume.pdf");
  });

  it("returns 400 and does not send when required fields are missing", async () => {
    const response = await POST(buildRequest({ ...validFields, name: "" }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.ok).toBe(false);
    expect(body.errors.name).toBeTruthy();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 400 when no checkbox is selected", async () => {
    const response = await POST(
      buildRequest({
        ...validFields,
        resumeReview: "false",
        coaching: "false",
        advice: "false",
      })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.errors.checkboxes).toBeTruthy();
  });

  it("rejects an oversized resume", async () => {
    const bigContent = "a".repeat(6 * 1024 * 1024);
    const response = await POST(
      buildRequest(validFields, {
        name: "resume.pdf",
        type: "application/pdf",
        content: bigContent,
      })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.errors.resume).toBeTruthy();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("silently accepts but skips sending when the honeypot is filled in", async () => {
    const response = await POST(
      buildRequest({ ...validFields, company: "Acme Inc" })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 502 when Resend fails", async () => {
    sendMock.mockRejectedValueOnce(new Error("network down"));
    const response = await POST(buildRequest(validFields));
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body.ok).toBe(false);
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npx vitest run tests/api/mentorship-request.test.ts`
Expected: FAIL — cannot resolve `@/app/api/mentorship-request/route`.

- [ ] **Step 5: Implement the route handler**

Create `app/api/mentorship-request/route.ts`:

```ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  MentorshipRequestFields,
  isHoneypotTripped,
  validateMentorshipRequest,
} from "@/lib/mentorshipValidation";
import {
  buildMentorshipEmailBody,
  buildMentorshipEmailSubject,
} from "@/lib/mentorshipEmail";

const FROM_ADDRESS = "mentorship@alexfrankcodes.com";
const TO_ADDRESS = "alexfrankcodes@gmail.com";

function readString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

function readBoolean(value: FormDataEntryValue | null): boolean {
  return value === "true";
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const resumeEntry = formData.get("resume");
  const resumeFile =
    resumeEntry instanceof File && resumeEntry.size > 0 ? resumeEntry : null;

  const fields: MentorshipRequestFields = {
    name: readString(formData.get("name")),
    email: readString(formData.get("email")),
    resumeReview: readBoolean(formData.get("resumeReview")),
    coaching: readBoolean(formData.get("coaching")),
    advice: readBoolean(formData.get("advice")),
    goals: readString(formData.get("goals")),
    skills: readString(formData.get("skills")),
    honeypot: readString(formData.get("company")),
    resume: resumeFile
      ? { name: resumeFile.name, type: resumeFile.type, size: resumeFile.size }
      : null,
  };

  if (isHoneypotTripped(fields)) {
    return NextResponse.json({ ok: true });
  }

  const result = validateMentorshipRequest(fields);
  if (!result.valid) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 400 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: fields.email,
      subject: buildMentorshipEmailSubject(fields.name),
      text: buildMentorshipEmailBody(fields),
      attachments: resumeFile
        ? [
            {
              filename: resumeFile.name,
              content: Buffer.from(await resumeFile.arrayBuffer()),
            },
          ]
        : undefined,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          _global:
            "Something went wrong. Please try again or email me directly.",
        },
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npx vitest run tests/api/mentorship-request.test.ts`
Expected: PASS (7 tests)

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json .env.local.example app/api/mentorship-request/route.ts tests/api/mentorship-request.test.ts
git commit -m "Add mentorship request API route with Resend"
```

---

### Task 4: MentorshipForm client component

**Files:**
- Create: `components/MentorshipForm.tsx`

**Interfaces:**
- Consumes: `POST /api/mentorship-request` (Task 3) — sends `multipart/form-data` with fields `name`, `email`, `resumeReview`, `coaching`, `advice` (each `"true"`/`"false"`), `goals`, `skills`, `company` (honeypot), `resume` (file, optional); expects JSON `{ ok: boolean, errors?: {...} }`.
- Produces: default export `MentorshipForm` (no props) — `components/Mentorship.tsx` (Task 5) renders it.

No automated tests for this component (no DOM testing library in this repo — the testing-approach decision scoped Vitest to the validation library and API route only). Verified via type-checking, linting, and manual browser testing in Task 6.

- [ ] **Step 1: Implement the form component**

Create `components/MentorshipForm.tsx`:

```tsx
"use client";

import { FormEvent, useState } from "react";
import { MAX_RESUME_SIZE_BYTES } from "@/lib/mentorshipValidation";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const labelClasses =
  "block font-mono text-xs uppercase tracking-wide text-muted mb-1.5";

const MentorshipForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [fileError, setFileError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCheckboxError("");
    setFileError("");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const resumeReview = formData.get("resumeReview") === "on";
    const coaching = formData.get("coaching") === "on";
    const advice = formData.get("advice") === "on";
    if (!resumeReview && !coaching && !advice) {
      setCheckboxError("Select at least one option.");
      return;
    }

    const resume = formData.get("resume");
    if (resume instanceof File && resume.size > MAX_RESUME_SIZE_BYTES) {
      setFileError("Resume must be under 5MB.");
      return;
    }

    formData.set("resumeReview", resumeReview ? "true" : "false");
    formData.set("coaching", coaching ? "true" : "false");
    formData.set("advice", advice ? "true" : "false");

    setStatus("submitting");

    try {
      const response = await fetch("/api/mentorship-request", {
        method: "POST",
        body: formData,
      });
      const body = await response.json();

      if (!response.ok || !body.ok) {
        setErrorMessage(
          body?.errors?.checkboxes ||
            body?.errors?.resume ||
            body?.errors?.name ||
            body?.errors?.email ||
            body?.errors?._global ||
            "Something went wrong. Please try again or email me directly."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again or email me directly."
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="fade-rise mt-6 text-muted leading-relaxed">
        Thanks — I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="fade-rise mt-6 max-w-lg space-y-5" noValidate>
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className={labelClasses}>
          Name
        </label>
        <input id="name" name="name" type="text" required className={inputClasses} />
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input id="email" name="email" type="email" required className={inputClasses} />
      </div>

      <fieldset aria-describedby={checkboxError ? "checkbox-error" : undefined}>
        <legend className={labelClasses}>I&apos;m interested in</legend>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" name="resumeReview" className="accent-accent" />
            Resume review
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" name="coaching" className="accent-accent" />
            One-on-one coaching
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" name="advice" className="accent-accent" />
            Career advice
          </label>
        </div>
        {checkboxError && (
          <p className="mt-1.5 text-sm text-red-400" id="checkbox-error">
            {checkboxError}
          </p>
        )}
      </fieldset>

      <div>
        <label htmlFor="goals" className={labelClasses}>
          What are you looking for? (optional)
        </label>
        <textarea id="goals" name="goals" rows={3} className={inputClasses} />
      </div>

      <div>
        <label htmlFor="skills" className={labelClasses}>
          Describe your current skills (optional)
        </label>
        <textarea id="skills" name="skills" rows={3} className={inputClasses} />
      </div>

      <div>
        <label htmlFor="resume" className={labelClasses}>
          Resume (optional, PDF/DOC/DOCX, max 5MB)
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          aria-describedby={fileError ? "file-error" : undefined}
          className="w-full text-sm text-muted file:mr-3 file:rounded-md file:border file:border-border file:bg-surface file:px-3 file:py-1.5 file:text-sm file:text-foreground"
        />
        {fileError && (
          <p className="mt-1.5 text-sm text-red-400" id="file-error">
            {fileError}
          </p>
        )}
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400" role="alert">
          {errorMessage}{" "}
          <a
            href="mailto:alexfrankcodes@gmail.com?subject=Mentorship Request"
            className="underline"
          >
            Email me directly ↗
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="font-mono text-sm text-foreground hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Submit request →"}
      </button>
    </form>
  );
};

export default MentorshipForm;
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/MentorshipForm.tsx
git commit -m "Add MentorshipForm client component"
```

---

### Task 5: Wire the toggle into Mentorship.tsx

**Files:**
- Modify: `components/Mentorship.tsx`

**Interfaces:**
- Consumes: default export `MentorshipForm` from `@/components/MentorshipForm` (Task 4).

- [ ] **Step 1: Replace the mailto link with a toggle + form**

Replace the full contents of `components/Mentorship.tsx`:

```tsx
"use client";

import { useState } from "react";
import { mentorshipAreas } from "@/data/mentorship";
import { SECTION_IDS } from "@/data/navigation";
import Section from "@/components/Section";
import ConfettiText from "@/components/ConfettiText";
import MentorshipForm from "@/components/MentorshipForm";

const Mentorship = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Section id={SECTION_IDS.mentorship} title="Mentorship">
      <p className="text-muted leading-relaxed max-w-lg">
        I enjoy helping newer developers find their footing, so I offer{" "}
        <ConfettiText className="text-accent">100% free</ConfettiText> mentorship to junior
        engineers and students:
      </p>
      <ul className="mt-10 space-y-8">
        {mentorshipAreas.map((area) => (
          <li key={area.id} className="border-l border-border pl-5">
            <h3 className="font-display font-semibold tracking-tight text-foreground">
              {area.title}
            </h3>
            <p className="mt-1.5 text-muted leading-relaxed">
              {area.description}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-10 font-mono text-sm">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          className="text-foreground hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          {isOpen ? "Cancel" : "Request mentorship ↗"}
        </button>
      </p>
      {isOpen && <MentorshipForm />}
    </Section>
  );
};

export default Mentorship;
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Mentorship.tsx
git commit -m "Wire mentorship request form into the Mentorship section"
```

---

### Task 6: Full test suite, build, and manual verification

**Files:** none (verification only)

- [ ] **Step 1: Run the full Vitest suite**

Run: `npm test`
Expected: PASS — all tests from Tasks 1–3 (17 tests total).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: build succeeds with no type or lint errors.

- [ ] **Step 3: Manual browser verification**

Run: `npm run dev`, open the site, scroll to Mentorship, and check:
- Clicking "Request mentorship ↗" reveals the form with a fade-in; label swaps to "Cancel"; clicking "Cancel" collapses it.
- Submitting with empty Name/Email shows the browser's native required-field validation.
- Submitting with no checkbox selected shows "Select at least one option." and does not submit.
- Attaching a file over 5MB shows "Resume must be under 5MB." and does not submit.
- Submitting a valid request (with and without a resume) shows the success message, and an email arrives at alexfrankcodes@gmail.com with the correct fields, reply-to, and attachment (when included).
- Confirm this step requires `RESEND_API_KEY` to be set in `.env.local` (copy `.env.local.example` and fill in your key) — not something this plan can do on your behalf.

- [ ] **Step 4: Note the production follow-up**

Manually add `RESEND_API_KEY` to the Vercel project's environment variables before this ships to production — the deployed site will otherwise 502 on every submission.
