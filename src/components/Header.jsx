import React from 'react'
import { Sun, Moon, Zap } from 'lucide-react'

export default function Header({ isDark, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img 
          src={isDark ? "/ILH Website - White logo for animation.png" : "/ILH Logo - RGB-COL- Standard Usage - Horizontal Format.png"} 
          alt="ILH Ivy League House Logo" 
          className="h-8 sm:h-9 w-auto object-contain"
        />
        <div className="h-5 w-[1px] bg-brand-blue/10 dark:bg-white/15 hidden sm:block"></div>
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="font-extrabold text-xs tracking-widest uppercase text-brand-blue dark:text-white/80">
            Tathawade
          </span>
          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden xs:block">
          <h1 className="text-sm sm:text-base font-extrabold tracking-widest uppercase text-slate-800 dark:text-white leading-none">
            Event Calendar
          </h1>
          <p className="text-[8px] sm:text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-0.5 tracking-[0.2em] uppercase">
            the ultimate hostel szn guide 🗓️
          </p>
        </div>

        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl border border-brand-blue/8 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-slate-600 dark:text-amber-400 active:scale-90 transition-all duration-200"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  )
}
