import React from 'react'
import { Sun, Moon } from 'lucide-react'

export default function Header({ isDark, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-black/5 dark:border-white/10 px-6 py-4 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Dynamic logo based on light/dark mode */}
        <img 
          src={isDark ? "/ILH Website - White logo for animation.png" : "/ILH Logo - RGB-COL- Standard Usage - Horizontal Format.png"} 
          alt="ILH Ivy League House Logo" 
          className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
        />
        <div className="h-6 w-[1px] bg-black/10 dark:bg-white/20 hidden sm:block"></div>
        <div className="hidden sm:block">
          <p className="font-nexa font-extrabold text-lg tracking-wide uppercase text-slate-700 dark:text-white/90">
            Tathawade
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right hidden xs:block">
          <h1 className="text-lg sm:text-xl font-nexa font-extrabold tracking-wide uppercase text-slate-800 dark:text-white leading-none">
            Event Calendar
          </h1>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-white/50 font-medium mt-1 tracking-widest uppercase">
            Ivy League House • 2026-2027
          </p>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/70 dark:hover:bg-white/10 text-slate-700 dark:text-yellow-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>
      </div>
    </header>
  )
}
