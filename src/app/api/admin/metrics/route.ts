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

export async function GET() {
  try {
    const dbTest = await testConnection();
    if (dbTest.connected) {
      const res = await pool.query(
        "SELECT metric_key, label_en, label_gu, metric_value, subtext_en, subtext_gu, reporting_period, updated_at FROM impact_metrics ORDER BY id ASC"
      );
      return NextResponse.json({ success: true, metrics: res.rows, isConnected: true });
    } else {
      return NextResponse.json({ success: true, metrics: inMemoryFallback.metrics, isConnected: false });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load metrics." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!authenticateAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { metric_key, metric_value } = await request.json();
    if (!metric_key || !metric_value) {
      return NextResponse.json({ success: false, error: "Key and value required." }, { status: 400 });
    }

    const dbTest = await testConnection();
    if (dbTest.connected) {
      const res = await pool.query(
        "UPDATE impact_metrics SET metric_value = $1, updated_at = CURRENT_TIMESTAMP WHERE metric_key = $2 RETURNING *",
        [metric_value, metric_key]
      );
      return NextResponse.json({ success: true, metric: res.rows[0] });
    } else {
      const item = inMemoryFallback.metrics.find((m) => m.key === metric_key);
      if (item) {
        item.value = metric_value;
        return NextResponse.json({ success: true, metric: item });
      }
      return NextResponse.json({ success: false, error: "Metric not found." }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error updating metric." }, { status: 500 });
  }
}
