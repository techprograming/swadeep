import { NextResponse } from "next/server";
import { isValidEmail, sanitizeInput } from "@/lib/utils";

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
}

export async function POST(request: Request) {
  try {
    let body: ContactRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = body;

    // Validate Name (required, 2-100 characters)
    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { success: false, error: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    // Validate Email (required, valid email format)
    if (typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }
    const trimmedEmail = email.trim();
    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Validate Message (required, 10-2000 characters)
    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required." },
        { status: 400 }
      );
    }
    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
      return NextResponse.json(
        {
          success: false,
          error: "Message must be between 10 and 2000 characters.",
        },
        { status: 400 }
      );
    }

    // Optional Phone validation
    let trimmedPhone = "";
    if (typeof phone === "string" && phone.trim()) {
      trimmedPhone = phone.trim();
      const phoneRegex = /^[+]?[\d\s-]{8,15}$/;
      if (!phoneRegex.test(trimmedPhone)) {
        return NextResponse.json(
          {
            success: false,
            error: "Please enter a valid phone number (8-15 digits).",
          },
          { status: 400 }
        );
      }
    }

    // Subject validation
    let trimmedSubject = "General Inquiry";
    if (typeof subject === "string" && subject.trim()) {
      trimmedSubject = subject.trim();
      if (trimmedSubject.length < 3) {
        return NextResponse.json(
          { success: false, error: "Subject must be at least 3 characters." },
          { status: 400 }
        );
      }
    }

    // Sanitize all inputs using sanitizeInput to protect against XSS
    const sanitizedData = {
      name: sanitizeInput(trimmedName),
      email: sanitizeInput(trimmedEmail),
      phone: sanitizeInput(trimmedPhone),
      subject: sanitizeInput(trimmedSubject),
      message: sanitizeInput(trimmedMessage),
      receivedAt: new Date().toISOString(),
    };

    // Log the sanitized submission securely on the server
    console.log("[Contact API] Received validated inquiry:", {
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      subject: sanitizedData.subject,
      receivedAt: sanitizedData.receivedAt,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting Swadeep Shikshan Vikas Sanstha. Your message has been received, and our team will get back to you shortly.",
        data: {
          name: sanitizedData.name,
          email: sanitizedData.email,
          receivedAt: sanitizedData.receivedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Unexpected error occurred:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected server error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
