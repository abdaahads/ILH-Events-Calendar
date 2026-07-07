import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles, Calendar, Info, MapPin } from 'lucide-react'
import EventCard from './EventCard'

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

// Chronological months with their corresponding calendar year
const MONTHS_CONFIG = [
  { name: "August", year: 2026, index: 7 },
  { name: "September", year: 2026, index: 8 },
  { name: "October", year: 2026, index: 9 },
  { name: "November", year: 2026, index: 10 },
  { name: "December", year: 2026, index: 11 },
  { name: "January", year: 2027, index: 0 },
  { name: "February", year: 2027, index: 1 },
  { name: "March", year: 2027, index: 2 }
]

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Map categories to theme colors
const categoryColors = {
  "CSR activity": "bg-emerald-500 text-emerald-400 border-emerald-500/30",
  "Levitas": "bg-sky-500 text-sky-400 border-sky-500/30",
  "Festival": "bg-amber-500 text-amber-400 border-amber-500/30",
  "Gravitas": "bg-purple-500 text-purple-400 border-purple-500/30"
}

// Function to map a date string to specific days on the grid
const getEventDays = (dateStr, monthName) => {
  if (dateStr === "15th") return [15]
  if (dateStr === "29th") return [29]
  if (dateStr === "20th") return [20]
  if (dateStr === "8th") return [8]
  if (dateStr === "4th") return [4]
  if (dateStr === "25th") return [25]
  if (dateStr === "6th") return [6]
  if (dateStr === "5th") return [5]
  
  // Ranges and specials
  if (dateStr === "21st - 25th") return [21, 22, 23, 24, 25]
  if (dateStr === "17th") return [17, 18, 19, 20, 21] // Football league 17-21st
  if (dateStr === "21st" && monthName === "January") return [21, 22, 23, 24, 25, 26] // CSR + Premier League
  if (dateStr === "1st week" && monthName === "September") return [7] // 1st Monday in Sep 2026 is Sep 7th
  
  return [] // TBD or unmappable
}

