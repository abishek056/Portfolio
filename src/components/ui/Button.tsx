import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseClasses =
    'px-5 py-2.5 rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm text-sm'

  const variants = {
    primary:
      'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-95',
    secondary:
      'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 active:scale-95',
    outline:
      'bg-transparent hover:bg-neutral-850 text-indigo-400 border border-indigo-500/40 hover:border-indigo-400 active:scale-95',
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
