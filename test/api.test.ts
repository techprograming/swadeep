import { test, describe } from "node:test";
import assert from "node:assert";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { translations } from "../src/lib/translations";
import { isValidEmail, sanitizeInput } from "../src/lib/utils";
import { config } from "../server/src/config";
import { inMemoryFallback, testConnection } from "../server/src/db";

describe("Swadeep Shikshan Vikas Sanstha — Test Suite", () => {
  describe("Bilingual Dictionary Integrity", () => {
    test("English and Gujarati dictionaries have matching keys", () => {
      const enKeys = Object.keys(translations.en).sort();
      const guKeys = Object.keys(translations.gu).sort();

      assert.deepStrictEqual(
        enKeys,
        guKeys,
        "English and Gujarati dictionaries must have identical key coverage"
      );
    });

    test("Critical organization identity strings are accurate", () => {
      assert.strictEqual(
        translations.en.orgName,
        "Swadeep Shikshan Vikas Sanstha"
      );
      assert.strictEqual(
        translations.gu.orgName,
        "સ્વદીપ શિક્ષણ વિકાસ સંસ્થા"
      );
      assert.strictEqual(
        translations.en.panNo,
        "PAN: AAKTS6375E"
      );
      assert.strictEqual(
        translations.en.fcraReg,
        "FCRA Reg: 041980081"
      );
    });
  });

  describe("Input Validation & Sanitation", () => {
    test("isValidEmail correctly validates valid emails", () => {
      assert.strictEqual(isValidEmail("swadeepindiango@gmail.com"), true);
      assert.strictEqual(isValidEmail("info@swadeep.org"), true);
      assert.strictEqual(isValidEmail("invalid-email"), false);
      assert.strictEqual(isValidEmail("missing@domain"), false);
    });

    test("sanitizeInput removes dangerous HTML tags", () => {
      const dirty = "<script>alert('xss')</script>Hello World";
      const clean = sanitizeInput(dirty);
      assert.strictEqual(clean.includes("<script>"), false);
      assert.strictEqual(clean.includes("Hello World"), true);
    });
  });

  describe("Security, Password Hashing & JWT Auth", () => {
    test("bcrypt hashes passwords and verifies them securely", async () => {
      const password = config.adminDefault.password;
      const hash = await bcrypt.hash(password, 10);

      const isValid = await bcrypt.compare(password, hash);
      assert.strictEqual(isValid, true, "Valid password must match bcrypt hash");

      const isInvalid = await bcrypt.compare("WrongPassword123", hash);
      assert.strictEqual(isInvalid, false, "Invalid password must be rejected");
    });

    test("JWT tokens sign and verify user claims accurately", () => {
      const payload = { id: 1, username: "admin", role: "admin" };
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });

      const decoded = jwt.verify(token, config.jwtSecret) as typeof payload;
      assert.strictEqual(decoded.username, "admin");
      assert.strictEqual(decoded.role, "admin");
    });
  });

  describe("Database Connectivity & Fallback Handling", () => {
    test("Database testConnection handles offline mode gracefully without crashing", async () => {
      const res = await testConnection();
      assert.strictEqual(typeof res.connected, "boolean");
      assert.strictEqual(typeof res.message, "string");
    });

    test("In-memory fallback stores and retrieves contact submissions", () => {
      const testInquiry = {
        id: 9999,
        name: "Test Donor",
        email: "donor@example.com",
        phone: "+919428309408",
        subject: "CSR Partnership",
        message: "We would like to partner for Anganwadi education.",
        status: "new",
        is_read: false,
        created_at: new Date().toISOString(),
      };

      inMemoryFallback.inquiries.push(testInquiry);
      const found = inMemoryFallback.inquiries.find((i) => i.id === 9999);
      assert.ok(found, "Fallback inquiry should be retrievable");
      assert.strictEqual(found?.name, "Test Donor");
    });
  });
});
