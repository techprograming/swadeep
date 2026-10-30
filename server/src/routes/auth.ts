import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool, testConnection } from "../db";
import { config } from "../config";
import { requireAdminAuth, AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: "Username and password are required.",
    });
  }

  try {
    const dbTest = await testConnection();

    if (dbTest.connected) {
      // Query PostgreSQL
      const userRes = await pool.query(
        "SELECT id, username, password_hash, role FROM admin_users WHERE username = $1",
        [username.trim()]
      );

      if (userRes.rows.length === 0) {
        return res.status(401).json({
          success: false,
          error: "Invalid username or password.",
        });
      }

      const user = userRes.rows[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: "Invalid username or password.",
        });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        config.jwtSecret,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        success: true,
        message: "Authentication successful.",
        token,
        user: { id: user.id, username: user.username, role: user.role },
      });
    } else {
      // Offline / Fallback dev authentication
      if (
        username === config.adminDefault.username &&
        password === config.adminDefault.password
      ) {
        const token = jwt.sign(
          { id: 1, username: config.adminDefault.username, role: "admin" },
          config.jwtSecret,
          { expiresIn: "24h" }
        );

        return res.status(200).json({
          success: true,
          message: "Authentication successful (Local fallback mode).",
          token,
          user: { id: 1, username: config.adminDefault.username, role: "admin" },
        });
      }

      return res.status(401).json({
        success: false,
        error: "Invalid username or password.",
      });
    }
  } catch (error: unknown) {
    console.error("[Auth API Error]", error);
    return res.status(500).json({
      success: false,
      error: "Authentication service error. Please try again later.",
    });
  }
});

router.get("/me", requireAdminAuth, (req: AuthRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;
