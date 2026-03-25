# 💎 Krishna Glass House — Aluminium & PVC Works

Welcome to the professional redesign of the **Krishna Glass House** website. This project aims to deliver a premium, high-performance, and SEO-optimized web experience for Delhi NCR's leading glass and aluminium specialists.

[![Live Site](https://img.shields.io/badge/Live-Visit%20Site-0f7173?style=for-the-badge)](https://krishnaglass.explyra.me/)
[![Cloudflare Pages](https://img.shields.io/badge/Hosted%20On-Cloudflare%20Pages-f38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

---

## 🚀 Key Features

### ⚡ Performance & Core Web Vitals
- **Aggressive Browser Caching**: Configured via `_headers` for 1-year asset retention.
- **Resource Hints**: Implemented `preload` for critical CSS and Hero images, and `preconnect` for Google Fonts.
- **Optimized Redirects**: Clean URL structure (e.g., `/about` instead of `/about.html`) using `_redirects`.

### 🛡️ Security & SEO
- **HSTS & CSP**: Advanced security headers for user protection.
- **Structured Data**: Comprehensive JSON-LD schema (Business, Services, FAQ) for rich search results.
- **PWA Ready**: Complete `manifest.json` for mobile app-like experience and better search visibility.
- **Sitemap & Robots**: Fine-tuned for efficient search engine crawling.

---

## 🛠️ Technology Stack
- **Frontend**: Semantic HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+).
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/).
- **Deployment**: Integrated with GitHub & Wrangler.

---

## 💻 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *This uses `wrangler pages dev` to simulate the Cloudflare Pages environment, including custom headers and redirects.*

---

## 📦 Deployment

### Automated (Recommended)
Push your changes to the `main` branch:
```bash
git add .
git commit -m "feat: your feature description"
git push origin main
```
Cloudflare Pages will automatically detect the push and trigger a new build.

### Manual Branch Deployment
```bash
npx wrangler pages deploy . --project-name krishna-glass
```

---

## 📂 Project Structure
- `/css`: Global stylesheets and typography.
- `/js`: Interactive elements and AI chatbot logic.
- `/images`: High-quality project portfolio and brand assets.
- `/services`: Dedicated service detail pages.
- `_headers`: Caching and security configuration.
- `_redirects`: Clean URL and canonical mapping.
- `wrangler.toml`: Cloudflare project settings.

---

## 📞 Contact & Support
- **Business**: Krishna Glass House
- **Owner**: Saksham Bhasin
- **Address**: Shop No. 2, Mohan Nagar, Pankha Road, Janakpuri, New Delhi 110046
- **Phone**: +91 87001 62623

---
*Designed with ❤️ by [Mitanshu Bhasin](https://mitanshu.explyra.me/)*
