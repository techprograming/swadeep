import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "./config";
import { testConnection } from "./db";
import healthRoutes from "./routes/health";
import authRoutes from "./routes/auth";
import contactRoutes from "./routes/contact";
import impactRoutes from "./routes/impact";
import reviewsRoutes from "./routes/reviews";

const app = express();

// Security and Request Parsing
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:5000").split(",").map(s => s.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server calls (no origin) and allowlisted origins
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Request logger for development
if (config.nodeEnv === "development") {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[API ${req.method}] ${req.url}`);
    next();
  });
}

// Mount REST API Endpoints
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/impact-metrics", impactRoutes);
app.use("/api/reviews", reviewsRoutes);

// Root informational endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    service: "Swadeep Shikshan Vikas Sanstha — Backend API",
    status: "active",
    documentation: "/api/health",
  });
});

// 404 Fallback Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `API route '${req.method} ${req.originalUrl}' not found.`,
  });
});

// Centralized Safe Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Unhandled API Error] ${err.message}`, err.stack);
  res.status(500).json({
    success: false,
    error: "An internal server error occurred while processing your request.",
  });
});

// Start Server
if (require.main === module) {
  app.listen(config.port, async () => {
    console.log(`====================================================`);
    console.log(`  Swadeep Backend REST API running on port ${config.port}`);
    console.log(`  Environment: ${config.nodeEnv}`);
    console.log(`====================================================`);

    // Probe PostgreSQL connection
    const conn = await testConnection();
    console.log(`[Database Status] ${conn.message}`);
  });
}

export default app;
