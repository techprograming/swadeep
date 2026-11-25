import { NextResponse } from "next/server";
import { isValidEmail, sanitizeInput } from "@/lib/utils";
import fs from "fs";
import path from "path";
import { sendAdminNotification } from "@/lib/emailNotifier";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "partner_inquiries.json");

function getStoredPartnerInquiries(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) return [];
    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf8");
    return JSON.parse(fileContent) || [];
  } catch {
    return [];
  }
}

function saveStoredPartnerInquiries(items: any[]) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE_PATH), { recursive: true });
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(items, null, 2), "utf8");
  } catch (err) {
    console.error("[Partner Inquiry API] Error saving file:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot check
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Thank you for your inquiry." }, { status: 200 });
    }

    const { organizationName, contactPerson, email, phone, collaborationArea, message } = body;

    if (!organizationName || !String(organizationName).trim()) {
      return NextResponse.json({ success: false, error: "Organization Name is required." }, { status: 400 });
    }

    if (!contactPerson || !String(contactPerson).trim()) {
      return NextResponse.json({ success: false, error: "Contact Person name is required." }, { status: 400 });
    }

    if (!email || !isValidEmail(String(email).trim())) {
      return NextResponse.json({ success: false, error: "A valid email address is required." }, { status: 400 });
    }

    if (!message || String(message).trim().length < 5) {
      return NextResponse.json({ success: false, error: "Please provide details about the collaboration (at least 5 characters)." }, { status: 400 });
    }

    const inquiryRecord = {
      id: `partinq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      organizationName: sanitizeInput(String(organizationName).trim()),
      contactPerson: sanitizeInput(String(contactPerson).trim()),
      email: sanitizeInput(String(email).trim()),
      phone: phone ? sanitizeInput(String(phone).trim()) : "",
      collaborationArea: collaborationArea ? sanitizeInput(String(collaborationArea).trim()) : "General Collaboration",
      message: sanitizeInput(String(message).trim()),
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    const list = getStoredPartnerInquiries();
    list.unshift(inquiryRecord);
    saveStoredPartnerInquiries(list);

    // Send admin notification
    try {
      await sendAdminNotification({
        type: "Partner Collaboration Inquiry",
        subject: `Partnership Inquiry: ${inquiryRecord.organizationName} (${inquiryRecord.contactPerson})`,
        data: {
          organization: inquiryRecord.organizationName,
          contactPerson: inquiryRecord.contactPerson,
          email: inquiryRecord.email,
          phone: inquiryRecord.phone || "Not provided",
          area: inquiryRecord.collaborationArea,
          message: inquiryRecord.message,
          submittedAt: inquiryRecord.submittedAt,
        },
      });
    } catch (notifErr) {
      console.error("[Partner Inquiry API] Notification error:", notifErr);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out to collaborate with Swadeep Shikshan Vikas Sanstha. Our leadership team will connect with you shortly.",
      recordId: inquiryRecord.id,
    });
  } catch (error) {
    console.error("[Partner Inquiry API] Unexpected error:", error);
    return NextResponse.json({ success: false, error: "An unexpected server error occurred." }, { status: 500 });
  }
}

export async function GET() {
  const inquiries = getStoredPartnerInquiries();
  return NextResponse.json({ success: true, inquiries });
}
