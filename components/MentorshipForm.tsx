"use client";

import { FormEvent, useState } from "react";
import { MAX_RESUME_SIZE_BYTES } from "@/lib/mentorshipValidation";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const labelClasses =
  "block font-mono text-xs uppercase tracking-wide text-muted mb-1.5";

const checkboxLabelClasses =
  "flex items-center gap-2.5 text-sm text-foreground cursor-pointer";

const fileInputClasses =
  "w-full text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-md file:border file:border-border file:bg-surface file:px-3 file:py-1.5 file:font-mono file:text-xs file:uppercase file:tracking-wide file:text-foreground file:transition-colors file:duration-150 hover:file:border-accent hover:file:text-accent";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CheckboxOption = {
  name: "resumeReview" | "coaching" | "advice";
  label: string;
};

const CHECKBOX_OPTIONS: CheckboxOption[] = [
  { name: "resumeReview", label: "Resume review" },
  { name: "coaching", label: "One-on-one coaching" },
  { name: "advice", label: "Career advice" },
];

const Checkbox = ({ name, label }: CheckboxOption) => (
  <label className={checkboxLabelClasses}>
    <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
      <input
        type="checkbox"
        name={name}
        className="peer absolute inset-0 h-4 w-4 cursor-pointer appearance-none"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none h-4 w-4 rounded-[3px] border border-border bg-surface transition-colors duration-150 peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="pointer-events-none absolute h-2.5 w-2.5 fill-none stroke-background stroke-[2.5] opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
      >
        <path d="M3 8.5L6.5 12L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
    {label}
  </label>
);

const MentorshipForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [fileError, setFileError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNameError("");
    setEmailError("");
    setCheckboxError("");
    setFileError("");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    if (!name) {
      setNameError("Name is required.");
      return;
    }

    const email = String(formData.get("email") ?? "").trim();
    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    const resumeReview = formData.get("resumeReview") === "on";
    const coaching = formData.get("coaching") === "on";
    const advice = formData.get("advice") === "on";
    if (!resumeReview && !coaching && !advice) {
      setCheckboxError("Select at least one option.");
      return;
    }

    const resume = formData.get("resume");
    if (resume instanceof File && resume.size > MAX_RESUME_SIZE_BYTES) {
      setFileError("Resume must be under 4MB.");
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
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-describedby={nameError ? "name-error" : undefined}
          className={inputClasses}
        />
        {nameError && (
          <p className="mt-1.5 text-sm text-red-400" id="name-error">
            {nameError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-describedby={emailError ? "email-error" : undefined}
          className={inputClasses}
        />
        {emailError && (
          <p className="mt-1.5 text-sm text-red-400" id="email-error">
            {emailError}
          </p>
        )}
      </div>

      <fieldset aria-describedby={checkboxError ? "checkbox-error" : undefined}>
        <legend className={labelClasses}>I&apos;m interested in</legend>
        <div className="space-y-2.5">
          {CHECKBOX_OPTIONS.map((option) => (
            <Checkbox key={option.name} {...option} />
          ))}
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
          Resume (optional, PDF/DOC/DOCX, max 4MB)
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          aria-describedby={fileError ? "file-error" : undefined}
          className={fileInputClasses}
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
