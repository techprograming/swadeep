import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sanitizeInput } from "@/lib/utils";
import { VERIFIED_REPORTS } from "@/lib/reportsData";

const DATA_FILE = path.join(process.cwd(), "data", "reports.json");

function getReports(): Array<any> {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
    return VERIFIED_REPORTS;
  } catch (err) {
    console.error("[Reports API] Error reading file, falling back to static verified data:", err);
    return VERIFIED_REPORTS;
  }
}

function saveReports(items: Array<any>): boolean {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[Reports API] Error saving file:", err);
    return false;
  }
}

export async function GET() {
  const reports = getReports();
  return NextResponse.json({ success: true, reports });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, titleGu, category, year, description, fileUrl } = body;

    if (!title || typeof title !== "string" || title.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Report title is required." },
        { status: 400 }
      );
    }

    const newReport = {
      id: `rep-${Date.now()}`,
      title: sanitizeInput(title.trim()),
      
      category: category && ["Annual Report", "Project Report", "Audit Report", "FC Accounts"].includes(category)
        ? category
        : "Annual Report",
      year: year ? sanitizeInput(String(year).trim()) : "2024-2025",
      description: description ? sanitizeInput(String(description).trim()) : "",
      fileUrl: fileUrl && typeof fileUrl === "string" && fileUrl.trim()
        ? sanitizeInput(fileUrl.trim())
        : "/contact",
      status: "published",
      created_at: new Date().toISOString(),
    };

    const list = getReports();
    list.unshift(newReport);
    saveReports(list);

    return NextResponse.json({
      success: true,
      message: "Report published successfully.",
      report: newReport,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to publish report." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing report ID." }, { status: 400 });
    }

    let list = getReports();
    list = list.filter((r) => r.id !== id);
    saveReports(list);

    return NextResponse.json({ success: true, message: "Report removed successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete report." }, { status: 500 });
  }
}

