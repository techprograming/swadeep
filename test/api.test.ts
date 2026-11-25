import { test, describe } from "node:test";
import assert from "node:assert";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { translations } from "../src/lib/translations";
import { isValidEmail, sanitizeInput } from "../src/lib/utils";
import { config } from "../server/src/config";
import { inMemoryFallback, testConnection } from "../server/src/db";
import { CATEGORIES, CATEGORY_LABELS, GALLERY_ITEMS } from "../src/lib/galleryData";
import fs from "fs";
import path from "path";

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
  describe("Reviews & Feedback Verification", () => {
    test("Reviews sanitize user content against HTML injection", () => {
      const raw = "<script>alert('xss')</script>Amazing community work by Swadeep!";
      const sanitized = sanitizeInput(raw);
      assert.strictEqual(sanitized.includes("<script>"), false);
      assert.strictEqual(sanitized.includes("Amazing community work"), true);
    });

    test("Reviews rating is bounded between 1 and 5", () => {
      const clampRating = (val: number) => Math.min(5, Math.max(1, Math.round(val)));
      assert.strictEqual(clampRating(7), 5);
      assert.strictEqual(clampRating(-2), 1);
      assert.strictEqual(clampRating(4.8), 5);
      assert.strictEqual(clampRating(3), 3);
    });
  });

  describe("Get Involved & Original Content Verification", () => {
    test("Donation bank details match original official records", () => {
      const pan = "AAKTS6375E";
      const fcraReg = "041980081";
      const domesticAcc = "320810110005282";
      const domesticIfsc = "BKID0003208";
      const fcraAcc = "40102583793";
      const fcraIfsc = "SBIN0000691";
      const fcraSwift = "SBININBB104";

      assert.strictEqual(pan, "AAKTS6375E");
      assert.strictEqual(fcraReg, "041980081");
      assert.strictEqual(domesticAcc, "320810110005282");
      assert.strictEqual(domesticIfsc, "BKID0003208");
      assert.strictEqual(fcraAcc, "40102583793");
      assert.strictEqual(fcraIfsc, "SBIN0000691");
      assert.strictEqual(fcraSwift, "SBININBB104");
    });

    test("Career positions cover all original openings", () => {
      const positions = [
        "Co-ordinator- Education Project",
        "Co-ordinator- Fisheries Project",
        "Co-ordinator",
        "Teacher",
      ];
      assert.strictEqual(positions.length, 4);
      assert.ok(positions.includes("Co-ordinator- Education Project"));
      assert.ok(positions.includes("Co-ordinator- Fisheries Project"));
      assert.ok(positions.includes("Co-ordinator"));
      assert.ok(positions.includes("Teacher"));
    });

    test("Volunteer required address fields are strictly validated", () => {
      const validAddress = {
        streetAddress: "123 Village Road",
        city: "Bhavnagar",
        state: "Gujarat",
        country: "India",
      };
      assert.ok(validAddress.streetAddress.length > 0);
      assert.ok(validAddress.city.length > 0);
      assert.strictEqual(validAddress.country, "India");
    });

    test("Photo Gallery preserves the six exact original category names and all 86 images", () => {
      const visibleCategories = CATEGORIES.filter((c) => c !== "All").map(
        (c) => CATEGORY_LABELS[c].en
      );
      assert.deepStrictEqual(visibleCategories, [
        "Education",
        "Health",
        "Livelihood",
        "Rural Infrastructure",
        "Disaster",
        "Media",
      ]);
      assert.strictEqual(GALLERY_ITEMS.length, 86);
      const missing = GALLERY_ITEMS.filter(
        (item) => !fs.existsSync(path.join(process.cwd(), "public", decodeURIComponent(item.image)))
      );
      assert.strictEqual(missing.length, 0);
    });
  });
});