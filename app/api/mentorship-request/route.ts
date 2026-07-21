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
