import { NextRequest, NextResponse } from "next/server";
import {
  getEmailConfig,
  saveEmailConfig,
  getNotificationLogs,
  sendAdminNotification,
} from "@/lib/emailNotifier";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "swadeep-secret-key-2026-bhavnagar";

function verifyAdmin(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded && decoded.role === "admin";
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = getEmailConfig();
  const logs = getNotificationLogs(20);

  return NextResponse.json({
    recipient: config.recipient,
    smtpUser: config.smtpUser,
    smtpHost: config.smtpHost,
    smtpPort: config.smtpPort,
    isConfigured: config.isConfigured,
    hasSmtpPass: Boolean(config.smtpPass),
    hasWeb3Forms: Boolean(config.web3formsKey),
    totalLogged: logs.length,
    recentNotifications: logs,
  });
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // 1. If action is "test", send a test email
    if (body.action === "test") {
      const config = getEmailConfig();
      if (!config.isConfigured && !body.smtpPass) {
        return NextResponse.json(
          {
            success: false,
            error:
              "SMTP is not configured yet. Please enter your Gmail App Password below and click 'Save & Send Test Email'.",
          },
          { status: 400 }
        );
      }

      // If temporary pass passed in test request, save it first
      if (body.smtpPass) {
        saveEmailConfig({
          smtpUser: body.smtpUser || config.smtpUser,
          smtpPass: body.smtpPass,
          smtpHost: body.smtpHost || config.smtpHost,
          smtpPort: body.smtpPort || config.smtpPort,
          recipient: body.recipient || config.recipient,
          web3formsKey: body.web3formsKey || config.web3formsKey,
        });
      }

      const testResult = await sendAdminNotification({
        type: "Test Verification",
        subject: "Swadeep Email Alerts System Verified",
        data: {
          testTime: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          recipient: config.recipient,
          senderService: "Google Gmail SMTP (smtp.gmail.com)",
          status: "Verified & Connected Successfully",
          note: "This confirms that all donor submissions, contact inquiries, and website forms will deliver instantly to swadeepsvs@gmail.com.",
        },
      });

      if (testResult.status === "delivered") {
        return NextResponse.json({
          success: true,
          message: `Success! Test email delivered to ${config.recipient}. Check your inbox.`,
          testResult,
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            error:
              testResult.error ||
              "Could not deliver email. Please check that your 16-character Google App Password is correct.",
            testResult,
          },
          { status: 400 }
        );
      }
    }

    // 2. Otherwise update configuration
    saveEmailConfig({
      smtpUser: body.smtpUser,
      smtpPass: body.smtpPass,
      smtpHost: body.smtpHost,
      smtpPort: body.smtpPort,
      recipient: body.recipient,
      web3formsKey: body.web3formsKey,
    });

    return NextResponse.json({
      success: true,
      message: "Email configuration saved successfully.",
      config: getEmailConfig(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update email settings" },
      { status: 500 }
    );
  }
}
