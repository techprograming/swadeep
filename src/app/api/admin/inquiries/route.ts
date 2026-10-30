import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { pool, testConnection, inMemoryFallback } from "../../../../../server/src/db";
import { config } from "../../../../../server/src/config";

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
      return NextResponse.json({
        success: true,
        inquiries: inMemoryFallback.inquiries,
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
      const item = inMemoryFallback.inquiries.find((i) => i.id === id);
      if (item) {
        if (typeof status === "string") item.status = status;
        if (typeof is_read === "boolean") item.is_read = is_read;
        return NextResponse.json({ success: true, inquiry: item });
      }
      return NextResponse.json({ success: false, error: "Inquiry not found." }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error updating inquiry." }, { status: 500 });
  }
}
