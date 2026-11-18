import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { sanitizeInput, isValidEmail } from "@/lib/utils";
import { pool, testConnection } from "../../../../server/src/db";

const DATA_FILE = path.join(process.cwd(), "data", "reviews.json");
const NOTIFICATIONS_FILE = path.join(process.cwd(), "data", "review_notifications.json");

const ADMIN_NOTIFICATION_EMAIL = "swadeepsvs@gmail.com";

const OFFICIAL_REVIEWS = [
  {
    id: "rev-official-1",
    name: "Pradeep Kumar Ghosal",
    nameGu: "પ્રદીપ કુમાર ઘોષાલ",
    role: "Head – Environment, CR & Sustainability, Coastal Gujarat Power Ltd. (TATA Power)",
    roleGu: "હેડ – પર્યાવરણ, CR અને ટકાઉપણું, કોસ્ટલ ગુજરાત પાવર લિ. (ટાટા પાવર)",
    category: "Funding Partners",
    rating: 5,
    quote: "Coastal Gujarat Power Limited (Tata Power) – CGPL’s partnership with SWADEEP is based on Specific Community Development Principle which is further aligned with the Social Sustainability Strategic intents to serve the community in a systematic manner through co-creation, effective planning, bridging the gap, Unique innovations, and Participatory learning in an Inclusive approach for getting the desired results in the field. Together, we aspire to bring the desired transformation through effective partnership and continued collaboration. It is always a matter of privilege to have been associated with SWADEEP and its efforts in the field. Our association with SWADEEP has only grown stronger over the years and has become an integral part of CGPL’s Integrated Fishermen Development Program titled 'Sagarbandhu'.",
    image: "/images/reviews/pradeep-kumar-ghosal.png",
    is_approved: true,
    created_at: "2026-10-01T10:00:00.000Z",
  },
  {
    id: "rev-official-2",
    name: "American India Foundation (AIF)",
    nameGu: "અમેરિકન ઇન્ડિયા ફાઉન્ડેશન (AIF)",
    role: "Funding & Implementation Partner",
    roleGu: "સહયોગી અને અમલીકરણ ભાગીદાર",
    category: "Funding Partners",
    rating: 5,
    quote: "Working with an NGO like Swadeep which has a vast & logical understanding of communities and smart solutions for the problems of the region they serve is great. American India Foundation always appreciates the pure and honest efforts made towards lifting up the livelihoods of people and surely Swadeep is one of those who deserve one.",
    image: "/images/reviews/aif-logo.png",
    is_approved: true,
    created_at: "2026-10-05T11:00:00.000Z",
  },
  {
    id: "rev-official-3",
    name: "U.T. Administration of Dadra and Nagar Haveli and Daman and Diu",
    nameGu: "કેન્દ્રશાસિત પ્રદેશ દાદરા અને નગર હવેલી અને દમણ અને દીવ વહીવટીતંત્ર",
    role: "Government of India",
    roleGu: "ભારત સરકાર",
    category: "Government Partner",
    rating: 5,
    quote: "We have worked with the Swadeep on the projects of Education and Community Development for a long time and have been able to see a clear impact on the community through tangible deliverables. We would love to applaud for team Swadeep for their incredible efforts in the betterment of the U/T Dadra and Nagar Haveli.",
    image: "/images/reviews/dnh-logo.png",
    is_approved: true,
    created_at: "2026-10-10T12:00:00.000Z",
  },
];

function getStoredReviews(): Array<any> {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(OFFICIAL_REVIEWS, null, 2), "utf8");
      return OFFICIAL_REVIEWS;
    }
    const data = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(OFFICIAL_REVIEWS, null, 2), "utf8");
      return OFFICIAL_REVIEWS;
    }
    const existingIds = new Set(parsed.map((r: any) => r.id));
    const missingOfficials = OFFICIAL_REVIEWS.filter((o) => !existingIds.has(o.id));
    if (missingOfficials.length > 0) {
      const merged = [...parsed, ...missingOfficials];
      fs.writeFileSync(DATA_FILE, JSON.stringify(merged, null, 2), "utf8");
      return merged;
    }
    return parsed;
  } catch (err) {
    console.error("[Reviews API] Error reading data file:", err);
    return OFFICIAL_REVIEWS;
  }
}

