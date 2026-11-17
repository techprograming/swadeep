import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { config } from "../../../../../server/src/config";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Employee ID and password are required." },
        { status: 400 }
      );
    }

    const cleanUsername = String(username).trim();
    const cleanPassword = String(password);

    const expectedUsername = process.env.EMPLOYEE_USERNAME || config.employeeDefault?.username || "swem";
    const expectedPassword = process.env.EMPLOYEE_PASSWORD || config.employeeDefault?.password || "emp@05";

    if (cleanUsername === expectedUsername && cleanPassword === expectedPassword) {
      const token = jwt.sign(
        { id: "emp-auth", username: cleanUsername, role: "employee" },
        config.jwtSecret,
        { expiresIn: "24h" }
      );

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: "emp-auth",
          username: cleanUsername,
          role: "employee",
          name: "Swadeep Staff Member",
        },
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid Employee ID or password." },
      { status: 401 }
    );
  } catch (error) {
    console.error("[Employee Auth API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication service error. Please try again." },
      { status: 500 }
    );
  }
}

