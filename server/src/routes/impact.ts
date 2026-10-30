import { Router, Request, Response } from "express";
import { pool, testConnection, inMemoryFallback } from "../db";
import { requireAdminAuth } from "../middleware/auth";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const dbTest = await testConnection();

    if (dbTest.connected) {
      const result = await pool.query(
        "SELECT metric_key, label_en, label_gu, metric_value, subtext_en, subtext_gu, reporting_period, updated_at FROM impact_metrics ORDER BY id ASC"
      );
      return res.status(200).json({ success: true, metrics: result.rows });
    } else {
      return res.status(200).json({ success: true, metrics: inMemoryFallback.metrics });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to load impact metrics." });
  }
});

router.put("/:key", requireAdminAuth, async (req: Request, res: Response) => {
  const key = req.params.key;
  const { metric_value, subtext_en, subtext_gu } = req.body;

  if (!metric_value) {
    return res.status(400).json({ success: false, error: "Metric value is required." });
  }

  try {
    const dbTest = await testConnection();

    if (dbTest.connected) {
      const result = await pool.query(
        `UPDATE impact_metrics 
         SET metric_value = $1,
             subtext_en = COALESCE($2, subtext_en),
             subtext_gu = COALESCE($3, subtext_gu),
             updated_at = CURRENT_TIMESTAMP
         WHERE metric_key = $4
         RETURNING *`,
        [metric_value, subtext_en, subtext_gu, key]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Metric key not found." });
      }

      return res.status(200).json({ success: true, metric: result.rows[0] });
    } else {
      const item = inMemoryFallback.metrics.find((m) => m.key === key);
      if (!item) {
        return res.status(404).json({ success: false, error: "Metric key not found." });
      }
      item.value = metric_value;
      return res.status(200).json({ success: true, metric: item });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to update metric." });
  }
});

export default router;
