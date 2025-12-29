import { NextResponse } from "next/server"
import { Resend } from "resend"

const resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const TO_EMAIL = "avijitpratapsin@gmail.com"
const FROM_EMAIL = "Portfolio Contact <onboarding@resend.dev>"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body ?? {}

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY || !resendClient) {
      console.error("RESEND_API_KEY is not set")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
        <h2 style="color:#6d28d9;">New Portfolio Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="margin: 24px 0; border: 0; border-top: 1px solid #e2e8f0;" />
        <p style="white-space: pre-line;">${message}</p>
      </div>
    `

    const { error: resendError } = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: [email],
      subject: `Portfolio Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: htmlContent,
    })

    if (resendError) {
      console.error("Resend API error", resendError)
      const message = typeof resendError === "string" ? resendError : resendError.message ?? "Failed to send message"
      return NextResponse.json({ error: message }, { status: 502 })
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Resend contact error", error)
    const message = error instanceof Error ? error.message : "Failed to send message"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
