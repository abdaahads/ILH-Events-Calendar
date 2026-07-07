import React from 'react'
import { Zap } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <img 
          src="/ILH Website - White logo for animation.png" 
          alt="ILH Logo" 
          className="h-8 w-auto object-contain"
        />
        <div className="h-4 w-[1px] bg-white/10"></div>
        <span className="font-extrabold text-[10px] tracking-[0.2em] uppercase text-white/60">
          Tathawade
        </span>
      </div>

      <div className="text-right">
        <div className="flex items-center gap-1.5 justify-end">
          <h1 className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-white leading-none">
            Event Calendar
          </h1>
          <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
        </div>
        <p className="text-[8px] text-white/35 font-bold mt-0.5 tracking-[0.15em] uppercase">
          the hostel szn guide 🗓️
        </p>
      </div>
    </header>
  )
}