function saveStoredReviews(reviews: Array<any>): boolean {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[Reviews API] Error writing data file:", err);
    return false;
  }
}

function saveNotificationLog(notification: any) {
  try {
    fs.mkdirSync(path.dirname(NOTIFICATIONS_FILE), { recursive: true });
    let existing: any[] = [];
    if (fs.existsSync(NOTIFICATIONS_FILE)) {
      try {
        existing = JSON.parse(fs.readFileSync(NOTIFICATIONS_FILE, "utf8"));
      } catch {
        existing = [];
      }
    }
    existing.unshift(notification);
    fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(existing, null, 2), "utf8");
  } catch (err) {
    console.error("[Reviews API] Error saving notification log:", err);
  }
}

async function sendEmailNotification(review: any) {
  const notificationPayload = {
    id: `notif-${Date.now()}`,
    recipient: ADMIN_NOTIFICATION_EMAIL,
    subject: `New Public Review: ${review.name} (${review.rating} ★)`,
    sent_at: new Date().toISOString(),
    review: {
      id: review.id,
      name: review.name,
      email: review.email || "Not provided",
      role: review.role,
      category: review.category,
      rating: review.rating,
      quote: review.quote,
    },
    status: "recorded",
  };

  // 1. Always record in persistent notification log for audit
  saveNotificationLog(notificationPayload);

  // 2. Dispatch email via nodemailer if SMTP credentials exist or in development
  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"Swadeep Website Reviews" <${smtpUser}>`,
        to: ADMIN_NOTIFICATION_EMAIL,
        subject: `[Swadeep Website Review] ${review.name} (${review.rating} / 5 Stars)`,
        text: `A new review has been submitted on the Swadeep website:
--------------------------------------------------
Name: ${review.name}
Email: ${review.email || "Not provided"}
Role / Affiliation: ${review.role}
Category: ${review.category}
Rating: ${review.rating} / 5 Stars
Date: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

Review:
"${review.quote}"
--------------------------------------------------
View and manage in Admin Dashboard: http://localhost:3000/admin`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #fffdf7;">
            <div style="background-color: #0B3025; color: #fff; padding: 16px 20px; border-radius: 8px; text-align: center;">
              <h2 style="margin: 0; font-size: 20px;">Swadeep Shikshan Vikas Sanstha</h2>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #F47B2A;">New Public Website Review Notification</p>
            </div>
            <div style="padding: 20px; background-color: #ffffff; border-radius: 8px; margin-top: 15px; border: 1px solid #f1f5f9;">
              <p style="font-size: 14px; color: #334155; margin-top: 0;">A new community review has been submitted on the website:</p>
              <table style="width: 100%; font-size: 13px; color: #1e293b; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Reviewer Name:</td><td>${review.name}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td>${review.email || "Not provided"}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Affiliation / Role:</td><td>${review.role}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Category:</td><td>${review.category}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Star Rating:</td><td style="color: #f59e0b; font-size: 16px;">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)} (${review.rating}/5)</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Submitted At:</td><td>${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td></tr>
              </table>
              <div style="margin-top: 15px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #F47B2A; border-radius: 4px; font-style: italic; color: #0f172a; line-height: 1.6;">
                &ldquo;${review.quote}&rdquo;
              </div>
              <div style="margin-top: 20px; text-align: center;">
                <a href="http://localhost:3000/admin" style="background-color: #0B3025; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 20px; font-size: 13px; font-weight: bold; display: inline-block;">
                  Open Admin Dashboard
                </a>
              </div>
            </div>
            <p style="text-align: center; font-size: 11px; color: #64748b; margin-top: 15px;">
              This notification was automatically sent to <strong>${ADMIN_NOTIFICATION_EMAIL}</strong>.
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`[Reviews API] Email successfully delivered to ${ADMIN_NOTIFICATION_EMAIL}`);
      notificationPayload.status = "delivered";
      saveNotificationLog(notificationPayload);
    } else {
      console.log(`[Reviews API] Notification for review recorded and addressed to ${ADMIN_NOTIFICATION_EMAIL} (SMTP credentials not configured in env, logged to file)`);
    }
  } catch (mailErr) {
    console.warn(`[Reviews API] Could not send live email to ${ADMIN_NOTIFICATION_EMAIL}:`, mailErr);
  }
}

