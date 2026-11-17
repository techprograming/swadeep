import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sanitizeInput } from "@/lib/utils";

const DATA_FILE = path.join(process.cwd(), "data", "field_logs.json");

function getLogs(): Array<any> {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (err) {
    console.error("[Field Logs API] Error reading file:", err);
    return [];
  }
}

function saveLogs(items: Array<any>): boolean {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[Field Logs API] Error saving file:", err);
    return false;
  }
}

export async function GET() {
  const logs = getLogs();
  return NextResponse.json({ success: true, logs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { staffName, village, date, activityType, beneficiaries, notes } = body;

    if (!staffName || !village || !activityType) {
      return NextResponse.json(
        { success: false, error: "Staff name, village/location, and activity type are required." },
        { status: 400 }
      );
    }

    const newLog = {
      id: `log-${Date.now()}`,
      staffName: sanitizeInput(String(staffName).trim()),
      village: sanitizeInput(String(village).trim()),
      date: date ? sanitizeInput(String(date).trim()) : new Date().toISOString().split("T")[0],
      activityType: sanitizeInput(String(activityType).trim()),
      beneficiaries: Number(beneficiaries) || 0,
      notes: notes ? sanitizeInput(String(notes).trim()) : "",
    };

    const list = getLogs();
    list.unshift(newLog);
    saveLogs(list);

    return NextResponse.json({
      success: true,
      message: "Daily field log saved successfully.",
      log: newLog,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to record field log." },
      { status: 500 }
    );
  }
}

