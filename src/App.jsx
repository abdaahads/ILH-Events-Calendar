import React, { useState, useEffect } from 'react'
import LeafCanvas from './components/LeafCanvas'
import Header from './components/Header'
import EventCalendar from './components/EventCalendar'

export default function App() {
  // Try to read theme from localstorage, default to dark
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <div className="relative min-h-screen w-full flex flex-col z-0">
      {/* 3D Background Canvas Layer */}
      <LeafCanvas isDark={isDark} />

      {/* DOM Overlay Foreground UI */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Header isDark={isDark} onToggleTheme={toggleTheme} />
        <main className="flex-1 w-full max-w-7xl mx-auto py-6">
          <EventCalendar />
        </main>
        
        {/* Sticky/Fixed Premium Footer */}
        <footer className="w-full text-center py-6 mt-12 border-t border-black/5 dark:border-white/5 glass-panel text-slate-500 dark:text-white/40 text-xs tracking-wider">
          © {new Date().getFullYear()} Ivy League House Tathawade. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
