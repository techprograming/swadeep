import { Router, Request, Response } from "express";
import { pool, testConnection, inMemoryFallback } from "../db";
import { requireAdminAuth } from "../middleware/auth";

const router = Router();

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeText(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

/**
 * POST /api/contact - Public contact inquiry submission
 */
router.post("/", async (req: Request, res: Response) => {
  const { name, email, phone, subject, message, website } = req.body;

  // 1. Bot Honeypot Check: Silent drop if hidden field is filled
  if (website && typeof website === "string" && website.trim().length > 0) {
    console.warn("[Contact] Bot honeypot triggered. Silently dropping payload.");
    return res.status(200).json({
      success: true,
      message: "Thank you for contacting Swadeep.",
    });
  }

  // 2. Name validation
  if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
    return res.status(400).json({
      success: false,
      error: "Please enter a valid full name (2 to 100 characters).",
    });
  }

  // 3. Email validation
  if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
    return res.status(400).json({
      success: false,
      error: "Please enter a valid email address.",
    });
  }

  // 4. Message validation
  if (!message || typeof message !== "string" || message.trim().length < 10 || message.trim().length > 2000) {
    return res.status(400).json({
      success: false,
      error: "Message must be between 10 and 2,000 characters.",
    });
  }

  // 5. Optional Phone validation
  let cleanPhone: string | null = null;
  if (phone && typeof phone === "string" && phone.trim()) {
    const trimmed = phone.trim();
    if (!/^[+]?[\d\s-]{8,15}$/.test(trimmed)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid phone number (8 to 15 digits).",
      });
    }
    cleanPhone = sanitizeText(trimmed);
  }

  const cleanName = sanitizeText(name);
  const cleanEmail = sanitizeText(email).toLowerCase();
  const cleanSubject = subject && typeof subject === "string" && subject.trim()
    ? sanitizeText(subject)
    : "General Inquiry";
  const cleanMessage = sanitizeText(message);
  const clientIp = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1";

  try {
    const dbTest = await testConnection();

    if (dbTest.connected) {
      // Parameterized query execution
      const queryText = `
        INSERT INTO inquiries (name, email, phone, subject, message, status, is_read, ip_address)
        VALUES ($1, $2, $3, $4, $5, 'new', false, $6)
        RETURNING id, created_at;
      `;
      const result = await pool.query(queryText, [
        cleanName,
        cleanEmail,
        cleanPhone,
        cleanSubject,
        cleanMessage,
        clientIp.slice(0, 50),
      ]);

      return res.status(200).json({
        success: true,
        message: "Thank you for contacting Swadeep Shikshan Vikas Sanstha. Your inquiry has been received.",
        inquiryId: result.rows[0].id,
      });
    } else {
      // Local fallback mode
      const newEntry = {
        id: inMemoryFallback.inquiries.length + 1,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        subject: cleanSubject,
        message: cleanMessage,
        status: "new",
        is_read: false,
        created_at: new Date().toISOString(),
      };
      inMemoryFallback.inquiries.unshift(newEntry);

      return res.status(200).json({
        success: true,
        message: "Thank you for contacting Swadeep. Your message has been saved successfully.",
        inquiryId: newEntry.id,
      });
    }
  } catch (error: unknown) {
    console.error("[Contact API Error]", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected server error occurred. Please call our office directly.",
    });
  }
});

/**
 * GET /api/contact - Admin list of inquiries
 */
router.get("/", requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const dbTest = await testConnection();

    if (dbTest.connected) {
      const result = await pool.query(
        "SELECT id, name, email, phone, subject, message, status, is_read, created_at FROM inquiries ORDER BY created_at DESC LIMIT 100"
      );
      const countRes = await pool.query(
        "SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE is_read = false) as unread FROM inquiries"
      );

      return res.status(200).json({
        success: true,
        total: parseInt(countRes.rows[0].total, 10),
        unread: parseInt(countRes.rows[0].unread, 10),
        inquiries: result.rows,
      });
    } else {
      return res.status(200).json({
        success: true,
        total: inMemoryFallback.inquiries.length,
        unread: inMemoryFallback.inquiries.filter((i) => !i.is_read).length,
        inquiries: inMemoryFallback.inquiries,
      });
    }
  } catch (error: unknown) {
    console.error("[Get Contact Inquiries Error]", error);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve contact inquiries.",
    });
  }
});

/**
 * PATCH /api/contact/:id - Mark inquiry status
 */
router.patch("/:id", requireAdminAuth, async (req: Request, res: Response) => {
  const idStr = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(String(idStr), 10);
  const { status, is_read } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ success: false, error: "Invalid inquiry ID." });
  }

  try {
    const dbTest = await testConnection();

    if (dbTest.connected) {
      const result = await pool.query(
        `UPDATE inquiries 
         SET status = COALESCE($1, status),
             is_read = COALESCE($2, is_read),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $3
         RETURNING id, status, is_read`,
        [status, is_read, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Inquiry not found." });
      }

      return res.status(200).json({ success: true, inquiry: result.rows[0] });
    } else {
      const item = inMemoryFallback.inquiries.find((i) => i.id === id);
      if (!item) {
        return res.status(404).json({ success: false, error: "Inquiry not found." });
      }
      if (typeof status === "string") item.status = status;
      if (typeof is_read === "boolean") item.is_read = is_read;
      return res.status(200).json({ success: true, inquiry: item });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to update inquiry." });
  }
});

export default router;
