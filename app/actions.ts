"use server";

import { checkBotId } from "botid/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
  const verification = await checkBotId();

  if (verification.isBot) {
    return {
      message: "Unable to verify request. Please try again.",
    };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return {
      message: "Please fill in all fields.",
    };
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL || "your-email@example.com",
      replyTo: email,
      subject: `Contact Form: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return {
      message: "Thanks for your message! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      message: "Something went wrong. Please try again.",
    };
  }
}
