import { NextResponse } from "next/server";
import { isValidEmail, sanitizeInput } from "@/lib/utils";
import fs from "fs";
import path from "path";
import { sendAdminNotification } from "@/lib/emailNotifier";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "careers.json");
const UPLOADS_DIR = path.join(process.cwd(), "data", "uploads", "cv");

function getStoredCareers(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) return [];
    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf8");
    return JSON.parse(fileContent) || [];
  } catch {
    return [];
  }
}

function saveStoredCareers(careers: any[]) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE_PATH), { recursive: true });
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(careers, null, 2), "utf8");
  } catch (err) {
    console.error("[Career API] Error saving file:", err);
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Honeypot check
    const website = formData.get("website");
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Application submitted successfully." }, { status: 200 });
    }

    const firstName = formData.get("firstName") as string | null;
    const lastName = formData.get("lastName") as string | null;
    const email = formData.get("email") as string | null;
    const phone = formData.get("phone") as string | null;
    const position = formData.get("position") as string | null;
    const cvFile = formData.get("cvFile") as File | null;

    if (!firstName || !lastName || !firstName.trim() || !lastName.trim()) {
      return NextResponse.json({ success: false, error: "First and Last Name are required." }, { status: 400 });
    }

    if (!email || !isValidEmail(email.trim())) {
      return NextResponse.json({ success: false, error: "A valid email address is required." }, { status: 400 });
    }

    if (!phone || phone.trim().length < 8) {
      return NextResponse.json({ success: false, error: "Contact No. is required." }, { status: 400 });
    }

    if (!position || !position.trim() || position === "Select Position") {
      return NextResponse.json({ success: false, error: "Please select a position to apply for." }, { status: 400 });
    }

    let savedFileName = "";
    if (cvFile && typeof cvFile.size === "number" && cvFile.size > 0) {
      // Validate file size: max 1 MB (1048576 bytes)
      if (cvFile.size > 1048576) {
        return NextResponse.json({ success: false, error: "Max. file size is 1 MB." }, { status: 400 });
      }

      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
      const ext = path.extname(cvFile.name) || ".pdf";
      const safeBase = sanitizeInput(cvFile.name.replace(/[^a-zA-Z0-9.-]/g, "_"));
      savedFileName = `${Date.now()}_${safeBase}`;
      const destPath = path.join(UPLOADS_DIR, savedFileName);

      const arrayBuffer = await cvFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(destPath, buffer);
    } else {
      return NextResponse.json({ success: false, error: "Please upload your CV & Covering Letter (Max. 1 MB)." }, { status: 400 });
    }

    const careerRecord = {
      id: `car_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      firstName: sanitizeInput(firstName.trim()),
      lastName: sanitizeInput(lastName.trim()),
      fullName: `${sanitizeInput(firstName.trim())} ${sanitizeInput(lastName.trim())}`,
      email: sanitizeInput(email.trim()),
      phone: sanitizeInput(phone.trim()),
      position: sanitizeInput(position.trim()),
      cvFileName: savedFileName,
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    const list = getStoredCareers();
    list.unshift(careerRecord);
    saveStoredCareers(list);

    // Send admin notification
    try {
      await sendAdminNotification({
        type: "Career Job Application",
        subject: `Job Application: ${careerRecord.position} — ${careerRecord.fullName}`,
        data: {
          applicantName: careerRecord.fullName,
          position: careerRecord.position,
          email: careerRecord.email,
          phone: careerRecord.phone,
          cvFile: savedFileName,
          submittedAt: careerRecord.submittedAt,
        },
      });
    } catch (notifErr) {
      console.error("[Career API] Notification error:", notifErr);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for applying to team Swadeep! Your application and CV have been received successfully.",
      recordId: careerRecord.id,
    });
  } catch (error) {
    console.error("[Career API] Unexpected error:", error);
    return NextResponse.json({ success: false, error: "An unexpected server error occurred." }, { status: 500 });
  }
}

export async function GET() {
  const careers = getStoredCareers();
  return NextResponse.json({ success: true, careers });
}
