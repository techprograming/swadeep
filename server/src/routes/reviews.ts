import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { pool, testConnection } from "../db";

const router = Router();
const DATA_FILE = path.join(process.cwd(), "data", "reviews.json");

function sanitizeText(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

function getStoredReviews(): Array<any> {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initial: any[] = [];
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("[Reviews Express] Error reading data file:", err);
    return [];
  }
}

function saveStoredReviews(reviews: Array<any>): boolean {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[Reviews Express] Error writing data file:", err);
    return false;
  }
}

// GET /api/reviews
router.get("/", async (req: Request, res: Response) => {
  try {
    const dbTest = await testConnection();
    if (dbTest.connected) {
      try {
        const result = await pool.query(
          "SELECT id, name, role, category, rating, quote, created_at FROM reviews WHERE is_approved = true ORDER BY created_at DESC LIMIT 50;"
        );
        if (result.rows && result.rows.length > 0) {
          return res.status(200).json({ success: true, reviews: result.rows });
        }
      } catch (dbErr) {
        console.warn("[Reviews Express] Database query failed, reading JSON fallback.");
      }
    }

    const reviews = getStoredReviews();
    return res.status(200).json({ success: true, reviews });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to retrieve reviews." });
  }
});

// POST /api/reviews
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, role, quote, message, rating, category, website } = req.body;

    // Honeypot check
    if (website && typeof website === "string" && website.trim().length > 0) {
      return res.status(200).json({ success: true, message: "Thank you for your review." });
    }

    const reviewContent = quote || message;

    if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        error: "Please enter your name (2 to 100 characters).",
      });
    }

    if (!reviewContent || typeof reviewContent !== "string" || reviewContent.trim().length < 5 || reviewContent.trim().length > 1500) {
      return res.status(400).json({
        success: false,
        error: "Please enter your review (5 to 1,500 characters).",
      });
    }

    const numRating = Number(rating) || 5;
    const validRating = Math.min(5, Math.max(1, Math.round(numRating)));

    const cleanName = sanitizeText(name);
    const cleanRole = role && typeof role === "string" && role.trim()
      ? sanitizeText(role.slice(0, 100))
      : "Community Supporter";
    const cleanCategory = category && typeof category === "string" && category.trim()
      ? sanitizeText(category.slice(0, 50))
      : "Community Review";
    const cleanQuote = sanitizeText(reviewContent);

    const newReview = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName,
      role: cleanRole,
      category: cleanCategory,
      rating: validRating,
      quote: cleanQuote,
      created_at: new Date().toISOString(),
    };

    const stored = getStoredReviews();
    stored.unshift(newReview);
    saveStoredReviews(stored);

    try {
      const dbTest = await testConnection();
      if (dbTest.connected) {
        await pool.query(
          `CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            role VARCHAR(150),
            category VARCHAR(100),
            rating INT DEFAULT 5,
            quote TEXT NOT NULL,
            is_approved BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );`
        );
        await pool.query(
          "INSERT INTO reviews (name, role, category, rating, quote, is_approved) VALUES ($1, $2, $3, $4, $5, true);",
          [cleanName, cleanRole, cleanCategory, validRating, cleanQuote]
        );
      }
    } catch (sqlErr) {
      // Ignored if table creation fails in dev
    }

    return res.status(200).json({
      success: true,
      message: "Thank you! Your review has been added and is now visible on the website.",
      review: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred while saving your review.",
    });
  }
});

export default router;

