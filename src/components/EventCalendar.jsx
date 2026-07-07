import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EventCard from './EventCard'
import { Filter, CalendarRange, Info } from 'lucide-react'

const EVENT_DATA = [
  {"month": "August", "date": "15th", "day": "Saturday", "title": "Independence Day (ILH Unity Drive)", "category": "CSR activity", "notes": ""},
  {"month": "August", "date": "29th", "day": "Saturday", "title": "Not My Shaadi", "category": "Levitas", "notes": "Freshers"},
  {"month": "September", "date": "21st - 25th", "day": "Mon - Fri", "title": "Ganpati at ILH", "category": "Festival", "notes": "Visarjan on 25th (Friday)"},
  {"month": "September", "date": "1st week", "day": "Monday", "title": "Networking & LinkedIn Workshop", "category": "Gravitas", "notes": "Guest speaker + Brunch"},
  {"month": "October", "date": "20th", "day": "Tuesday", "title": "ILH Garba Night Glow (calory Burn Fest)", "category": "Festival", "notes": "Practice starting on 15th onwards"},
  {"month": "November", "date": "8th", "day": "Sunday", "title": "The Festival of Lights", "category": "Festival", "notes": "Diwali celebration"},
  {"month": "November", "date": "17th", "day": "Tuesday", "title": "ILH Football League 4.0", "category": "Levitas", "notes": "17th Tuesday - 21st Saturday"},
  {"month": "December", "date": "4th", "day": "Friday", "title": "Self defence workshop", "category": "Gravitas", "notes": ""},
  {"month": "December", "date": "25th", "day": "Friday", "title": "ILH Winter Fest", "category": "Festival", "notes": "Christmas + New Year Eve"},
  {"month": "January", "date": "21st", "day": "TBD", "title": "ILH Premier League 5.0 + Republic Day + CSR activity", "category": "CSR activity", "notes": "21st, 22nd, 23rd, 24th and 26th"},
  {"month": "February", "date": "6th", "day": "Saturday", "title": "Money & Adulting Workshop", "category": "Gravitas", "notes": ""},
  {"month": "February", "date": "TBD", "day": "TBD", "title": "Fiesta Prep", "category": "Levitas", "notes": ""},
  {"month": "March", "date": "5th", "day": "Friday", "title": "ILH Annual Fiesta 4.0", "category": "Levitas", "notes": ""},
  {"month": "March", "date": "TBD", "day": "TBD", "title": "ILH Dastarkhwan", "category": "Festival", "notes": "on occasion of 21st (Iftar Party)"}
]

const CHRONOLOGICAL_MONTHS = [
  "August", "September", "October", "November", "December", "January", "February", "March"
]

const CATEGORIES = ["All", "CSR activity", "Levitas", "Festival", "Gravitas"]

export default function EventCalendar() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Calculate counts for each category badge in the filter tabs
  const categoryCounts = useMemo(() => {
    const counts = { All: EVENT_DATA.length }
    CATEGORIES.slice(1).forEach(cat => {
      counts[cat] = EVENT_DATA.filter(e => e.category === cat).length
    })
    return counts
  }, [])

  // Filter events
  const filteredEvents = useMemo(() => {
    if (selectedCategory === "All") return EVENT_DATA
    return EVENT_DATA.filter(event => event.category === selectedCategory)
  }, [selectedCategory])

  // Group filtered events by month (preserving chronological order)
  const groupedEvents = useMemo(() => {
    const groups = {}
    CHRONOLOGICAL_MONTHS.forEach(m => {
      groups[m] = []
    })
    filteredEvents.forEach(event => {
      if (groups[event.month]) {
        groups[event.month].push(event)
      }
    })
    // Filter out months with no events
    return Object.fromEntries(
      Object.entries(groups).filter(([_, events]) => events.length > 0)
    )
  }, [filteredEvents])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Introduction Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl p-6 mb-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-blue/30 rounded-xl border border-white/10 text-sky-400">
            <CalendarRange className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-nexa font-extrabold text-white mb-1">Ivy League House (ILH) Tathawade</h2>
            <p className="text-sm text-white/60 leading-relaxed max-w-2xl">
              Welcome to the central events hub. Discover CSR drives, cultural festivals, competitive sports, and personal development workshops curated to elevate student living.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 shrink-0 self-start md:self-auto">
          <Info className="w-3.5 h-3.5" />
          <span>Select filters below to narrow down events</span>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-white/80">
          <Filter className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-semibold uppercase tracking-wider">Filter Categories</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(category => {
            const isActive = selectedCategory === category
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide border transition-all duration-300 ${
                  isActive 
                    ? "bg-white text-brand-dark border-white shadow-lg" 
                    : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{category === 'CSR activity' ? 'CSR' : category}</span>
                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive 
                    ? "bg-brand-dark/15 text-brand-dark" 
                    : "bg-white/10 text-white/50"
                }`}>
                  {categoryCounts[category]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Events Grid grouped by Months */}
      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {Object.keys(groupedEvents).length > 0 ? (
            CHRONOLOGICAL_MONTHS.map(month => {
              const events = groupedEvents[month]
              if (!events || events.length === 0) return null

              return (
                <motion.section 
                  key={month}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Month Heading */}
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-nexa font-extrabold tracking-wide uppercase bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
                      {month}
                    </h2>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                  </div>

                  {/* Event Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, idx) => (
                      <EventCard 
                        key={`${event.title}-${idx}`} 
                        event={event} 
                        index={idx}
                      />
                    ))}
                  </div>
                </motion.section>
              )
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 glass-panel rounded-2xl border border-white/10"
            >
              <p className="text-white/50 text-lg">No events found in this category.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
