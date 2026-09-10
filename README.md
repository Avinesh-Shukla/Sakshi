# SAKSHI — Honest Impact Circular Economy Ledger

<div align="center">

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TestSprite](https://img.shields.io/badge/Verified_by-TestSprite-19C379?logo=checkmarx&logoColor=white)](https://www.testsprite.com/)

**A transparent, waste-to-resource circular economy ledger bridging waste generators with certified recyclers across India.**

[Explore Features](#key-features) • [Quickstart](#getting-started) • [TestSprite Verification](#testsprite-testing--verification) • [Architecture](#architecture--tech-stack) • [Contributing](#contributing)

</div>

---

##  About SAKSHI

In waste management systems across urban India, the most common citizen doubt is: *"Does my segregated waste actually get recycled, or does it end up in a landfill?"*

**SAKSHI** (*साक्षी / Witness*) provides an immutable, transparent answer. It connects households, RWAs, and tech parks with CPCB/SPCB-certified recyclers and electric cargo fleets. Every collection is weighed on calibrated digital tare scales, signed cryptographically with SHA-256 hashes, and recorded in a public tamper-evident ledger — ensuring zero unscientific dumping and rewarding generators with verifiable Circularity Credits.

---

##  Key Features

### 1.  Waste Generator Portal
- **Doorstep EV Pickup Scheduling**: Schedule collections for segregated waste streams (paper, rigid plastics, e-waste, metals, compostables).
- **Driver Dispatch & OTP Verification**: Live tracking of zero-emission EV fleets with 4-digit mutual handoff authentication.
- **Circularity Credits & Tier Progression**: Earn credits based on audited weight to unlock rewards (Silver, Gold, Platinum tiers).

### 2.  Certified Recycler Console
- **Weighbridge & Tare Scale Verification**: Submit gross, tare, and net weights with calibrated digital scale serial numbers.
- **Regulatory Compliance**: Integrated verification of State Pollution Control Board (SPCB) and CPCB Extended Producer Responsibility (EPR) licenses.
- **Facility Dispatch Management**: Optimize regional collection clusters (Noida/Delhi NCR, Bengaluru, Mumbai, Pune, Hyderabad, etc.).

### 3.  Cryptographic Impact Ledger
- **Verifiable Block Receipts**: Each completed pickup is sealed into an append-only hash chain with immutable SHA-256 signatures, GPS coordinates, and supervisor digital PKI timestamps.
- **Carbon & Water Offset Metrics**: Instant calculation of environmental dividends (e.g., kg of CO₂ diverted, liters of water conserved).
- **Public Audit Explorer**: Searchable registry by Block #, Pickup ID, or material stream without requiring cryptocurrency tokens or gas fees.

### 4.  Eco Marketplace & Community
- **Circularity Rewards**: Redeem earned credits for 100% recycled cotton tote bags, upcycled notebooks, and eco-planters.
- **Leaderboards & Badges**: Celebrate top-contributing resident champions across national and municipal sectors.
- **Multilingual Support**: Available in 6 regional languages (English, Hindi, Bengali, Tamil, Kannada, Telugu).
- **Inclusive Accessibility**: High-contrast mode, legible font scalings (ISO 9241-161 compliant), and text-to-speech voice assistance.

---

## 🛠️ Architecture & Tech Stack

- **Frontend Core**: [React 19](https://react.dev/) + Modern Context Architecture
- **Build Tooling**: [Vite 6](https://vitejs.dev/) with Fast Refresh & ESM packaging
- **Styling & Design System**: [Tailwind CSS v4](https://tailwindcss.com/) with custom earth-tone palettes (`#083833` Deep Forest, `#83c5be` Aqua Mint, `#D96B27` Terracotta)
- **Animation**: [Motion](https://motion.dev/) for seamless page and modal transitions
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Autonomous QA / Verification**: [TestSprite CLI](https://www.testsprite.com/)

---

##  Getting Started

### Prerequisites
- **Node.js** 20.19+, 22.13+, or 24+
- **npm** 10+

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Avinesh-Shukla/Sakshi.git
   cd Sakshi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Production build & type check:**
   ```bash
   npm run lint    # TypeScript typecheck
   npm run build   # Production Vite bundle in dist/
   npm run preview # Preview production build
   ```

---

##  TestSprite Testing & Verification

This project integrates the **TestSprite CLI** agentic verification layer to ensure zero regressions and robust client-side behavior across authentication and ledger auditing flows.

### Project Test Plans
Defined under [`testsprite-plans/`](./testsprite-plans/):
- `generator-portal-login.json`: Verifies citizen role selection, OTP/instant authentication, and generator dashboard rendering.
- `landing-page-hero.json`: Verifies the landing page value proposition and navigation to the cryptographic ledger.
- `certified-recyclers-directory.json`: Verifies directory filtering and SPCB/CPCB license certificate inspection.

### Running TestSprite Tests Locally

Run any test through TestSprite's secure local tunnel:

```bash
# Verify CLI and credentials status
npx testsprite doctor

# Run an individual test case against the local dev server
npx testsprite test run <test-id> --local 3000 --wait

# Run the complete test suite
npx testsprite test run --all --project <projectId> --wait
```

---

##  Project Structure

```
Sakshi/
├── .agents/skills/              # TestSprite agent skill configurations
├── .testsprite/                 # TestSprite project configuration
├── public/                      # Static assets and favicons
├── src/
│   ├── components/              # Modular UI components (Header, Sidebar, Modals, Cards)
│   ├── context/                 # AppContext for state, roles, and localization
│   ├── data/                    # Mock data for pickups, facilities, and ledger blocks
│   ├── pages/                   # Application views (Dashboard, Ledger, Recyclers, etc.)
│   ├── App.jsx                  # Root container, role switching, and routing
│   ├── main.jsx                 # Vite application entrypoint
│   └── index.css                # Global Tailwind CSS styles and theme variables
├── testsprite-plans/            # TestSprite frontend plan schemas
├── index.html                   # HTML entrypoint
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite configuration and plugins
```

---

##  License

Distributed under the **Apache 2.0 License**. See `LICENSE` for more information.
