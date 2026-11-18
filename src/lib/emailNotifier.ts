import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export const NOTIFICATION_RECIPIENT = "swadeepsvs@gmail.com";
const NOTIFICATIONS_LOG_FILE = path.join(process.cwd(), "data", "email_notifications.json");

export interface NotificationPayload {
  type: "Contact Inquiry" | "Donation / UTR Submission" | "Public Review" | "Field Log" | string;
  subject: string;
  data: Record<string, any>;
}

/**
 * Persistently logs all form notification dispatches to data/email_notifications.json
 */
function logNotificationToFile(logEntry: any) {
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
 * Sends an email notification to swadeepsvs@gmail.com whenever any user submits a form.
 */
export async function sendAdminNotification(payload: NotificationPayload) {
  const timestamp = new Date().toISOString();
  const notifId = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

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
  textBody += `This is an automated notification from https://www.swadeep.org`;

  // Construct HTML summary
  const rows = Object.entries(payload.data)
    .filter(([_, val]) => val !== undefined && val !== null && val !== "")
    .map(([key, val]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      return `<tr>
        <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; color: #0B3025; background-color: #FBF8F3;">${formattedKey}</td>
        <td style="padding: 8px 12px; border: 1px solid #e5e7eb; color: #1f2937;">${String(val)}</td>
      </tr>`;
    })
    .join("");

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #0B3025; border-radius: 12px;">
      <div style="background-color: #0B3025; color: #ffffff; padding: 16px; border-radius: 8px 8px 0 0; text-align: center;">
        <h2 style="margin: 0; font-size: 20px;">Swadeep Shikshan Vikas Sanstha</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #F47B2A; font-weight: bold;">New Website Submission — ${payload.type}</p>
      </div>
      <div style="padding: 20px 0;">
        <p style="font-size: 14px; color: #374151;">A new entry was submitted on the website with the following details:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px;">
          ${rows}
        </table>
      </div>
      <div style="border-top: 1px solid #e5e7eb; padding-top: 12px; font-size: 12px; color: #6b7280; text-align: center;">
        Sent to official admin: <strong>${NOTIFICATION_RECIPIENT}</strong> | Swadeep NGO Website
      </div>
    </div>
  `;

  const logRecord = {
    id: notifId,
    recipient: NOTIFICATION_RECIPIENT,
    type: payload.type,
    subject: payload.subject,
    timestamp,
    data: payload.data,
    status: "recorded",
  };

  // Dispatch email if SMTP configured
  const smtpHost = process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const smtpPort = parseInt(process.env.SMTP_PORT || process.env.EMAIL_PORT || "587", 10);

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Swadeep Website Alerts" <${smtpUser}>`,
        to: NOTIFICATION_RECIPIENT,
        subject: `[Swadeep ${payload.type}] ${payload.subject}`,
        text: textBody,
        html: htmlBody,
      });

      logRecord.status = "delivered";
      console.log(`[EmailNotifier] Successfully emailed notification to ${NOTIFICATION_RECIPIENT}`);
    } catch (mailErr) {
      console.warn(`[EmailNotifier] SMTP delivery failed, logged locally:`, mailErr);
      logRecord.status = "smtp_delivery_failed";
    }
  } else {
    // Graceful recording mode when SMTP credentials are pending in deployment environment
    console.log(`[EmailNotifier] Recorded notification for ${NOTIFICATION_RECIPIENT} (Type: ${payload.type})`);
  }

  logNotificationToFile(logRecord);
  return logRecord;
}
