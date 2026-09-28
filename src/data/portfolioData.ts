export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
}

export interface Skill {
  name: string
  category: 'Frontend' | 'Backend' | '3D & Creative' | 'Tools'
  level: number
}

export const NAV_LINKS = [
  { name: 'Hero', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Interactive 3D Portfolio',
    description: 'Immersive portfolio experience built with React, Three.js/Fiber, and Tailwind CSS.',
    tags: ['React', 'Three.js', 'Tailwind CSS', 'Vite'],
    link: '#',
  },
  {
    id: '2',
    title: 'Modern Web Application',
    description: 'High-performance responsive web platform with sleek dark aesthetics and rich animations.',
    tags: ['TypeScript', 'React', 'Tailwind CSS'],
    link: '#',
  },
  {
    id: '3',
    title: 'Design System & UI Kit',
    description: 'A modular, accessible UI library tailored for modern creative digital products.',
    tags: ['Design System', 'UI/UX', 'CSS'],
    link: '#',
  },
]

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', category: 'Frontend', level: 90 },
  { name: 'TypeScript / JavaScript', category: 'Frontend', level: 90 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 95 },
  { name: 'Three.js / WebGL', category: '3D & Creative', level: 75 },
  { name: 'Node.js', category: 'Backend', level: 80 },
  { name: 'Git & Vite', category: 'Tools', level: 90 },
]
