import { NextResponse } from "next/server";
import { isValidEmail, sanitizeInput } from "@/lib/utils";
import fs from "fs";
import path from "path";
import { sendAdminNotification } from "@/lib/emailNotifier";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "donations.json");

function getStoredDonations(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) return [];
    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf8");
    return JSON.parse(fileContent) || [];
  } catch {
    return [];
  }
}

function saveStoredDonations(donations: any[]) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE_PATH), { recursive: true });
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(donations, null, 2), "utf8");
  } catch (err) {
    console.error("[Donations API] Error saving file:", err);
  }
}

interface DonationRequestBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  pan?: unknown;
  amount?: unknown;
  utr?: unknown;
  transferMode?: unknown;
  date?: unknown;
  notes?: unknown;
  website?: unknown; // Honeypot field
}

export async function POST(request: Request) {
  try {
    let body: DonationRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    // Honeypot check
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Thank you for supporting Swadeep." },
        { status: 200 }
      );
    }

    const { name, email, phone, pan, amount, utr, transferMode, date, notes } = body;

    // Validate Name
    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Full Name is required." },
        { status: 400 }
      );
    }
    const cleanName = sanitizeInput(name.trim());
    if (cleanName.length < 2 || cleanName.length > 120) {
      return NextResponse.json(
        { success: false, error: "Name must be between 2 and 120 characters." },
        { status: 400 }
      );
    }

    // Validate Email
    if (typeof email !== "string" || !email.trim() || !isValidEmail(email.trim())) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required for 80G receipt dispatch." },
        { status: 400 }
      );
    }
    const cleanEmail = sanitizeInput(email.trim());

    // Validate Phone
    if (typeof phone !== "string" || !phone.trim() || phone.trim().length < 8) {
      return NextResponse.json(
        { success: false, error: "A valid contact phone number is required." },
        { status: 400 }
      );
    }
    const cleanPhone = sanitizeInput(phone.trim());

    // Validate PAN (Mandatory for 80G Indian Income Tax compliance)
    if (typeof pan !== "string" || !pan.trim()) {
      return NextResponse.json(
        { success: false, error: "PAN number is required for 80G tax exemption certificate." },
        { status: 400 }
      );
    }
    const cleanPan = sanitizeInput(pan.trim().toUpperCase());
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(cleanPan)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-character Indian PAN (e.g. ABCDE1234F)." },
        { status: 400 }
      );
    }

    // Validate Amount
    const parsedAmount = Number(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount < 100) {
      return NextResponse.json(
        { success: false, error: "Donation amount must be at least ₹100." },
        { status: 400 }
      );
    }

    // Validate UTR / Transaction Reference
    if (typeof utr !== "string" || !utr.trim()) {
      return NextResponse.json(
        { success: false, error: "Transaction UTR / Reference number is required." },
        { status: 400 }
      );
    }
    const cleanUtr = sanitizeInput(utr.trim());
    if (cleanUtr.length < 4 || cleanUtr.length > 50) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid UTR / Transaction reference number." },
        { status: 400 }
      );
    }

    const cleanMode = typeof transferMode === "string" ? sanitizeInput(transferMode.trim()) : "Bank Transfer";
    const cleanDate = typeof date === "string" && date.trim() ? sanitizeInput(date.trim()) : new Date().toISOString().split("T")[0];
    const cleanNotes = typeof notes === "string" ? sanitizeInput(notes.trim()) : "";

    const donationRecord = {
      id: `don_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      pan: cleanPan,
      amount: parsedAmount,
      utr: cleanUtr,
      transferMode: cleanMode,
      date: cleanDate,
      notes: cleanNotes,
      status: "pending_verification",
      submittedAt: new Date().toISOString(),
    };

    // Save record to data/donations.json
    try {
      const existingDonations = getStoredDonations();
      existingDonations.unshift(donationRecord);
      saveStoredDonations(existingDonations);
    } catch (fsErr) {
      console.error("[Donations API] Error saving to file:", fsErr);
    }

    // Send email notification to swadeepsvs@gmail.com
    try {
      await sendAdminNotification({
        type: "Donation / UTR Submission",
        subject: `₹${donationRecord.amount.toLocaleString("en-IN")} from ${donationRecord.name} (UTR: ${donationRecord.utr})`,
        data: {
          donorName: donationRecord.name,
          email: donationRecord.email,
          phone: donationRecord.phone,
          panCard: donationRecord.pan,
          amountInr: `₹${donationRecord.amount.toLocaleString("en-IN")}`,
          utrReference: donationRecord.utr,
          transferMode: donationRecord.transferMode,
          transferDate: donationRecord.date,
          donorNotes: donationRecord.notes || "None provided",
          status: "Pending Bank Verification & 80G Dispatch",
          submittedAt: donationRecord.submittedAt,
        },
      });
    } catch (notifErr) {
      console.error("[Donations API] Error sending notification:", notifErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Donation details submitted successfully. Our finance team will verify the bank transfer and dispatch your 80G certificate within 2-3 working days.",
        recordId: donationRecord.id,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[Donations API] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again later or contact us directly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const donations = getStoredDonations();
  return NextResponse.json({
    success: true,
    donations,
  });
}

export async function PATCH(request: Request) {
  try {
    const { id, status, notes } = await request.json();
    const donations = getStoredDonations();
    const item = donations.find((d) => d.id === id);
    if (!item) {
      return NextResponse.json({ success: false, error: "Donation record not found." }, { status: 404 });
    }

    if (typeof status === "string") item.status = status;
    if (typeof notes === "string") item.notes = notes;
    item.updatedAt = new Date().toISOString();

    saveStoredDonations(donations);
    return NextResponse.json({ success: true, donation: item });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to update donation record." }, { status: 500 });
  }
}

