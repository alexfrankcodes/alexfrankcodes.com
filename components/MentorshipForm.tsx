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
