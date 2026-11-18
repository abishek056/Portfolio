<h1 align="center">Abishek Adhikari — Full-Stack Developer Portfolio</h1>

<p align="center">
  <strong>Modern, high-performance 3D developer portfolio built with React 19, Three.js, React Three Fiber, Vite 8, and Tailwind CSS 4</strong><br/>
  <a href="https://portfolio-abishek056s-projects.vercel.app" target="_blank">🌐 Live Demo</a> &nbsp;·&nbsp;
  <a href="https://github.com/abishek056/Portfolio-" target="_blank">GitHub Repository</a> &nbsp;·&nbsp;
  <a href="mailto:abishekadhikari056@gmail.com">Contact Me</a>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white&style=flat-square"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white&style=flat-square"/>
  <img alt="Three.js" src="https://img.shields.io/badge/Three.js-0.186-black?logo=threedotjs&logoColor=white&style=flat-square"/>
  <img alt="React Three Fiber" src="https://img.shields.io/badge/R3F-9.8-black?logo=three.js&logoColor=white&style=flat-square"/>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white&style=flat-square"/>
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square"/>
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer_Motion-13.4-black?logo=framer&logoColor=white&style=flat-square"/>
  <img alt="Deployed on Vercel" src="https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel&logoColor=white&style=flat-square"/>
</p>

---

## 📖 Overview

A responsive, production-ready developer portfolio showcasing full-stack applications, real-time architectures, and interactive digital interfaces. Designed from the ground up with a dark aesthetic (`#07080e`), cyber-luminescent particle networks, pointer-reactive 3D scenes, smooth scroll transitions, and a single-page downloadable vector CV.

---

## ✨ Key Features

- **Cybernetic Loading Screen** — Animated orbital loader with progressive stage tracking and cyber grid aesthetics.
- **WebGL 3D Hero Scene** — Interactive wireframe crystal geometries (icosahedron, dodecahedron, octahedron, tetrahedron) powered by React Three Fiber & Drei with real-time pointer parallax.
- **Unified Spider-Web Particle Background** — Canvas-based dynamic constellation physics connecting nodes to the cursor position.
- **About & Profile Section** — Quick statistics overview, verified credentials card, personalized signature graphic, and quick-action **View CV** & **Download CV** buttons.
- **Featured Projects Grid** — 3D tilt project cards filterable by category (**Full-Stack**, **Frontend**, **Backend**) with live demos, GitHub repositories, and full tech stack badges.
- **Interactive 3D Skills Showcase** — Categorized skill proficiency cards (Frontend, Backend, Tools) with neon hover blooms and animated proficiency indicators.
- **Interactive Contact Hub** — Functional contact form, quick-copy email button, status indicators, and direct social links.
- **Integrated Single-Page CV System** — Includes a print-ready vector single-page PDF (`/cv.pdf`), self-contained HTML layout (`/cv.html`), and high-resolution profile asset (`/cv_profile.jpg`).
- **Precision Navigation** — Sticky glassmorphism header with 3D logo tilt, responsive mobile drawer, smooth section scrolling with offset compensation, and back-to-top trigger.
- **Production & Performance Optimizations** — Component lazy loading, Suspense fallbacks, automatic asset compression, and strict security headers via `vercel.json`.

---

## 🛠️ Tech Stack

