import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export const NOTIFICATION_RECIPIENT = "swadeepsvs@gmail.com";
const NOTIFICATIONS_LOG_FILE = path.join(process.cwd(), "data", "email_notifications.json");
const CONFIG_FILE = path.join(process.cwd(), "data", "email_config.json");

export interface NotificationPayload {
  type: "Contact Inquiry" | "Donation / UTR Submission" | "Public Review" | string;
  subject: string;
  data: Record<string, any>;
}

export interface EmailConfig {
  smtpUser: string;
  smtpPass: string;
  smtpHost: string;
  smtpPort: number;
  recipient: string;
  web3formsKey?: string;
  isConfigured: boolean;
}

/**
 * Reads email and SMTP configuration from environment variables or data/email_config.json
 */
export function getEmailConfig(): EmailConfig {
  let fileConfig: Record<string, any> = {};
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const content = fs.readFileSync(CONFIG_FILE, "utf8");
      fileConfig = JSON.parse(content);
    }
  } catch {
    fileConfig = {};
  }

  const smtpUser =
    process.env.SMTP_USER ||
    process.env.EMAIL_USER ||
    process.env.GMAIL_USER ||
    fileConfig.smtpUser ||
    "swadeepsvs@gmail.com";

  const rawPass =
    process.env.SMTP_PASS ||
    process.env.EMAIL_PASS ||
    process.env.GMAIL_APP_PASSWORD ||
    fileConfig.smtpPass ||
    "";

  // Clean whitespace/spaces that Google App Passwords often contain
  const smtpPass = rawPass ? String(rawPass).replace(/\s+/g, "") : "";

  const smtpHost =
    process.env.SMTP_HOST ||
    process.env.EMAIL_HOST ||
    fileConfig.smtpHost ||
    "smtp.gmail.com";

  const smtpPort = parseInt(
    String(
      process.env.SMTP_PORT ||
      process.env.EMAIL_PORT ||
      fileConfig.smtpPort ||
      "465"
    ),
    10
  );

  const recipient =
    process.env.NOTIFICATION_RECIPIENT ||
    fileConfig.recipient ||
    NOTIFICATION_RECIPIENT;

  const web3formsKey =
    process.env.WEB3FORMS_ACCESS_KEY ||
    fileConfig.web3formsKey ||
    "";

  return {
    smtpUser,
    smtpPass,
    smtpHost,
    smtpPort,
    recipient,
    web3formsKey,
    isConfigured: Boolean(smtpPass || web3formsKey),
  };
}

/**
 * Saves email configuration to data/email_config.json for runtime persistence
 */