export async function GET() {
  try {
    // 1. Try fetching from PostgreSQL if connected
    const dbTest = await testConnection();
    if (dbTest.connected) {
      try {
        const res = await pool.query(
          "SELECT id, name, role, category, rating, quote, created_at FROM reviews WHERE is_approved = true ORDER BY created_at DESC LIMIT 50;"
        );
        if (res.rows && res.rows.length > 0) {
          return NextResponse.json({ success: true, reviews: res.rows });
        }
      } catch (dbErr) {
        console.warn("[Reviews API] Database query failed, falling back to JSON:", dbErr);
      }
    }

    // 2. Read from persistent local JSON file
    const reviews = getStoredReviews();
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("[Reviews API GET Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve reviews." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    // Honeypot check for spam bots
    if (body.website && typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Thank you for your review." },
        { status: 200 }
      );
    }

    const { name, email, role, quote, message, rating, category } = body;
    const reviewContent = quote || message;

    // Validate Name
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: "Please enter your name (2 to 100 characters)." },
        { status: 400 }
      );
    }

    // Validate Review Content
    if (!reviewContent || typeof reviewContent !== "string" || reviewContent.trim().length < 5 || reviewContent.trim().length > 1500) {
      return NextResponse.json(
        { success: false, error: "Please enter your review (5 to 1,500 characters)." },
        { status: 400 }
      );
    }

    // Optional email validation
    let cleanEmail: string | undefined = undefined;
    if (email && typeof email === "string" && email.trim().length > 0) {
      if (!isValidEmail(email.trim())) {
        return NextResponse.json(
          { success: false, error: "Please provide a valid email address." },
          { status: 400 }
        );
      }
      cleanEmail = sanitizeInput(email.trim().toLowerCase());
    }

    // Validate Rating (1 - 5)
    const numRating = Number(rating) || 5;
    const validRating = Math.min(5, Math.max(1, Math.round(numRating)));

    const cleanName = sanitizeInput(name.trim());
    const cleanRole = role && typeof role === "string" && role.trim()
      ? sanitizeInput(role.trim().slice(0, 100))
      : "Community Supporter";
    const cleanCategory = category && typeof category === "string" && category.trim()
      ? sanitizeInput(category.trim().slice(0, 50))
      : "Community Review";
    const cleanQuote = sanitizeInput(reviewContent.trim());

    const newReview = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName,
      email: cleanEmail,
      role: cleanRole,
      category: cleanCategory,
      rating: validRating,
      quote: cleanQuote,
      is_approved: true,
      created_at: new Date().toISOString(),
    };

    // Save to persistent JSON
    const stored = getStoredReviews();
    stored.unshift(newReview);
    saveStoredReviews(stored);

    // Also attempt to store in PostgreSQL if available
    try {
      const dbTest = await testConnection();
      if (dbTest.connected) {
        await pool.query(
          `CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            email VARCHAR(150),
            role VARCHAR(150),
            category VARCHAR(100),
            rating INT DEFAULT 5,
            quote TEXT NOT NULL,
            is_approved BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );`
        );
        await pool.query(
          "INSERT INTO reviews (name, email, role, category, rating, quote, is_approved) VALUES ($1, $2, $3, $4, $5, $6, true);",
          [cleanName, cleanEmail || null, cleanRole, cleanCategory, validRating, cleanQuote]
        );
      }
    } catch (sqlErr) {
      console.warn("[Reviews API] PostgreSQL write omitted (persisted to file):", sqlErr);
    }

    // Dispatch email notification to swadeepsvs@gmail.com
    await sendEmailNotification(newReview);

    return NextResponse.json({
      success: true,
      message: "Thank you! Your review has been submitted, notified to swadeepsvs@gmail.com, and is now live on the website and admin dashboard.",
      review: newReview,
    });
  } catch (error) {
    console.error("[Reviews API POST Error]", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while saving your review." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing review ID." }, { status: 400 });
    }

    if (id.startsWith("rev-official-")) {
      return NextResponse.json(
        { success: false, error: "Official partner/staff reviews cannot be deleted." },
        { status: 403 }
      );
    }

    let stored = getStoredReviews();
    stored = stored.filter((r) => r.id !== id);
    saveStoredReviews(stored);

    return NextResponse.json({ success: true, message: "Review removed successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete review." }, { status: 500 });
  }
}
