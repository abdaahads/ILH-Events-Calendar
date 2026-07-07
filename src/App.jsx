import React from 'react'
import LeafCanvas from './components/LeafCanvas'
import Header from './components/Header'
import EventCalendar from './components/EventCalendar'

export default function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col z-0">
      {/* 3D Background Canvas Layer */}
      <LeafCanvas />

      {/* DOM Overlay Foreground UI */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto py-6">
          <EventCalendar />
        </main>
        
        {/* Sticky/Fixed Premium Footer */}
        <footer className="w-full text-center py-6 mt-12 border-t border-white/5 glass-panel text-white/40 text-xs tracking-wider">
          © {new Date().getFullYear()} Ivy League House Tathawade. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
