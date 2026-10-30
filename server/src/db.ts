import { Pool, PoolConfig, QueryResult, QueryResultRow } from "pg";
import { config } from "./config";

// Setup PostgreSQL pool options
const poolConfig: PoolConfig = config.database.connectionString
  ? { connectionString: config.database.connectionString }
  : {
      host: config.database.host,
      port: config.database.port,
      database: config.database.database,
      user: config.database.user,
      password: config.database.password,
      max: config.database.max,
      idleTimeoutMillis: config.database.idleTimeoutMillis,
      connectionTimeoutMillis: config.database.connectionTimeoutMillis,
    };

export const pool = new Pool(poolConfig);

let isDbConnected = false;
let dbLastError: string | null = null;

// Handle pool errors cleanly without crashing process
pool.on("error", (err) => {
  console.error("[PostgreSQL Pool Error]", err.message);
  isDbConnected = false;
  dbLastError = err.message;
});

/**
 * Check and test connection to PostgreSQL database
 */
export async function testConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    const res = await pool.query("SELECT NOW() as current_time, current_database() as db_name;");
    isDbConnected = true;
    dbLastError = null;
    return {
      connected: true,
      message: `Connected to PostgreSQL database '${res.rows[0].db_name}' at ${res.rows[0].current_time}`,
    };
  } catch (error: unknown) {
    isDbConnected = false;
    const msg = error instanceof Error ? error.message : "Unknown database connection error";
    dbLastError = msg;
    return {
      connected: false,
      message: `PostgreSQL connection unavailable (${msg}). Ensure PostgreSQL service is running on ${config.database.host}:${config.database.port}.`,
    };
  }
}

/**
 * Execute a parameterized query with safe error logging
 */
export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    if (config.nodeEnv === "development") {
      console.log(`[SQL Query] (${duration}ms) ${text.slice(0, 80)}...`);
    }
    isDbConnected = true;
    return res;
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error(`[SQL Error] Executing: ${text.slice(0, 100)}`, errMsg);
    throw error;
  }
}

export function getDatabaseStatus() {
  return {
    connected: isDbConnected,
    host: config.database.host,
    port: config.database.port,
    database: config.database.database,
    lastError: dbLastError,
  };
}

// In-memory fallback repository for local dev when PostgreSQL service is not yet started
export const inMemoryFallback = {
  inquiries: [] as Array<{
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    status: string;
    is_read: boolean;
    created_at: string;
  }>,
  metrics: [
    { key: "children", value: "60,000+", label_en: "Children Benefited", label_gu: "લાભાર્થી બાળકો" },
    { key: "villages", value: "200+", label_en: "Villages Reached", label_gu: "સહાયક ગામડાંઓ" },
    { key: "icds", value: "277", label_en: "ICDS Centres Supported", label_gu: "આંગણવાડી કેન્દ્રો" },
    { key: "solar", value: "1,050", label_en: "Solar Street Lights", label_gu: "સોલાર લાઇટ્સ" },
    { key: "fishermen", value: "500+", label_en: "Fishermen Supported", label_gu: "માછીમારો" },
    { key: "dental", value: "13,000", label_en: "Dental Health", label_gu: "દાંત આરોગ્ય" },
  ],
};
