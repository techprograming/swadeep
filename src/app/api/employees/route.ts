import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sanitizeInput } from "@/lib/utils";

const DATA_FILE = path.join(process.cwd(), "data", "employees.json");

function getEmployees(): Array<any> {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (err) {
    console.error("[Employees API] Error reading file:", err);
    return [];
  }
}

function saveEmployees(items: Array<any>): boolean {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[Employees API] Error saving file:", err);
    return false;
  }
}

export async function GET() {
  const employees = getEmployees();
  return NextResponse.json({ success: true, employees });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, department, phone, email, bio, image } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Employee/Staff name is required." },
        { status: 400 }
      );
    }

    const newEmp = {
      id: `emp-${Date.now()}`,
      name: sanitizeInput(name.trim()),
      role: role ? sanitizeInput(String(role).trim()) : "Staff Member",
      department: department ? sanitizeInput(String(department).trim()) : "Operations",
      phone: phone ? sanitizeInput(String(phone).trim()) : undefined,
      email: email ? sanitizeInput(String(email).trim()) : undefined,
      bio: bio ? sanitizeInput(String(bio).trim()) : "",
      image: image && typeof image === "string" && image.trim() ? sanitizeInput(image.trim()) : undefined,
    };

    const list = getEmployees();
    list.push(newEmp);
    saveEmployees(list);

    return NextResponse.json({
      success: true,
      message: "Employee added successfully.",
      employee: newEmp,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add employee." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing employee ID." }, { status: 400 });
    }

    let list = getEmployees();
    list = list.filter((e) => e.id !== id);
    saveEmployees(list);

    return NextResponse.json({ success: true, message: "Employee removed successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete employee." }, { status: 500 });
  }
}

