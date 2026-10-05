# 🌌 Abishek Adhikari — 3D Interactive Portfolio

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.x-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployment_Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> A cutting-edge, interactive 3D developer portfolio showcasing full-stack web platforms, real-time WebSocket systems, and modern frontend engineering. Built with React 19, Three.js, React Three Fiber, Tailwind CSS v4, and Framer Motion.

---

## 🚀 Overview

This portfolio is crafted to demonstrate modern frontend engineering with high-performance WebGL animations, silky smooth 3D interactions, and responsive design across all devices. It showcases featured projects such as real-time emergency healthcare dispatchers, role-based complaint management systems, and e-commerce storefronts.

### 🌟 Key Highlights
- **WebGL 3D Core with React Three Fiber**: Interactive 3D hero center with dynamic geometry deformation (`MeshDistortMaterial`), orbit rings, and floating polyhedral satellites responding to cursor motion.
- **Smart GPU Performance Optimization**: Dynamic viewport intersection tracking (`IntersectionObserver`) pauses canvas rendering loops (`frameloop="never"`) when out of view, reducing GPU load to 0% during section scrolling.
- **Buttery 3D Card Physics**: Specular glare sheen and tilt effects powered by Framer Motion springs, auto-disabled on touch devices for fluid mobile scrolling.
- **Sleek Cyber Glassmorphism**: Tailored HSL dark color palette (`#07080e`), backdrop blur filters, custom glow effects, and modern JetBrains Mono / Inter typography.
- **Smooth Loading Screen**: Cyberpunk-style loader with progress states and seamless entry animations into the 3D scene.
- **Vercel Edge Ready**: Automated SPA routing, immutable asset caching headers, and optimized chunk splitting configured out of the box.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Core Framework** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite 8](https://vite.dev/) |
| **3D & Visual Effects** | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/), Vanilla CSS utilities, Glassmorphism, Google Fonts (`Inter`, `JetBrains Mono`) |
| **Animations & Gestures** | [Framer Motion 13](https://www.framer.com/motion/) (Physics springs, scroll triggers, layout animations) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/) Edge Network |

---

## ✨ Features

- **Interactive 3D Hero Scene**: Real-time Raycaster cursor tracking, animated distort core, floating geometry satellites, and celestial particle starfields.
- **Interactive Skills Orbit**: 3D floating skill orbs representing React, Laravel, Django, TypeScript, MySQL, and DevOps tools with real-time mouse parallax.
- **Interactive 3D Project Cards**: 3D hover tilt with dynamic glare lighting, macOS-style window frames, technology tag badges, and live demo / GitHub links.
- **Category Filtering**: Instant animated category switches across Full-Stack, Frontend, and Backend architectures.
- **Interactive Contact Form & Live Canvas**: Floating vector shapes canvas with automatic pause when scrolled out of view, coupled with validation and feedback states.
- **Custom Scrollbar & Selection**: Custom neon-indigo glow scrollbar and text selection styling.
- **Mobile First & Responsive**: Optimized for phones, tablets, and 4K displays with touch detection and capped DPR (`1.5x`).
- **Complete SEO & Social Sharing**: Pre-configured Open Graph tags, Twitter Cards, robots meta, and semantic HTML5 hierarchy.

---

## 📁 Project Structure

```bash
Portfolio/
├── public/                     # Static public assets (icons, favicon, project previews)
│   ├── favicon.svg             # Neon portfolio favicon
│   └── projects/               # Showcase project screenshots
├── src/
│   ├── assets/                 # Bundled images and vectors
│   ├── components/
│   │   ├── 3d/                 # Three.js / React Three Fiber canvases
│   │   │   ├── HeroScene.tsx   # Interactive Hero 3D core & satellites
│   │   │   └── CanvasPlaceholder.tsx
│   │   ├── layout/             # Layout primitives
│   │   │   ├── Navbar.tsx      # Fixed glassmorphic navigation bar
│   │   │   └── Footer.tsx      # Social links & back-to-top button
│   │   ├── sections/           # Major portfolio sections
│   │   │   ├── Hero.tsx        # Hero entrance & call-to-actions
│   │   │   ├── About.tsx       # Bio, pillars & profile tilt card
│   │   │   ├── Projects.tsx    # Showcase gallery with filters
│   │   │   ├── Skills.tsx      # Categorized skill bars & 3D orbit
│   │   │   ├── Contact.tsx     # Message dispatch form & canvas
│   │   │   ├── about/          # About section background accents
│   │   │   ├── projects/       # Project 3D cards & backgrounds
│   │   │   └── skills/         # Skill 3D cards & orbit scene
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.tsx      # Neon action buttons
│   │       ├── Card.tsx        # Glass card wrapper
│   │       └── LoadingScreen.tsx # Cyber initialization loader
│   ├── data/
│   │   └── portfolio.ts        # Typed portfolio information & project data
│   ├── App.tsx                 # Root application component
│   ├── index.css               # Design system tokens, scrollbar & selection
│   └── main.tsx                # React DOM mount point
├── vercel.json                 # Vercel SPA routing & cache headers
├── vite.config.ts              # Code splitting, chunk limits & Tailwind v4
└── package.json                # Dependencies and build scripts
```

---

## 💻 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version `18.x` or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abishek056/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application with Hot Module Replacement (HMR).

4. **Verify TypeScript & Build:**
   ```bash
   npm run build
   ```

5. **Preview the production bundle locally:**
   ```bash
   npm run preview
   ```

---

## 🌐 How to Deploy on Vercel

This repository is pre-configured for zero-config Vercel deployment with `vercel.json` included.

### Option A: Via Vercel Dashboard (Recommended)

1. Push your repository to [GitHub](https://github.com/).
2. Navigate to [vercel.com](https://vercel.com/) and sign in.
3. Click **"Add New..."** → **"Project"**.
4. Import your `Portfolio` repository.
5. In **Build and Output Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**. Your portfolio will be live in seconds with an SSL certificate and global CDN edge routing!

### Option B: Via Vercel CLI

1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Log in and deploy:
   ```bash
   vercel
   ```

3. For production release:
   ```bash
   vercel --prod
   ```

---

## ⚡ Performance Optimizations

- **Smart Frameloop Pausing**: When the user scrolls past the 3D Hero or Skills sections, an `IntersectionObserver` halts the render loop (`frameloop="never"`), dropping GPU utilization to 0%.
- **DPR Throttling**: Device pixel ratio is capped between `1` and `1.5` (`dpr={[1, 1.5]}`), preventing mobile GPUs from rendering excessive pixel fragments on 3x / 4x Retina screens.
- **Rollup Vendor Splitting**: Vendor dependencies are split into independent HTTP/2 chunks (`three-vendor`, `motion-vendor`, `lucide-icons`), accelerating First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
- **GPU Accelerated Transitions**: CSS and Framer Motion transforms utilize `transform-gpu` and `will-change` hints for compositing off the main thread.
- **Touch Device Protection**: Mouse tilt calculations are gracefully bypassed on touch screens (`pointer: coarse`), preserving smooth native kinetic scrolling on mobile phones.

---

## 👤 Author

**Abishek Adhikari**
- **Role**: Full-Stack Developer & Software Engineer
- **GitHub**: [@abishek056](https://github.com/abishek056)
- **Email**: [abishekadhikari056@gmail.com](mailto:abishekadhikari056@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it as inspiration for your own portfolio.
