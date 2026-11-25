import { NextResponse } from "next/server";
import { isValidEmail, sanitizeInput } from "@/lib/utils";
import fs from "fs";
import path from "path";
import { sendAdminNotification } from "@/lib/emailNotifier";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "volunteers.json");

function getStoredVolunteers(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) return [];
    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf8");
    return JSON.parse(fileContent) || [];
  } catch {
    return [];
  }
}

function saveStoredVolunteers(volunteers: any[]) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE_PATH), { recursive: true });
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(volunteers, null, 2), "utf8");
  } catch (err) {
    console.error("[Volunteer API] Error saving file:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot check
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Thank you for your interest in volunteering." }, { status: 200 });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      message,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !String(firstName).trim() || !String(lastName).trim()) {
      return NextResponse.json({ success: false, error: "Volunteer First and Last name are required." }, { status: 400 });
    }

    if (!email || !isValidEmail(String(email).trim())) {
      return NextResponse.json({ success: false, error: "A valid email address is required." }, { status: 400 });
    }

    if (!phone || String(phone).trim().length < 8) {
      return NextResponse.json({ success: false, error: "Volunteer mobile number is required." }, { status: 400 });
    }

    if (!streetAddress || !String(streetAddress).trim()) {
      return NextResponse.json({ success: false, error: "Street address is required." }, { status: 400 });
    }

    if (!city || !String(city).trim()) {
      return NextResponse.json({ success: false, error: "City is required." }, { status: 400 });
    }

    if (!message || String(message).trim().length < 5) {
      return NextResponse.json({ success: false, error: "Please write your message (at least 5 characters)." }, { status: 400 });
    }

    const volunteerRecord = {
      id: `vol_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      firstName: sanitizeInput(String(firstName).trim()),
      lastName: sanitizeInput(String(lastName).trim()),
      fullName: `${sanitizeInput(String(firstName).trim())} ${sanitizeInput(String(lastName).trim())}`,
      email: sanitizeInput(String(email).trim()),
      phone: sanitizeInput(String(phone).trim()),
      address: {
        streetAddress: sanitizeInput(String(streetAddress).trim()),
        addressLine2: addressLine2 ? sanitizeInput(String(addressLine2).trim()) : "",
        city: sanitizeInput(String(city).trim()),
        state: state ? sanitizeInput(String(state).trim()) : "",
        zipCode: zipCode ? sanitizeInput(String(zipCode).trim()) : "",
        country: country ? sanitizeInput(String(country).trim()) : "India",
      },
      message: sanitizeInput(String(message).trim()),
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    const list = getStoredVolunteers();
    list.unshift(volunteerRecord);
    saveStoredVolunteers(list);

    // Send admin notification
    try {
      await sendAdminNotification({
        type: "Volunteer Application",
        subject: `New Volunteer: ${volunteerRecord.fullName} (${volunteerRecord.email})`,
        data: {
          name: volunteerRecord.fullName,
          email: volunteerRecord.email,
          phone: volunteerRecord.phone,
          location: `${volunteerRecord.address.city}, ${volunteerRecord.address.state || ""}, ${volunteerRecord.address.country}`,
          message: volunteerRecord.message,
          submittedAt: volunteerRecord.submittedAt,
        },
      });
    } catch (notifErr) {
      console.error("[Volunteer API] Notification error:", notifErr);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for offering your zeal and compassion! Your volunteer application has been received successfully.",
      recordId: volunteerRecord.id,
    });
  } catch (error) {
    console.error("[Volunteer API] Unexpected error:", error);
    return NextResponse.json({ success: false, error: "An unexpected server error occurred." }, { status: 500 });
  }
}

export async function GET() {
  const volunteers = getStoredVolunteers();
  return NextResponse.json({ success: true, volunteers });
}
