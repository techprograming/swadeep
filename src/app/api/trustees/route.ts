import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sanitizeInput } from "@/lib/utils";

const DATA_FILE = path.join(process.cwd(), "data", "trustees.json");

function getTrustees(): Array<any> {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (err) {
    console.error("[Trustees API] Error reading file:", err);
    return [];
  }
}

function saveTrustees(items: Array<any>): boolean {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[Trustees API] Error saving file:", err);
    return false;
  }
}

export async function GET() {
  const trustees = getTrustees();
  return NextResponse.json({ success: true, trustees });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, nameGu, role, roleGu, category, description, image, highlight } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Trustee name is required." },
        { status: 400 }
      );
    }

    const newTrustee = {
      id: `tr-${Date.now()}`,
      name: sanitizeInput(name.trim()),
      nameGu: nameGu ? sanitizeInput(String(nameGu).trim()) : sanitizeInput(name.trim()),
      role: role ? sanitizeInput(String(role).trim()) : "Trustee",
      roleGu: roleGu ? sanitizeInput(String(roleGu).trim()) : "ટ્રસ્ટી",
      category: category ? sanitizeInput(String(category).trim()) : "Trustee",
      description: description ? sanitizeInput(String(description).trim()) : "",
      image: image && typeof image === "string" && image.trim() ? sanitizeInput(image.trim()) : undefined,
      highlight: Boolean(highlight),
    };

    const list = getTrustees();
    list.push(newTrustee);
    saveTrustees(list);

    return NextResponse.json({
      success: true,
      message: "Trustee added successfully.",
      trustee: newTrustee,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add trustee." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing trustee ID." }, { status: 400 });
    }

    let list = getTrustees();
    list = list.filter((t) => t.id !== id);
    saveTrustees(list);

    return NextResponse.json({ success: true, message: "Trustee removed successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete trustee." }, { status: 500 });
  }
}

