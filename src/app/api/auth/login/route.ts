import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool, testConnection } from "../../../../../server/src/db";
import { config } from "../../../../../server/src/config";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required." },
        { status: 400 }
      );
    }

    const cleanUsername = String(username).trim();
    const cleanPassword = String(password);

    const dbTest = await testConnection();

    if (dbTest.connected) {
      const userRes = await pool.query(
        "SELECT id, username, password_hash, role FROM admin_users WHERE username = $1",
        [cleanUsername]
      );

      if (userRes.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: "Invalid username or password." },
          { status: 401 }
        );
      }

      const user = userRes.rows[0];
      const isMatch = await bcrypt.compare(cleanPassword, user.password_hash);

      if (!isMatch) {
        return NextResponse.json(
          { success: false, error: "Invalid username or password." },
          { status: 401 }
        );
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        config.jwtSecret,
        { expiresIn: "24h" }
      );

      return NextResponse.json({
        success: true,
        token,
        user: { id: user.id, username: user.username, role: user.role },
      });
    } else {
      // Offline fallback authentication with secure check against adminDefault
      if (
        cleanUsername === config.adminDefault.username &&
        cleanPassword === config.adminDefault.password
      ) {
        const token = jwt.sign(
          { id: 1, username: config.adminDefault.username, role: "admin" },
          config.jwtSecret,
          { expiresIn: "24h" }
        );

        return NextResponse.json({
          success: true,
          token,
          user: { id: 1, username: config.adminDefault.username, role: "admin" },
          isFallback: true,
        });
      }

      return NextResponse.json(
        { success: false, error: "Invalid username or password." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("[Next API Auth Login Error]", error);
    return NextResponse.json(
      { success: false, error: "Server authentication error." },
      { status: 500 }
    );
  }
}
