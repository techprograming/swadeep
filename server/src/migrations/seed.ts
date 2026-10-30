import bcrypt from "bcryptjs";
import { pool, testConnection } from "../db";
import { config } from "../config";

export async function runSeed(): Promise<{ success: boolean; message: string }> {
  const status = await testConnection();
  if (!status.connected) {
    return {
      success: false,
      message: `Database connection unavailable: ${status.message}`,
    };
  }

  try {
    console.log(`[Seed] Seeding initial admin user...`);
    const passwordHash = await bcrypt.hash(config.adminDefault.password, 10);

    await pool.query(
      `INSERT INTO admin_users (username, password_hash, role)
       VALUES ($1, $2, 'admin')
       ON CONFLICT (username) DO UPDATE 
       SET password_hash = EXCLUDED.password_hash;`,
      [config.adminDefault.username, passwordHash]
    );
    console.log(`[Seed] Admin user '${config.adminDefault.username}' seeded.`);

    console.log(`[Seed] Seeding verified impact metrics...`);
    const metrics = [
      { key: "children", en: "Children Benefited", gu: "લાભાર્થી બાળકો", val: "60,000+", subEn: "Across 200 Villages", subGu: "૨૦૦થી વધુ ગામોમાં" },
      { key: "villages", en: "Villages Covered", gu: "સહાયક ગામડાંઓ", val: "200+", subEn: "Rural & Coastal", subGu: "ગ્રામીણ અને સાગરકાંઠો" },
      { key: "icds", en: "ICDS Centres Supported", gu: "આંગણવાડી કેન્દ્રો", val: "277", subEn: "Pre-primary Education", subGu: "પૂર્વ-પ્રાથમિક શિક્ષણ" },
      { key: "schools", en: "Schools Reached", gu: "શાળાઓ", val: "130", subEn: "100 Primary + 30 Secondary", subGu: "૧૦૦ પ્રાથમિક + ૩૦ માધ્યમિક" },
      { key: "dental", en: "Dental Beneficiaries", gu: "દાંત આરોગ્ય લાભાર્થી", val: "13,000", subEn: "Across 100 Villages", subGu: "૧૦૦ ગામોમાં" },
      { key: "fishermen", en: "Fishermen Supported", gu: "માછીમારો", val: "500", subEn: "10 Coastal Villages", subGu: "૧૦ સાગરકાંઠા ગામો" },
      { key: "solar", en: "Solar Street Lights", gu: "સોલાર લાઇટ્સ", val: "1,050", subEn: "40 Rural Villages", subGu: "૪૦ ગ્રામીણ ગામો" },
    ];

    for (const m of metrics) {
      await pool.query(
        `INSERT INTO impact_metrics (metric_key, label_en, label_gu, metric_value, subtext_en, subtext_gu)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (metric_key) DO UPDATE
         SET label_en = EXCLUDED.label_en,
             label_gu = EXCLUDED.label_gu,
             metric_value = EXCLUDED.metric_value,
             subtext_en = EXCLUDED.subtext_en,
             subtext_gu = EXCLUDED.subtext_gu,
             updated_at = CURRENT_TIMESTAMP;`,
        [m.key, m.en, m.gu, m.val, m.subEn, m.subGu]
      );
    }
    console.log(`[Seed] Impact metrics seeded successfully.`);

    return { success: true, message: "Initial database seed completed successfully." };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error(`[Seed] Seed error:`, errMsg);
    return { success: false, message: errMsg };
  }
}

if (require.main === module) {
  runSeed()
    .then((result) => {
      console.log(result.message);
      process.exit(result.success ? 0 : 1);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
