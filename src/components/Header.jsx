import React from 'react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 px-6 py-4 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-4">
        <img 
          src="/ILH Website - White logo for animation.png" 
          alt="ILH Ivy League House Logo" 
          className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
        />
        <div className="h-6 w-[1px] bg-white/20 hidden sm:block"></div>
        <div className="hidden sm:block">
          <p className="font-nexa font-extrabold text-lg tracking-wide uppercase bg-gradient-to-r from-white via-white/90 to-white/75 bg-clip-text text-transparent">
            Tathawade
          </p>
        </div>
      </div>

      <div className="text-right">
        <h1 className="text-xl sm:text-2xl font-nexa font-extrabold tracking-wide uppercase bg-gradient-to-r from-white via-brand-grey to-white/60 bg-clip-text text-transparent m-0 leading-none">
          Event Calendar
        </h1>
        <p className="text-xs text-white/50 font-medium mt-1 tracking-widest uppercase">
          Ivy League House • 2026-2027
        </p>
      </div>
    </header>
  )
}
