# Mentorship request form — design spec

Date: 2026-07-21

## Problem

The Mentorship section's "Request mentorship" link currently just opens a
`mailto:` with a pre-filled subject. There's no structure to what someone is
asking for — no name, no way to say what kind of help they want, no way to
attach a resume. Replace it with a proper form that captures that
information and delivers it as a notification email.

## Non-goals

- No database or persistent storage of submissions — this is a stateless
  notify-me-by-email flow.
- No spam/rate-limiting infrastructure beyond a honeypot field (see below).
- No confirmation email sent to the requester — a success message on the
  page is sufficient for v1.

## UX & component structure

- `Mentorship.tsx` renders a new client component, `components/MentorshipForm.tsx`,
  which owns the open/closed toggle and form state.
- The existing "Request mentorship ↗" link becomes a `<button>` that toggles
  `isOpen`. When open, its label swaps to "Cancel". The form fades in below
  it using the existing `.reveal` / `fade-rise` utilities in `globals.css`
  (already respects `prefers-reduced-motion`).
- Fields, top to bottom:
  - Name — text, required
  - Email — email, required
  - Checkboxes — "Resume review", "One-on-one coaching", "Career advice";
    at least one required (custom validation, not native HTML)
  - Textarea — "What are you looking for?" (optional)
  - Textarea — "Describe your current skills" (optional)
  - File input — resume upload, accept `.pdf,.doc,.docx`, 5MB max (optional)
  - A hidden honeypot field (e.g. `company` or similar bot-bait name),
    visually hidden via CSS (not `display:none`, which some bots skip),
    positioned off-screen. If it's non-empty on submit, the server silently
    accepts and drops the request (returns success to the client without
    sending an email), so bots get no signal that they were filtered.
  - Submit button + inline error/success states
- Styled with existing design tokens (`border-border`, `bg-surface`,
  `text-accent` focus rings, `font-mono` labels) to match the rest of the
  site rather than looking like a generic bolted-on form.

## API route & email delivery

- New route: `app/api/mentorship-request/route.ts`, `POST` handler.
- Client submits `multipart/form-data` (required for the file upload).
- Server-side flow:
  1. Re-validate required fields (name, email, ≥1 checkbox) and honeypot.
  2. Re-validate the resume file server-side: size ≤5MB, and sniff actual
     MIME type (not just filename extension) to reject disguised files.
  3. If a resume is present, read it into a buffer and attach it to the
     outgoing email as a base64 attachment via Resend.
  4. Send one email via Resend:
     - `from: mentorship@alexfrankcodes.com`
     - `to: alexfrankcodes@gmail.com`
     - `reply_to: <requester's email>` (so replying goes straight to them)
     - subject: `Mentorship request from {name}`
     - body: all submitted fields, clearly labeled
  5. Return `{ ok: true }` on success, or a 4xx with a specific error
     message (e.g. `"Resume must be under 5MB"`) on validation failure, or
     a 5xx generic message if the Resend call itself fails.
- New env var: `RESEND_API_KEY`. Added to `.env.local` for local dev; must
  be added to Vercel project settings for production (not something this
  session can do remotely — flagged as a manual follow-up).
- No database, no file storage (e.g. Vercel Blob) — the route is fully
  stateless per request. Resend account and verified sending domain
  (`alexfrankcodes.com`) already exist per the user.

## Validation, errors & edge cases

- **Client-side**: HTML5 `required` / `type="email"`, a custom check that
  at least one checkbox is ticked before allowing submit, `accept` on the
  file input, and a pre-submit size check with an inline error if the file
  is over 5MB.
- **Server-side** is the source of truth and re-checks everything the
  client does, independent of what the client sent.
- **Submit states**: idle → submitting (button disabled, "Sending…") →
  success (form replaced with a thank-you message) or error (inline error
  banner above the submit button; form fields retain their values so
  nothing typed is lost).
- **Resend/network failure**: shown as a generic "Something went wrong,
  please try again or email me directly" message with a `mailto:` fallback
  link, so the old escape hatch still exists if the new pipe breaks.
- **Accessibility**: labels tied to inputs via `htmlFor`/`id`, checkbox
  group wrapped in `fieldset`/`legend`, error text linked via
  `aria-describedby`.
- **Spam**: honeypot field only for v1. Rate limiting explicitly deferred
  as a future improvement given low expected traffic on a personal site.

## Open follow-ups (not blocking, but worth noting)

- `RESEND_API_KEY` must be added to Vercel's production env vars manually
  by the user after this lands.
