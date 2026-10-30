import dotenv from "dotenv";
import path from "path";

// Load .env or .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const config = {
  port: parseInt(process.env.BACKEND_PORT || process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "swadeep-insecure-dev-secret-change-in-production-2026",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "24h",

  // PostgreSQL Configuration (standard pg env vars supported)
  database: {
    connectionString: process.env.DATABASE_URL,
    host: process.env.PGHOST || process.env.DB_HOST || "localhost",
    port: parseInt(process.env.PGPORT || process.env.DB_PORT || "5432", 10),
    database: process.env.PGDATABASE || process.env.DB_NAME || "swadeep_db",
    user: process.env.PGUSER || process.env.DB_USER || "postgres",
    password: process.env.PGPASSWORD || process.env.DB_PASSWORD || "postgres",
    max: parseInt(process.env.DB_POOL_MAX || "10", 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 4000,
  },

  // Security & Limits
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || "60000", 10), // 1 minute
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX || "30", 10),
  },

  // Admin Initial Seed Credentials
  adminDefault: {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "Swadeep@Admin2026!",
  },
};
