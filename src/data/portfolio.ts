export interface PersonalInfo {
  name: string
  title: string
  bio: string
  shortBio: string
  github: string
  linkedin: string
  email: string
  location?: string
  availableForHire?: boolean
}

export type ProjectCategory = 'Full-Stack' | 'Frontend' | 'Backend'

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  stack: string[]
  tags: string[]
  category: ProjectCategory
  githubUrl: string
  liveUrl?: string
  link?: string
  featured?: boolean
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Tools'

export interface Skill {
  name: string
  category: SkillCategory
  level: number
  description?: string
}

export interface NavLink {
  name: string
  href: string
}

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Abishek Adhikari',
  title: 'Full-Stack Developer',
  shortBio:
    'Full-Stack Developer building robust web platforms, real-time architectures, and interactive digital interfaces.',
  bio: 'Passionate Full-Stack Developer with expertise across modern frontend ecosystems and scalable backend architectures. Experienced in building high-impact web applications, emergency management systems, and e-commerce platforms using Laravel, React, Django, and modern cloud technologies.',
  github: 'https://github.com/abishek056',
  linkedin: 'https://linkedin.com/in/abishek-adhikari', // placeholder
  email: 'abishek.adhikari.dev@gmail.com', // placeholder
  location: 'Nepal',
  availableForHire: true,
}

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

export const PROJECTS: Project[] = [
  {
    id: 'healthhub',
    title: 'HealthHub',
    description:
      'Hospital management & emergency platform featuring hospital discovery, bed & ambulance tracking, OPD queue, blood bank, appointments, and real-time updates.',
    image: '/src/assets/image/projects/healthhub.png',
    stack: [
      'Laravel 13',
      'PHP 8.3',
      'React 19',
      'Vite',
      'Tailwind',
      'MySQL',
      'Laravel Sanctum',
      'Laravel Reverb',
      'Mapbox GL',
      'React Native',
    ],
    tags: [
      'Laravel 13',
      'React 19',
      'PHP 8.3',
      'Tailwind',
      'MySQL',
      'Laravel Reverb',
      'Mapbox GL',
      'React Native',
    ],
    category: 'Full-Stack',
    githubUrl: 'https://github.com/abishek056/HealthHub',
    link: 'https://github.com/abishek056/HealthHub',
    featured: true,
  },
  {
    id: 'urbanstyle',
    title: 'UrbanStyle',
    description:
      'Fashion e-commerce store with cart, user orders, and full admin panel for products, inventory and billing.',
    image: '/src/assets/image/projects/urbanstyle.png',
    stack: ['React', 'Vite', 'Tailwind CSS'],
    tags: ['React', 'Vite', 'Tailwind CSS', 'E-Commerce'],
    category: 'Frontend',
    liveUrl: 'https://urban-style-tau.vercel.app/',
    githubUrl: 'https://github.com/abishek056/UrbanStyle',
    link: 'https://urban-style-tau.vercel.app/',
    featured: true,
  },
  {
    id: 'complaint-management-system',
    title: 'Complaint Management System',
    description:
      'Django-based complaint system with role-based access (User/Staff/Admin), dashboards, search & filters, comments timeline and email notifications.',
    image: '/src/assets/image/projects/complaint.png',
    stack: ['Django 6.0', 'Python', 'Bootstrap 5', 'SQLite / PostgreSQL'],
    tags: ['Django 6.0', 'Python', 'Bootstrap 5', 'RBAC', 'Email Alerts'],
    category: 'Backend',
    githubUrl: 'https://github.com/abishek056/complaint-management-system',
    link: 'https://github.com/abishek056/complaint-management-system',
    featured: true,
  },
  {
    id: 'portfolio-v1',
    title: 'Portfolio-',
    description:
      'Personal portfolio with 3D visuals, smooth animations, and dark mode.',
    image: '/src/assets/image/projects/portfolio.png',
    stack: ['React', 'Vite', 'Tailwind CSS'],
    tags: ['React', 'Vite', 'Tailwind CSS', '3D Visuals', 'Dark Mode'],
    category: 'Frontend',
    liveUrl: 'https://portfolio-abishek056s-projects.vercel.app',
    githubUrl: 'https://github.com/abishek056/Portfolio-',
    link: 'https://portfolio-abishek056s-projects.vercel.app',
    featured: false,
  },
  {
    id: 'dream-cafe',
    title: 'Dream-Cafe',
    description: 'Modern cafe website with clean and responsive UI.',
    image: '/src/assets/image/projects/dreamcafe.png',
    stack: ['HTML', 'Tailwind CSS'],
    tags: ['HTML5', 'Tailwind CSS', 'Responsive UI'],
    category: 'Frontend',
    liveUrl: 'https://dream-cafe-one.vercel.app/',
    githubUrl: 'https://github.com/abishek056/Dream-Cafe',
    link: 'https://dream-cafe-one.vercel.app/',
    featured: false,
  },
]

export const SKILLS_BY_CATEGORY: Record<SkillCategory, Skill[]> = {
  Frontend: [
    { name: 'React 19 / React', category: 'Frontend', level: 92 },
    { name: 'TypeScript / JavaScript', category: 'Frontend', level: 88 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 95 },
    { name: 'Vite', category: 'Frontend', level: 90 },
    { name: 'React Native', category: 'Frontend', level: 80 },
    { name: 'Bootstrap 5 / CSS3 / HTML5', category: 'Frontend', level: 92 },
  ],
  Backend: [
    { name: 'Laravel 13 / PHP 8.3', category: 'Backend', level: 90 },
    { name: 'Django 6.0 / Python', category: 'Backend', level: 85 },
    { name: 'MySQL / Relational Databases', category: 'Backend', level: 86 },
    { name: 'Laravel Sanctum (Auth)', category: 'Backend', level: 88 },
    { name: 'Laravel Reverb (WebSockets)', category: 'Backend', level: 82 },
    { name: 'RESTful APIs', category: 'Backend', level: 90 },
  ],
  Tools: [
    { name: 'Git & GitHub', category: 'Tools', level: 90 },
    { name: 'Mapbox GL', category: 'Tools', level: 82 },
    { name: 'Postman / API Testing', category: 'Tools', level: 88 },
    { name: 'Vercel Deployment', category: 'Tools', level: 88 },
    { name: 'Composer & npm', category: 'Tools', level: 90 },
  ],
}

export const SKILLS: Skill[] = [
  ...SKILLS_BY_CATEGORY.Frontend,
  ...SKILLS_BY_CATEGORY.Backend,
  ...SKILLS_BY_CATEGORY.Tools,
]
