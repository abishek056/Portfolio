import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-neutral-900/60 backdrop-blur-md border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-all duration-300 shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
