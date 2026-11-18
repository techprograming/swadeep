import { NextResponse } from "next/server";
import { isValidEmail, sanitizeInput } from "@/lib/utils";
import { pool, testConnection, inMemoryFallback } from "../../../../server/src/db";
import jwt from "jsonwebtoken";
import { config } from "../../../../server/src/config";
import { sendAdminNotification } from "@/lib/emailNotifier";
import fs from "fs";
import path from "path";

const INQUIRIES_FILE = path.join(process.cwd(), "data", "inquiries.json");

function getInquiriesFromFile(): any[] {
  try {
    if (!fs.existsSync(INQUIRIES_FILE)) return [];
    const content = fs.readFileSync(INQUIRIES_FILE, "utf8");
    return JSON.parse(content) || [];
  } catch {
    return [];
  }
}

function saveInquiryToFile(inquiry: any) {
  try {
    fs.mkdirSync(path.dirname(INQUIRIES_FILE), { recursive: true });
    const existing = getInquiriesFromFile();
    existing.unshift(inquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(existing, null, 2), "utf8");
  } catch (err) {
    console.error("[Contact API] Error saving inquiry to file:", err);
  }
}

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown; // Honeypot field for bot spam detection
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

    // Honeypot check: If the hidden 'website' field is filled by a bot, silently succeed
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      console.warn("[Contact API] Bot honeypot triggered. Silently dropping payload.");
      return NextResponse.json(
        { success: true, message: "Thank you for contacting Swadeep." },
        { status: 200 }
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

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeInput(trimmedName),
      email: sanitizeInput(trimmedEmail),
      phone: sanitizeInput(trimmedPhone),
      subject: sanitizeInput(trimmedSubject),
      message: sanitizeInput(trimmedMessage),
      receivedAt: new Date().toISOString(),
    };

    // Store in PostgreSQL or fallback
    try {
      const dbStatus = await testConnection();
      if (dbStatus.connected) {
        await pool.query(
          `INSERT INTO inquiries (name, email, phone, subject, message, status, is_read)
           VALUES ($1, $2, $3, $4, $5, 'new', false)`,
          [
            sanitizedData.name,
            sanitizedData.email,
            sanitizedData.phone || null,
            sanitizedData.subject,
            sanitizedData.message,
          ]
        );
      } else {
        const fallbackInquiry = {
          id: inMemoryFallback.inquiries.length + 1,
          name: sanitizedData.name,
          email: sanitizedData.email,
          phone: sanitizedData.phone || null,
          subject: sanitizedData.subject,
          message: sanitizedData.message,
          status: "new",
          is_read: false,
          created_at: sanitizedData.receivedAt,
        };
        inMemoryFallback.inquiries.unshift(fallbackInquiry);
        saveInquiryToFile(fallbackInquiry);
      }
    } catch (dbErr) {
      console.warn("[Contact Route DB Save Warning]", dbErr);
      saveInquiryToFile({
        id: Date.now(),
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone || null,
        subject: sanitizedData.subject,
        message: sanitizedData.message,
        status: "new",
        is_read: false,
        created_at: sanitizedData.receivedAt,
      });
    }

    // Dispatch email notification to swadeepsvs@gmail.com
    try {
      await sendAdminNotification({
        type: "Contact Inquiry",
        subject: `${sanitizedData.name} — ${sanitizedData.subject}`,
        data: {
          name: sanitizedData.name,
          email: sanitizedData.email,
          phone: sanitizedData.phone || "Not provided",
          subject: sanitizedData.subject,
          message: sanitizedData.message,
          submittedAt: sanitizedData.receivedAt,
        },
      });
    } catch (notifErr) {
      console.error("[Contact API] Error sending admin notification:", notifErr);
    }

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

export async function GET(request: Request) {
  // Check authorization header
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, config.jwtSecret);
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid or expired token." },
      { status: 401 }
    );
  }

  try {
    const dbStatus = await testConnection();
    if (dbStatus.connected) {
      const res = await pool.query(
        "SELECT id, name, email, phone, subject, message, status, is_read, created_at FROM inquiries ORDER BY created_at DESC LIMIT 100"
      );
      return NextResponse.json({
        success: true,
        inquiries: res.rows,
      });
    } else {
      const fileInquiries = getInquiriesFromFile();
      const existingIds = new Set(fileInquiries.map((i) => i.id));
      const merged = [
        ...fileInquiries,
        ...inMemoryFallback.inquiries.filter((i) => !existingIds.has(i.id)),
      ];
      return NextResponse.json({
        success: true,
        inquiries: merged,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries." },
      { status: 500 }
    );
  }
}
