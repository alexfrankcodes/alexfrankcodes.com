import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: sendMock } };
  }),
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
    expect(Buffer.from(call.attachments[0].content).toString()).toBe(
      "%PDF-1.4 fake content"
    );
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

  it("returns 502 when Resend resolves with an error payload", async () => {
    sendMock.mockResolvedValueOnce({
      data: null,
      error: { name: "validation_error", message: "Invalid API key" },
    });
    const response = await POST(buildRequest(validFields));
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body.ok).toBe(false);
  });
});
