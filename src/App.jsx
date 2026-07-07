import React from 'react'
import LeafCanvas from './components/LeafCanvas'
import Header from './components/Header'
import EventCalendar from './components/EventCalendar'
import { Heart, Coffee } from 'lucide-react'

export default function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col z-0">
      <LeafCanvas />
      <div className="relative z-10 flex-1 flex flex-col">
        <Header />
        <main className="flex-1 w-full">
          <EventCalendar />
        </main>
        <footer className="w-full text-center py-6 mt-8 border-t border-white/5 glass-panel">
          <p className="text-white/50 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 flex-wrap">
            <span>Made for residents by</span>
            <span className="font-extrabold text-white/90">Team ILH</span>
            <span>with</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 inline-block animate-pulse" />
            <span>and loads of</span>
            <Coffee className="w-3.5 h-3.5 text-amber-400 inline-block" />
            <span className="font-bold text-amber-400">caffeine</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
