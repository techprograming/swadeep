import { Router, Request, Response } from "express";
import { testConnection, getDatabaseStatus } from "../db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const dbTest = await testConnection();
  const dbStatus = getDatabaseStatus();

  res.status(200).json({
    status: "ok",
    service: "Swadeep Shikshan Vikas Sanstha API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbTest.connected ? "connected" : "disconnected",
      host: dbStatus.host,
      port: dbStatus.port,
      database: dbStatus.database,
      details: dbTest.message,
    },
  });
});

export default router;