### Core Framework & Tools
| Technology | Description |
|---|---|
| **[React 19](https://react.dev)** | Modern component framework leveraging concurrent rendering |
| **[TypeScript 6](https://www.typescriptlang.org)** | Strict type checking across components, interfaces, and datasets |
| **[Vite 8](https://vitejs.dev)** | Next-generation frontend tooling and rapid HMR development server |
| **[Tailwind CSS 4](https://tailwindcss.com)** | Utility-first styling integrated via `@tailwindcss/vite` |

### 3D & Animation
| Library | Description |
|---|---|
| **[Three.js](https://threejs.org)** | JavaScript 3D WebGL graphics library |
| **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** | Declarative Three.js scene renderer for React |
| **[@react-three/drei](https://github.com/pmndrs/drei)** | Useful helpers and abstractions for React Three Fiber |
| **[Framer Motion 13](https://www.framer.com/motion/)** | Spring-physics micro-interactions, layout animations, and scroll reveals |
| **[Lucide React](https://lucide.dev)** | Lightweight, clean vector icon suite |

---

## 📂 Project Structure

```text
Portfolio/
├── public/
│   ├── cv.html                  # Interactive single-page CV web source
│   ├── cv.pdf                   # Official single-page vector CV PDF
│   ├── cv_profile.jpg           # Exact profile photo used in CV
│   └── favicon.svg              # Website favicon
├── src/
│   ├── assets/
│   │   └── image/
│   │       ├── about/           # Profile photo and personal signature
│   │       ├── home/            # Hero & contact card image
│   │       ├── projects/        # Thumbnails for featured projects
│   │       └── logo.png         # Brand logo icon
│   ├── components/
│   │   ├── 3d/                  # WebGL 3D scenes (HeroScene, CanvasPlaceholder)
│   │   ├── layout/              # Navbar, Footer
│   │   ├── sections/            # Major page sections
│   │   │   ├── about/           # About section 3D accents
│   │   │   ├── home/            # ProfileCard component
│   │   │   ├── projects/        # 3D project cards and background effects
│   │   │   ├── skills/          # Interactive skill cards and 3D scenes
│   │   │   ├── Home.tsx         # Hero section
│   │   │   ├── About.tsx        # Overview & credentials
│   │   │   ├── Projects.tsx     # Filterable project catalog
│   │   │   ├── Skills.tsx       # Tech stack proficiencies
│   │   │   └── Contact.tsx      # Contact form & social connections
│   │   └── ui/                  # Reusable UI primitives (Button, Card, LoadingScreen, SpiderWeb)
│   ├── data/
│   │   ├── portfolio.ts         # Central content repository (info, projects, skills, navigation)
│   │   └── portfolioData.ts     # Data re-exports
│   ├── hooks/
│   │   └── useActiveSection.ts  # Intersection Observer section tracker
│   ├── App.tsx                  # Root layout & section reveal animations
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles, fonts, and Tailwind directives
├── index.html                   # HTML entry point with SEO & OpenGraph meta tags
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vercel.json                  # SPA rewrites, caching, and security headers
└── vite.config.ts               # Vite configuration with Tailwind CSS plugin
```

---

## 💻 Featured Projects Showcased

| Project | Category | Tech Stack | Highlights |
|---|---|---|---|
| **HealthHub** | Full-Stack | Laravel 13, React 19, PHP 8.3, Reverb, Mapbox GL, MySQL | Real-time emergency dispatch, live ambulance tracking, OPD queue & blood bank management |
| **UrbanStyle** | Frontend | React, Vite, Tailwind CSS, Context API | Modern fashion e-commerce storefront with reactive cart & administrative inventory tools |
| **Complaint Lifecycle System** | Backend | Django 6.0, Python, Bootstrap 5, PostgreSQL / SQLite | Enterprise lifecycle workflow with RBAC roles, audit logging & automated email dispatch |
| **Personal Portfolio** | Frontend / 3D | React 19, Three.js, R3F, Tailwind CSS, Framer Motion | Cyberpunk-inspired 3D developer portfolio featuring constellation particle dynamics |
| **Dream Cafe** | Frontend | HTML5, Tailwind CSS, JavaScript | Interactive digital bistro menu and responsive table reservation system |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or pnpm / yarn)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/abishek056/Portfolio-.git
cd Portfolio-

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser. The application supports Hot Module Replacement (HMR).

### Build & Production Preview

```bash
# Type-check and compile to dist/
npm run build

# Preview production build locally
npm run preview

# Run ESLint validation
npm run lint
```

---

## ⚙️ Customization Guide

All personal credentials, project items, and skill taxonomies are centralized in:

📁 [`src/data/portfolio.ts`](file:///Users/abishek/Documents/Portfolio/src/data/portfolio.ts)

- Update `PERSONAL_INFO` to modify name, title, bio, contact email, and social profiles.
- Modify `PROJECTS` array to add, reorder, or edit showcase projects.
- Modify `SKILLS_BY_CATEGORY` to update technical competencies and percentage bars.
- Replace `/public/cv.pdf` to refresh the downloadable resume.

---

## ☁️ Deployment

This project is optimized for deployment on **[Vercel](https://vercel.com)**:

1. Push your repository to GitHub.
2. In the Vercel Dashboard, select **Add New Project** and import the repository.
3. Framework preset will automatically be detected as **Vite**.
4. Click **Deploy**.

Security headers and single-page application client rewrites are pre-configured in [`vercel.json`](file:///Users/abishek/Documents/Portfolio/vercel.json):
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-XSS-Protection: 1; mode=block`

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Crafted with care by <a href="https://github.com/abishek056">Abishek Adhikari</a> · Kathmandu, Nepal 🇳🇵
</p>
