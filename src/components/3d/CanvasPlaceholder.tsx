import React from 'react'

interface CanvasPlaceholderProps {
  title?: string
  subtitle?: string
}

export const CanvasPlaceholder: React.FC<CanvasPlaceholderProps> = ({
  title = 'Interactive 3D Canvas',
  subtitle = 'Three.js / React Three Fiber scene ready to be integrated',
}) => {
  return (
    <div className="relative w-full h-72 md:h-96 rounded-2xl border border-dashed border-indigo-500/30 bg-gradient-to-b from-indigo-950/20 via-neutral-900/30 to-purple-950/20 flex flex-col items-center justify-center text-center p-6 overflow-hidden group">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-500" />
      <div className="relative z-10 flex flex-col items-center space-y-3">
        <div className="w-16 h-16 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-8 h-8 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-neutral-200">{title}</h4>
        <p className="text-xs text-neutral-400 max-w-sm">{subtitle}</p>
        <span className="inline-block text-[11px] font-mono px-2.5 py-1 rounded bg-neutral-800/80 text-indigo-300 border border-neutral-700/60 mt-1">
          src/components/3d/
        </span>
      </div>
    </div>
  )
}
