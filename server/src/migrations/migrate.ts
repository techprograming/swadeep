import fs from "fs";
import path from "path";
import { pool, testConnection } from "../db";
import { config } from "../config";

export async function runMigrations(): Promise<{ success: boolean; message: string }> {
  console.log(`[Migrations] Testing connection to PostgreSQL on ${config.database.host}:${config.database.port}...`);
  const status = await testConnection();

  if (!status.connected) {
    const advice =
      `\n[Notice] PostgreSQL is not currently running or database '${config.database.database}' is not yet created.` +
      `\nTo setup PostgreSQL locally:` +
      `\n  1. Start PostgreSQL service: net start postgresql-x64-16 (or your version)` +
      `\n  2. Or using pg_ctl: & "D:\\postgrsql\\pgsql\\bin\\pg_ctl.exe" -D "<data_dir>" start` +
      `\n  3. Create database: & "D:\\postgrsql\\pgsql\\bin\\createdb.exe" -U postgres ${config.database.database}` +
      `\n  4. Re-run: npm run db:migrate\n`;
    console.warn(advice);
    return { success: false, message: status.message };
  }

  try {
    const migrationFile = path.resolve(__dirname, "001_initial_schema.sql");
    const sql = fs.readFileSync(migrationFile, "utf-8");

    console.log(`[Migrations] Executing 001_initial_schema.sql...`);
    await pool.query(sql);
    console.log(`[Migrations] Migration 001_initial_schema.sql completed successfully!`);

    return { success: true, message: "Migrations executed successfully." };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error(`[Migrations] Migration error:`, errMsg);
    return { success: false, message: errMsg };
  }
}

// Allow direct CLI execution
if (require.main === module) {
  runMigrations()
    .then((result) => {
      console.log(result.message);
      process.exit(result.success ? 0 : 1);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