export default function EventCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0) // August 2026 is index 0
  const [selectedEventId, setSelectedEventId] = useState(null)

  const activeMonth = MONTHS_CONFIG[currentMonthIdx]

  // Filter events belonging to current active month
  const monthEvents = useMemo(() => {
    return EVENT_DATA.filter(event => event.month === activeMonth.name)
  }, [activeMonth])

  // Split into grid-mappable events and non-mappable (TBD / Highlights)
  const { gridEvents, tbdEvents } = useMemo(() => {
    const grid = []
    const tbd = []
    monthEvents.forEach((e, idx) => {
      const days = getEventDays(e.date, activeMonth.name)
      const id = `${e.title}-${idx}`
      const enrichedEvent = { ...e, id, mappedDays: days }
      if (days.length > 0) {
        grid.push(enrichedEvent)
      } else {
        tbd.push(enrichedEvent)
      }
    })
    return { gridEvents: grid, tbdEvents: tbd }
  }, [monthEvents, activeMonth])

  // Selected event highlights mapping
  const activeEvent = useMemo(() => {
    if (!selectedEventId) return null
    return monthEvents.find((e, idx) => `${e.title}-${idx}` === selectedEventId)
  }, [selectedEventId, monthEvents])

  // Generate calendar grid details using Date API
  const gridCells = useMemo(() => {
    const { year, index } = activeMonth
    // Get start day index of the month (0 = Sunday, 1 = Monday, etc.)
    const startDayIndex = new Date(year, index, 1).getDay()
    // Get number of days in the month
    const totalDays = new Date(year, index + 1, 0).getDate()

    const cells = []

    // Padding empty cells before day 1
    for (let i = 0; i < startDayIndex; i++) {
      cells.push({ dayNumber: null, isPlaceholder: true, events: [] })
    }

    // Days in the month
    for (let day = 1; day <= totalDays; day++) {
      // Find events matching this day
      const matchingEvents = gridEvents.filter(e => e.mappedDays.includes(day))
      cells.push({
        dayNumber: day,
        isPlaceholder: false,
        events: matchingEvents
      })
    }

    return cells
  }, [activeMonth, gridEvents])

  // Nav Handlers
  const handlePrevMonth = () => {
    setCurrentMonthIdx(prev => (prev > 0 ? prev - 1 : MONTHS_CONFIG.length - 1))
    setSelectedEventId(null)
  }

  const handleNextMonth = () => {
    setCurrentMonthIdx(prev => (prev < MONTHS_CONFIG.length - 1 ? prev + 1 : 0))
    setSelectedEventId(null)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      {/* Dynamic Month Selector Header */}
      <div className="flex items-center justify-between gap-4 mb-8 glass-panel px-6 py-4 rounded-2xl border border-black/5 dark:border-white/10">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-all duration-300"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-nexa font-extrabold tracking-wide uppercase text-slate-800 dark:text-white transition-colors duration-300">
            {activeMonth.name} {activeMonth.year}
          </h2>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-white/40 font-semibold tracking-widest uppercase mt-0.5">
            Active Month View
          </p>
        </div>

        <button
          onClick={handleNextMonth}
          className="p-2 rounded-xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-all duration-300"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main Split Layout: Calendar Grid (Left) & Detailed Info (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Calendar Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm relative overflow-hidden">
            {/* Visual indicators mapping summary */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-black/5 dark:border-white/10 text-xs">
              <span className="font-semibold text-slate-600 dark:text-white/70 uppercase tracking-wider">Legend</span>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-white/60 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> CSR
                </span>
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-white/60 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Levitas
                </span>
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-white/60 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Festival
                </span>
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-white/60 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Gravitas
                </span>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 mb-3 text-center">
              {DAYS_OF_WEEK.map(day => (
                <div 
                  key={day} 
                  className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-white/30 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid Cells */}
            <div className="grid grid-cols-7 gap-2.5">
              {gridCells.map((cell, idx) => {
                const hasEvents = cell.events.length > 0
                // Check if current cell contains the active selected event
                const isCellSelected = cell.events.some(e => e.id === selectedEventId)
                
                // Color dots class list for the day
                const primaryEvent = cell.events[0]
                const dotColorClass = primaryEvent ? categoryColors[primaryEvent.category] : ''

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (hasEvents) {
                        setSelectedEventId(cell.events[0].id)
                      }
                    }}
                    className={`aspect-square sm:aspect-video md:aspect-square flex flex-col justify-between p-2 rounded-2xl border transition-all duration-300 relative ${
                      cell.isPlaceholder
                        ? "border-transparent bg-transparent opacity-0 pointer-events-none"
                        : hasEvents
                        ? `cursor-pointer ${
                            isCellSelected
                              ? "bg-white/80 dark:bg-white/10 border-slate-700 dark:border-white/30 scale-105 shadow-md"
                              : "bg-white/40 dark:bg-white/3 hover:bg-white/60 dark:hover:bg-white/5 border-black/5 dark:border-white/5 hover:scale-[1.02]"
                          }`
                        : "border-black/[0.02] dark:border-white/[0.02] bg-black/[0.01] dark:bg-white/[0.01] text-slate-400 dark:text-white/20 select-none"
                    }`}
                  >
                    {/* Day Number */}
                    <span className={`text-xs sm:text-sm font-extrabold ${
                      hasEvents 
                        ? "text-slate-800 dark:text-white" 
                        : "text-slate-400 dark:text-white/15"
                    }`}>
                      {cell.dayNumber}
                    </span>

                    {/* Event indicators */}
                    {hasEvents && (
                      <div className="flex flex-col gap-1 mt-1">
                        {/* Mobile: Mini indicator dot */}
                        <div className="flex items-center gap-1">
                          {cell.events.map((event, eventIdx) => {
                            const catColor = categoryColors[event.category]?.split(' ')[0]
                            return (
                              <span 
                                key={eventIdx} 
                                className={`w-2 h-2 rounded-full ${catColor} shadow-sm`}
                                title={event.title}
                              ></span>
                            )
                          })}
                        </div>
                        {/* Desktop: Tiny title preview */}
                        <span className="hidden md:block text-[9px] font-semibold truncate leading-none text-slate-600 dark:text-white/60">
                          {cell.events[0].title.slice(0, 12)}...
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Event Details Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Month Events Summary Card */}
          <div className="glass-panel p-6 rounded-3xl border border-black/5 dark:border-white/10 relative overflow-hidden">
            <h3 className="text-lg font-nexa font-extrabold tracking-wide uppercase text-slate-800 dark:text-white mb-4 border-b border-black/5 dark:border-white/10 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Month Highlights ({monthEvents.length})</span>
            </h3>

            {/* List of mappable events in this month */}
            {gridEvents.length > 0 && (
              <div className="space-y-4 mb-6">
                <p className="text-[10px] text-slate-500 dark:text-white/40 uppercase tracking-widest font-extrabold">Scheduled Events</p>
                <div className="space-y-3">
                  {gridEvents.map((event, idx) => {
                    const isSelected = selectedEventId === event.id
                    return (
                      <div
                        key={event.id}
                        onClick={() => setSelectedEventId(isSelected ? null : event.id)}
                        className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-brand-blue/10 dark:bg-white/10 border-brand-blue/40 dark:border-white/30 shadow-sm"
                            : "bg-white/30 dark:bg-white/2 border-black/5 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/5"
                        }`}
                      >
                        <EventCard event={event} index={idx} isMini={true} />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Flexible / TBD events in this month */}
            {tbdEvents.length > 0 && (
              <div className="space-y-4">
                <p className="text-[10px] text-slate-500 dark:text-white/40 uppercase tracking-widest font-extrabold">Flexible & TBD Events</p>
                <div className="space-y-3">
                  {tbdEvents.map((event, idx) => (
                    <div
                      key={event.id}
                      className="p-4 rounded-2xl border bg-white/30 dark:bg-white/2 border-black/5 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300"
                    >
                      <EventCard event={event} index={idx} isMini={true} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {monthEvents.length === 0 && (
              <div className="text-center py-12 text-slate-400 dark:text-white/30">
                No events scheduled for this month.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
