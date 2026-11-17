# Swadeep Shikshan Vikas Sanstha — Official Website

Official bilingual (English & Gujarati) web platform for **Swadeep Shikshan Vikas Sanstha** (Ahmedabad, Gujarat), an established non-profit organization dedicated to empowering vulnerable communities since 2005 through education, healthcare, marine livelihoods, rural infrastructure, and disaster relief.

---

## 🚀 Key Features & Highlights

1. **Dark Forest-Green Homepage Hero**:
   - Recreates the exact visual design from supplied reference screenshots (`#0B3025`, `#174B38`, `#205943`).
   - Authentic field photography texture with balanced overlays for optimal text contrast.
   - Verified registration trust markers (`Tax Exemption Liable`, `FCRA Reg: 041980081`, `PAN: AAKTS6375E`).
   - Interactive right panel with program snapshot cards linking to dedicated thematic pages.
   - Floating white award card highlighting the verified **CSR Conclave 2019** recognition.

2. **Full Bilingual Support (English & ગુજરાતી)**:
   - Universal `LanguageContext` supporting instantaneous language toggling.
   - Complete translations across navigation, headings, badges, descriptions, forms, buttons, and accessibility labels.
   - Preference persistence in `localStorage` and dynamic synchronization with HTML `lang` attribute.

3. **Complete Navigation & Thematic Program Sub-pages**:
   - Navigation matching Section 4: Home, About Us, What We Do, Impact & Reports, Resources, Get Involved, Contact Us, and Donate Now.
   - Dedicated program pages at `/programs/[slug]` for:
     - `/programs/education`
     - `/programs/health`
     - `/programs/livelihood`
     - `/programs/infrastructure`
     - `/programs/disaster`
   - Resources hub at `/resources` linking Gallery, Official Videos, News, and Publications.
   - Get Involved hub at `/get-involved` for Volunteers, Corporate CSR, and Mission Support.

4. **Robust Backend & PostgreSQL Database Architecture**:
   - Standalone Node.js & Express REST API with TypeScript in `server/`.
   - Parameterized SQL queries using `pg.Pool` preventing SQL injection.
   - Database migrations system in `server/src/migrations/`.
   - Contact form spam protection with hidden bot honeypot, input sanitation, and length checks.
   - Resilient database client: gracefully handles local offline database states with in-memory fallback so developers can test and develop without system crashes.

5. **Functional Admin Dashboard (`/admin`)**:
   - Secure authentication with `bcryptjs` password hashing and JWT sessions.
   - Live **Inquiries Manager**: inspect contact submissions, view message details, filter by status, and update progress.
   - Live **Impact Metrics Manager**: review and update verified grassroots milestones.
   - Real-time PostgreSQL connectivity status and system diagnostics.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express 5, TypeScript (`tsx`)
- **Database**: PostgreSQL with parameterized queries via `pg`
- **Security**: JWT authentication, bcrypt password hashing, honeypot bot detection, XSS sanitization
- **Testing**: Node.js built-in test runner via `tsx --test`

---

## 💻 Local Development & Execution

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+
- **npm**: v9+
- **PostgreSQL** (optional for basic local preview; required for persistent database storage)

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```powershell
Copy-Item .env.example .env.local
```
Configure your local PostgreSQL credentials in `.env.local` if running PostgreSQL locally.

### 3. Install Dependencies
```powershell
npm install
```

### 4. Database Setup & Migrations (PostgreSQL)
If you have PostgreSQL running locally:
```powershell
# 1. Create the database
createdb -U postgres swadeep_db

# 2. Run schema migrations
npm run db:migrate

# 3. Seed initial admin credentials & verified impact statistics
npm run db:seed
```
*Note: If PostgreSQL is not currently running, the application will automatically activate its resilient local in-memory fallback mode.*

### 5. Running the Application

#### Start the Next.js Frontend:
```powershell
npm run dev
```
Visit: **http://localhost:3000**

#### Start the Express REST API Backend (Optional / Standalone):
```powershell
npm run dev:server
```
Runs on: **http://localhost:5000** (Health check: `http://localhost:5000/api/health`)

### 6. Running Tests
Execute the automated test suite covering bilingual dictionaries, input sanitation, auth, and database resilience:
```powershell
npm test
```

### 7. Production Build Check
```powershell
npm run build
```

---

## 🔐 Administrative Access

Navigate to `/admin` on your local server:
- **URL**: `http://localhost:3000/admin`
- **Credentials**: See `.env.example` for default admin username and password. Copy to `.env.local` and customize before use.

---

## 📋 Verified Organizational Data (No Fabrications)

- **Official Name**: Swadeep Shikshan Vikas Sanstha (સ્વદીપ શિક્ષણ વિકાસ સંસ્થા)
- **Founded**: 2005
- **Operating Headquarters**: SWADEEP, 21, Abhinandan Park Society, Prernatirth Derasar Rd, Prahlad Nagar, Ahmedabad, Gujarat 380015
- **Registered Office (Trust Deed)**: 184/A Anand Hall station road, Sihor, District Bhavnagar, Gujarat
- **PAN**: `AAKTS6375E`
- **FCRA Registration**: `041980081`
- **Tax Exemption**: Section 80G
- **Phone**: +91-942-830-9408
- **Email**: swadeepindiango@gmail.com
- **Official YouTube**: [@swadeepindia2543](https://www.youtube.com/@swadeepindia2543)
- **Verified Award**: CSR Conclave 2019 Award Winner