import React, { useState, useEffect } from 'react'
import LeafCanvas from './components/LeafCanvas'
import Header from './components/Header'
import EventCalendar from './components/EventCalendar'
import { Heart, Coffee } from 'lucide-react'

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('ilh-theme')
    return saved ? saved === 'dark' : false
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('ilh-theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('ilh-theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <div className="relative min-h-screen w-full flex flex-col z-0">
      <LeafCanvas isDark={isDark} />

      <div className="relative z-10 flex-1 flex flex-col">
        <Header isDark={isDark} onToggleTheme={toggleTheme} />
        <main className="flex-1 w-full">
          <EventCalendar />
        </main>
        
        <footer className="w-full text-center py-6 mt-8 border-t border-brand-blue/5 dark:border-white/5 glass-panel">
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 flex-wrap">
            <span>Made for residents by</span>
            <span className="font-extrabold text-brand-blue dark:text-white">Team ILH</span>
            <span>with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline-block animate-pulse" />
            <span>and loads of</span>
            <Coffee className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 inline-block" />
            <span className="font-bold text-amber-700 dark:text-amber-400">caffeine</span>
            <span>☕</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
