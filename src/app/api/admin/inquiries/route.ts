import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { pool, testConnection, inMemoryFallback } from "../../../../../server/src/db";
import { config } from "../../../../../server/src/config";
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

function saveInquiriesToFile(inquiries: any[]) {
  try {
    fs.mkdirSync(path.dirname(INQUIRIES_FILE), { recursive: true });
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf8");
  } catch (err) {
    console.error("[Admin Inquiries] Error saving inquiries to file:", err);
  }
}

function authenticateAdmin(request: Request) {
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) return false;
  try {
    jwt.verify(auth.split(" ")[1], config.jwtSecret);
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  if (!authenticateAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const dbTest = await testConnection();
    if (dbTest.connected) {
      const res = await pool.query(
        "SELECT id, name, email, phone, subject, message, status, is_read, created_at FROM inquiries ORDER BY created_at DESC LIMIT 100"
      );
      return NextResponse.json({ success: true, inquiries: res.rows, isConnected: true });
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
        isConnected: false,
      });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error fetching inquiries." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!authenticateAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id, status, is_read } = await request.json();
    const dbTest = await testConnection();

    if (dbTest.connected) {
      const res = await pool.query(
        `UPDATE inquiries
         SET status = COALESCE($1, status),
             is_read = COALESCE($2, is_read),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $3
         RETURNING id, status, is_read`,
        [status, is_read, id]
      );
      return NextResponse.json({ success: true, inquiry: res.rows[0] });
    } else {
      const fileInquiries = getInquiriesFromFile();
      const fileItem = fileInquiries.find((i) => i.id === id);
      if (fileItem) {
        if (typeof status === "string") fileItem.status = status;
        if (typeof is_read === "boolean") fileItem.is_read = is_read;
        saveInquiriesToFile(fileInquiries);
      }

      const item = inMemoryFallback.inquiries.find((i) => i.id === id);
      if (item) {
        if (typeof status === "string") item.status = status;
        if (typeof is_read === "boolean") item.is_read = is_read;
        return NextResponse.json({ success: true, inquiry: item });
      }

      if (fileItem) {
        return NextResponse.json({ success: true, inquiry: fileItem });
      }

      return NextResponse.json({ success: false, error: "Inquiry not found." }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error updating inquiry." }, { status: 500 });
  }
}