export function saveEmailConfig(newConfig: Partial<EmailConfig>) {
  try {
    fs.mkdirSync(path.dirname(CONFIG_FILE), { recursive: true });
    let current: Record<string, any> = {};
    if (fs.existsSync(CONFIG_FILE)) {
      try {
        current = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
      } catch {
        current = {};
      }
    }
    const merged = { ...current, ...newConfig };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(merged, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[EmailNotifier] Error saving email config:", err);
    return false;
  }
}

/**
 * Persistently logs all form notification dispatches to data/email_notifications.json
 */
export function logNotificationToFile(logEntry: any) {
  try {
    fs.mkdirSync(path.dirname(NOTIFICATIONS_LOG_FILE), { recursive: true });
    let existingLogs: any[] = [];
    if (fs.existsSync(NOTIFICATIONS_LOG_FILE)) {
      try {
        const fileContent = fs.readFileSync(NOTIFICATIONS_LOG_FILE, "utf8");
        existingLogs = JSON.parse(fileContent);
      } catch {
        existingLogs = [];
      }
    }
    existingLogs.unshift(logEntry);
    fs.writeFileSync(NOTIFICATIONS_LOG_FILE, JSON.stringify(existingLogs, null, 2), "utf8");
  } catch (err) {
    console.error("[EmailNotifier] Error writing to notifications log:", err);
  }
}

/**
 * Returns logged notifications
 */
export function getNotificationLogs(limit = 50) {
  try {
    if (fs.existsSync(NOTIFICATIONS_LOG_FILE)) {
      const fileContent = fs.readFileSync(NOTIFICATIONS_LOG_FILE, "utf8");
      const list = JSON.parse(fileContent);
      return Array.isArray(list) ? list.slice(0, limit) : [];
    }
  } catch {
    // fallback
  }
  return [];
}

/**
 * Sends an email notification to swadeepsvs@gmail.com whenever any user submits a form.
 */
export async function sendAdminNotification(payload: NotificationPayload) {
  const timestamp = new Date().toISOString();
  const notifId = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  const config = getEmailConfig();

  // Construct text summary
  let textBody = `Swadeep Shikshan Vikas Sanstha — Website Notification\n`;
  textBody += `Form Type: ${payload.type}\n`;
  textBody += `Date: ${timestamp}\n`;
  textBody += `--------------------------------------------------\n`;
  for (const [key, value] of Object.entries(payload.data)) {
    if (value !== undefined && value !== null && value !== "") {
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      textBody += `${formattedKey}: ${value}\n`;
    }
  }
  textBody += `--------------------------------------------------\n`;
  textBody += `View all submissions anytime on the Admin Dashboard: https://swadeepngo.vercel.app/admin\n`;

  // Construct HTML summary
  const rows = Object.entries(payload.data)
    .filter(([_, val]) => val !== undefined && val !== null && val !== "")
    .map(([key, val]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      return `<tr>
        <td style="padding: 10px 14px; border: 1px solid #e5e7eb; font-weight: bold; color: #0B3025; background-color: #FBF8F3; width: 35%;">${formattedKey}</td>
        <td style="padding: 10px 14px; border: 1px solid #e5e7eb; color: #1f2937; line-height: 1.5;">${String(val)}</td>
      </tr>`;
    })
    .join("");

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #0B3025; border-radius: 12px; background-color: #ffffff;">
      <div style="background-color: #0B3025; color: #ffffff; padding: 18px 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 700;">Swadeep Shikshan Vikas Sanstha</h2>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #F47B2A; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">New Website Submission — ${payload.type}</p>
      </div>
      <div style="padding: 24px 0;">
        <p style="font-size: 14px; color: #374151; margin-top: 0;">A new entry was submitted on the official website:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px;">
          ${rows}
        </table>
      </div>
      <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; font-size: 12px; color: #6b7280; text-align: center; line-height: 1.6;">
        Sent to official admin: <strong>${config.recipient}</strong><br/>
        You can also manage this record directly from the <a href="https://swadeepngo.vercel.app/admin" style="color: #0B3025; font-weight: bold;">Admin Portal</a>.
      </div>
    </div>
  `;

  const logRecord: Record<string, any> = {
    id: notifId,
    recipient: config.recipient,
    type: payload.type,
    subject: payload.subject,
    timestamp,
    data: payload.data,
    status: "recorded",
  };

  // 1. If SMTP Password / Gmail App Password is configured, send via SMTP
  if (config.smtpPass) {
    try {
      const isGmail = config.smtpHost.includes("gmail") || config.smtpUser.includes("gmail");
      const transporter = nodemailer.createTransport(
        isGmail
          ? {
              service: "gmail",
              auth: {
                user: config.smtpUser,
                pass: config.smtpPass,
              },
            }
          : {
              host: config.smtpHost,
              port: config.smtpPort,
              secure: config.smtpPort === 465,
              auth: {
                user: config.smtpUser,
                pass: config.smtpPass,
              },
            }
      );

      await transporter.sendMail({
        from: `"Swadeep Website" <${config.smtpUser}>`,
        to: config.recipient,
        subject: `[Swadeep ${payload.type}] ${payload.subject}`,
        text: textBody,
        html: htmlBody,
      });

      logRecord.status = "delivered";
      logRecord.deliveredAt = new Date().toISOString();
      console.log(`[EmailNotifier] Successfully emailed notification to ${config.recipient}`);
    } catch (mailErr: any) {
      console.warn(`[EmailNotifier] SMTP delivery error:`, mailErr?.message || mailErr);
      logRecord.status = "smtp_delivery_failed";
      logRecord.error = mailErr?.message || "Unknown SMTP error";
    }
  }

  // 2. If Web3Forms fallback is configured and SMTP wasn't used or failed
  if (config.web3formsKey && logRecord.status !== "delivered") {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: config.web3formsKey,
          subject: `[Swadeep ${payload.type}] ${payload.subject}`,
          from_name: "Swadeep Website Alerts",
          ...payload.data,
        }),
      });
      if (res.ok) {
        logRecord.status = "delivered";
        logRecord.provider = "web3forms";
      }
    } catch (w3Err: any) {
      console.warn("[EmailNotifier] Web3Forms delivery error:", w3Err?.message || w3Err);
    }
  }

  // 3. If no delivery credentials configured
  if (!config.smtpPass && !config.web3formsKey) {
    logRecord.status = "smtp_credentials_pending";
    logRecord.note = "Credentials pending. Add Gmail App Password to send outbound emails.";
  }

  logNotificationToFile(logRecord);
  return logRecord;
}
