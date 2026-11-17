import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sanitizeInput } from "@/lib/utils";

const DATA_FILE = path.join(process.cwd(), "data", "partners.json");

function getPartners(): Array<any> {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (err) {
    console.error("[Partners API] Error reading file:", err);
    return [];
  }
}

function savePartners(items: Array<any>): boolean {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[Partners API] Error saving file:", err);
    return false;
  }
}

export async function GET() {
  const partners = getPartners();
  return NextResponse.json({ success: true, partners });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, nameGu, shortName, category, role, roleGu, description, descriptionGu, logo } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Partner name is required." },
        { status: 400 }
      );
    }

    const newPartner = {
      id: `part-${Date.now()}`,
      name: sanitizeInput(name.trim()),
      nameGu: nameGu ? sanitizeInput(String(nameGu).trim()) : undefined,
      shortName: shortName ? sanitizeInput(String(shortName).trim()) : undefined,
      category: category ? sanitizeInput(String(category).trim()) : "Corporate CSR Partner",
      role: role ? sanitizeInput(String(role).trim()) : "CSR & Community Development Partner",
      roleGu: roleGu ? sanitizeInput(String(roleGu).trim()) : undefined,
      description: description ? sanitizeInput(String(description).trim()) : undefined,
      descriptionGu: descriptionGu ? sanitizeInput(String(descriptionGu).trim()) : undefined,
      logo: logo && typeof logo === "string" && logo.trim() ? sanitizeInput(logo.trim()) : "/images/partners/icds-gujarat.png",
    };

    const list = getPartners();
    list.push(newPartner);
    savePartners(list);

    return NextResponse.json({
      success: true,
      message: "Partner added successfully.",
      partner: newPartner,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add partner." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing partner ID." }, { status: 400 });
    }

    let list = getPartners();
    list = list.filter((p) => p.id !== id);
    savePartners(list);

    return NextResponse.json({ success: true, message: "Partner removed successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete partner." }, { status: 500 });
  }
}

