<h1 align="center">Abishek Adhikari — Portfolio</h1>

<p align="center">
  <strong>Interactive 3D developer portfolio built with React 19, Three.js, and Vite</strong><br/>
  <a href="https://portfolio-abishek056s-projects.vercel.app" target="_blank">🌐 Live Demo</a> &nbsp;·&nbsp;
  <a href="https://github.com/abishek056/Portfolio-" target="_blank">GitHub</a> &nbsp;·&nbsp;
  <a href="mailto:abishekadhikari056@gmail.com">Contact</a>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white&style=flat-square"/>
  <img alt="Three.js" src="https://img.shields.io/badge/Three.js-0.186-black?logo=threedotjs&logoColor=white&style=flat-square"/>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square"/>
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square"/>
  <img alt="Deployed on Vercel" src="https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel&logoColor=white&style=flat-square"/>
</p>

---

## 📖 Description

A high-performance, fully responsive personal portfolio showcasing my work as a Full-Stack Developer. The site features an immersive WebGL hero scene built with React Three Fiber — complete with animated wireframe crystal geometries, pointer-driven parallax, and smooth Framer Motion transitions throughout every section.

---

## ✨ Features

- **WebGL 3D Hero Scene** — Floating wireframe crystal geometries (icosahedron, dodecahedron, octahedron, tetrahedron) powered by React Three Fiber with real-time pointer parallax
- **Framer Motion Animations** — Spring-physics micro-interactions, scroll-triggered reveals, and staggered entry animations across all sections
- **Filterable Projects Grid** — Browse showcased projects by category (Full-Stack, Frontend, Backend) with live/GitHub links
- **Animated Skill Bars** — Categorised skill proficiency visualised with smooth fill animations
- **Dark-Mode First Design** — Deep dark aesthetic (`#07080e` base) with an indigo/violet/cyan accent palette
- **Fully Responsive** — Mobile-optimised layout; 3D scene adapts by removing geometry on small viewports
- **Performance Optimised** — Intersection Observer–driven Canvas pause, `dpr` capping, and Vite code splitting
- **SEO Ready** — Full Open Graph and Twitter Card meta tags, semantic HTML, and a `robots` directive
- **Security Headers** — `vercel.json` ships `X-Frame-Options`, `X-XSS-Protection`, `X-Content-Type-Options`, and `Referrer-Policy` out of the box

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev) + [Vite 8](https://vitejs.dev) |
| **Language** | [TypeScript 6](https://www.typescriptlang.org) |
| **3D / WebGL** | [Three.js](https://threejs.org) · [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) · [@react-three/drei](https://github.com/pmndrs/drei) |
| **Animation** | [Framer Motion 13](https://www.framer.com/motion/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Linting** | ESLint 10 + Prettier 3 |
| **Deployment** | [Vercel](https://vercel.com) |

---

## 📂 Project Structure

```
Portfolio/
├── public/                 # Static assets (favicon, images)
├── src/
│   ├── assets/             # Project screenshots and media
│   ├── components/
│   │   ├── 3d/             # Three.js / R3F scenes (HeroScene, CanvasPlaceholder)
│   │   ├── layout/         # Navbar, Footer
│   │   ├── sections/       # Hero, About, Projects, Skills, Contact
│   │   └── ui/             # Reusable UI primitives
│   ├── data/
│   │   └── portfolio.ts    # Centralised content (personal info, projects, skills)
│   ├── hooks/              # Custom React hooks
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vercel.json             # Vercel SPA rewrites & security headers
├── vite.config.ts
└── tsconfig.json
```

> **Tip:** All site content — personal info, projects, and skills — lives in `src/data/portfolio.ts`. Edit that single file to personalise the entire site.

---

## 🚀 Running Locally

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/abishek056/Portfolio-.git
cd Portfolio-

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The page hot-reloads on every save.

### Other useful scripts

```bash
npm run build     # Type-check + production build → dist/
npm run preview   # Locally preview the production build
npm run lint      # Run ESLint across the codebase
```

---

## ☁️ Deploying on Vercel

The project includes a `vercel.json` that handles SPA client-side routing rewrites and security headers automatically.

### Option A — Vercel Dashboard (recommended)

1. Push your code to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects **Vite** — no additional configuration needed.
4. Click **Deploy**.

### Option B — Vercel CLI

```bash
# Install the CLI globally (once)
npm install -g vercel

# Login
vercel login

# Deploy (follow the prompts; framework will be auto-detected as Vite)
vercel

# Promote to production
vercel --prod
```

### Environment variables

This project has no required environment variables for the basic build. If you extend the site with a contact-form API or analytics, add them via the Vercel Dashboard under **Settings → Environment Variables**.

---

## 📄 License

This project is open-source under the [MIT License](./LICENSE).
Feel free to fork, adapt, and use it as inspiration for your own portfolio — attribution is appreciated but not required.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/abishek056">Abishek Adhikari</a> · Nepal 🇳🇵
</p>
