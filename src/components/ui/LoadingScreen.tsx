import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoImg from '../../assets/image/logo.png'

interface LoadingScreenProps {
  onComplete?: () => void
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(15)
  const [statusText, setStatusText] = useState('Initializing 3D Engine...')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Stage 1: Fast start
    const t1 = setTimeout(() => {
      setProgress(45)
      setStatusText('Loading Shaders & Geometries...')
    }, 180)

    // Stage 2: Middle
    const t2 = setTimeout(() => {
      setProgress(80)
      setStatusText('Compiling Materials...')
    }, 450)

    // Stage 3: Finish
    const t3 = setTimeout(() => {
      setProgress(100)
      setStatusText('System Ready')
    }, 750)

    // Stage 4: Trigger exit
    const t4 = setTimeout(() => {
      setIsDone(true)
      if (onComplete) onComplete()
    }, 950)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080e] overflow-hidden select-none"
        >
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#4f46e512_1px,transparent_1px)] [background-size:2rem_2rem] opacity-50 pointer-events-none" />

          {/* Ambient center radial glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-indigo-600/15 blur-[90px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-500/10 blur-[70px] pointer-events-none" />

          {/* Center Content Box */}
          <div className="relative z-10 flex flex-col items-center max-w-xs w-full px-6 space-y-6">
            {/* Pulsing Logo Container */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    '0 0 20px rgba(99,102,241,0.25)',
                    '0 0 35px rgba(99,102,241,0.5)',
                    '0 0 20px rgba(99,102,241,0.25)',
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: 'easeInOut',
                }}
                className="w-16 h-16 rounded-2xl bg-neutral-900/90 border border-indigo-500/40 p-2.5 flex items-center justify-center backdrop-blur-md"
              >
                <img
                  src={logoImg}
                  alt="Loading Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                />
              </motion.div>

              {/* Orbital spinning cyber ring */}
              <div className="absolute -inset-2 rounded-full border border-indigo-500/20 border-t-indigo-400 animate-spin" />
            </div>

            {/* Brand Title */}
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white tracking-wider uppercase font-mono">
                Abishek<span className="text-indigo-400">.</span>
              </h3>
              <p className="text-[11px] font-mono text-neutral-400 tracking-widest uppercase">
                Interactive Portfolio
              </p>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-2">
              <div className="w-full bg-neutral-900/80 rounded-full h-1.5 overflow-hidden p-0.5 border border-neutral-800">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-purple-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeInOut', duration: 0.25 }}
                />
              </div>

              {/* Status and Percentage */}
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                <span className="truncate pr-2">{statusText}</span>
                <span className="text-indigo-400 font-semibold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Bottom HUD tag */}
          <div className="absolute bottom-6 text-[10px] font-mono text-neutral-400 tracking-wider">
            PORTFOLIO // V2.0 // REACT 19 + THREE.JS
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default LoadingScreen
