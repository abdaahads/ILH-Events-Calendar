import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarRange, ChevronLeft, ChevronRight, Sparkles, X, Info } from 'lucide-react'
import EventCard, { categoryConfig } from './EventCard'

const EVENT_DATA = [
  {"month": "August", "date": "15th", "day": "Saturday", "title": "Independence Day (ILH Unity Drive)", "category": "Community", "notes": ""},
  {"month": "August", "date": "29th", "day": "Saturday", "title": "Not My Shaadi", "category": "Levitas", "notes": "College Freshers vibe - get dressed up and get ready for a crazy night! 💅🕺"},
  {"month": "September", "date": "21st - 25th", "day": "Mon - Fri", "title": "Ganpati at ILH", "category": "Festival", "notes": "Visarjan on 25th (Friday)"},
  {"month": "September", "date": "6th", "day": "Sunday", "title": "Networking & LinkedIn Workshop", "category": "Gravitas", "notes": "Guest speaker + Brunch 💼"},
  {"month": "October", "date": "17th", "day": "Saturday", "title": "ILH Garba Night Glow", "category": "Festival", "notes": "Practice starting on 15th onwards 💃"},
  {"month": "November", "date": "8th", "day": "Sunday", "title": "The Festival of Lights", "category": "Festival", "notes": "Diwali celebration"},
  {"month": "November", "date": "18th - 21st", "day": "Wed - Sat", "title": "ILH Football League 4.0", "category": "Levitas", "notes": "18th Wednesday - 21st Saturday ⚽"},
  {"month": "December", "date": "6th", "day": "Sunday", "title": "Self defence workshop", "category": "Gravitas", "notes": "Safety first, empower yourself! 🛡️"},
  {"month": "December", "date": "25th", "day": "Friday", "title": "ILH Winter Fest", "category": "Festival", "notes": "Christmas + New Year Eve"},
  {"month": "January", "date": "21st - 24th", "day": "Thu - Sun", "title": "ILH Premier League 5.0", "category": "Levitas", "notes": "Get ready for the ultimate sporting action!"},
  {"month": "January", "date": "26th", "day": "Tuesday", "title": "Republic Day", "category": "Community", "notes": "Celebrating together as one family"},
  {"month": "February", "date": "6th", "day": "Saturday", "title": "Money & Adulting Workshop", "category": "Gravitas", "notes": ""},
  {"month": "March", "date": "5th", "day": "Friday", "title": "ILH Annual Fiesta 4.0", "category": "Levitas", "notes": ""},
  {"month": "March", "date": "TBD", "day": "TBD", "title": "ILH Dastarkhwan", "category": "Festival", "notes": ""}
]

const MONTHS_CONFIG = [
  { name: "August",    year: 2026, jsMonth: 7,  emoji: "🇮🇳", vibe: "Freedom & Freshers szn" },
  { name: "September", year: 2026, jsMonth: 8,  emoji: "🎉", vibe: "Ganpati Bappa Morya!" },
  { name: "October",   year: 2026, jsMonth: 9,  emoji: "💃", vibe: "Garba nights hit different" },
  { name: "November",  year: 2026, jsMonth: 10, emoji: "🪔", vibe: "Diwali + Football era" },
  { name: "December",  year: 2026, jsMonth: 11, emoji: "🎄", vibe: "Winter Fest loading…" },
  { name: "January",   year: 2027, jsMonth: 0,  emoji: "🏏", vibe: "New year, new league" },
  { name: "February",  year: 2027, jsMonth: 1,  emoji: "💰", vibe: "Adulting is real, fam" },
  { name: "March",     year: 2027, jsMonth: 2,  emoji: "🎊", vibe: "Grand Finale szn" }
]

const DAYS_HEADER = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function parseEventDays(event) {
  const d = event.date
  const m = event.month

  const singleMatch = d.match(/^(\d+)(?:st|nd|rd|th)$/)
  if (singleMatch) {
    return [parseInt(singleMatch[1])]
  }

  const rangeMatch = d.match(/^(\d+)(?:st|nd|rd|th)\s*-\s*(\d+)(?:st|nd|rd|th)$/)
  if (rangeMatch) {
    const start = parseInt(rangeMatch[1])
    const end = parseInt(rangeMatch[2])
    const days = []
    for (let i = start; i <= end; i++) days.push(i)
    return days
  }

  if (d === "1st week") {
    if (m === "September") return [1, 2, 3, 4]
    return [1, 2, 3, 4, 5]
  }

  return []
}

function buildMonthGrid(year, jsMonth) {
  const startDay = new Date(year, jsMonth, 1).getDay()
  const totalDays = new Date(year, jsMonth + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < startDay; i++) cells.push({ day: null })
  for (let d = 1; d <= totalDays; d++) cells.push({ day: d })
  return cells
}

export default function EventCalendar() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
  const [activeOverlayEvents, setActiveOverlayEvents] = useState(null) // for clicked dates / details modal

  const activeMonthConfig = MONTHS_CONFIG[currentMonthIndex]

  const monthGridCells = useMemo(() => {
    return buildMonthGrid(activeMonthConfig.year, activeMonthConfig.jsMonth)
  }, [activeMonthConfig])

  const monthEvents = useMemo(() => {
    return EVENT_DATA.filter(e => e.month === activeMonthConfig.name)
  }, [activeMonthConfig])

  const dayEventMap = useMemo(() => {
    const map = {}
    monthEvents.forEach(event => {
      parseEventDays(event).forEach(day => {
        if (!map[day]) map[day] = []
        if (!map[day].find(e => e.title === event.title)) {
          map[day].push(event)
        }
      })
    })
    return map
  }, [monthEvents])

  const tbdEvents = useMemo(() => {
    return monthEvents.filter(e => parseEventDays(e).length === 0)
  }, [monthEvents])

  const handlePrevMonth = () => {
    setActiveOverlayEvents(null)
    setCurrentMonthIndex(prev => (prev === 0 ? MONTHS_CONFIG.length - 1 : prev - 1))
  }

  const handleNextMonth = () => {
    setActiveOverlayEvents(null)
    setCurrentMonthIndex(prev => (prev === MONTHS_CONFIG.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:px-6">
      {/* Manifesto / Culture Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel rounded-3xl p-6 sm:p-8 mb-8 border border-white/10"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>More than just events</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            The heartbeat of <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">ILH Culture</span>.
          </h2>

          <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-medium">
            At Ivy League House, we don&apos;t just throw events to check boxes. We build them because they are the foundation of what ILH stands for: <strong className="text-white font-bold">the absolute best resident experience</strong> we can offer.
          </p>

          {/* Pillars Legend */}
          <div className="pt-4 border-t border-white/8">
            <div className="grid grid-cols-2 gap-3 text-[10px] sm:text-[11px] font-bold">
              <div className="flex items-center gap-2 text-white/80">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 dot-csr"></span>
                <span>Community (Outreach)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 dot-levitas"></span>
                <span>Levitas (Parties & Sports)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 dot-festival"></span>
                <span>Festival (Celebrations)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400 dot-gravitas"></span>
                <span>Gravitas (Growth & Workshops)</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* === CALENDAR CONTAINER === */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden mb-6 relative min-h-[400px] flex flex-col justify-between">
        <div>
          {/* Month Selector Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 bg-white/3">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 text-white active:scale-90 transition-all duration-150"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-center">
              <span className="text-2xl mr-1.5">{activeMonthConfig.emoji}</span>
              <span className="text-lg font-black tracking-wide uppercase text-white">
                {activeMonthConfig.name}
              </span>
              <span className="text-xs font-bold text-white/40 ml-2">{activeMonthConfig.year}</span>
              <p className="text-[10px] text-white/40 font-semibold italic mt-0.5">
                {activeMonthConfig.vibe}
              </p>
            </div>

            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 text-white active:scale-90 transition-all duration-150"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Calendar Grid & Days of Week */}
          <div className="p-4 sm:p-5 relative">
            <div className="grid grid-cols-7 gap-1.5 mb-3">
              {DAYS_HEADER.map(d => (
                <div key={d} className="text-center text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/30">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {monthGridCells.map((cell, idx) => {
                if (cell.day === null) {
                  return <div key={`empty-${idx}`} className="aspect-square" />
                }

                const dayEvents = dayEventMap[cell.day] || []
                const hasEvent = dayEvents.length > 0

                let cellClass = "glass-cell text-white/40"
                if (hasEvent) {
                  const primaryEvent = dayEvents[0]
                  const cfg = categoryConfig[primaryEvent.category]
                  cellClass = `glass-cell-event border border-${cfg?.dotColor.replace('bg-', '')}/30 text-white font-bold`
                }

                return (
                  <div
                    key={cell.day}
                    className="relative group aspect-square"
                  >
                    <button
                      onClick={() => hasEvent && setActiveOverlayEvents({ type: 'date', title: `${activeMonthConfig.name} ${cell.day}`, events: dayEvents })}
                      className={`w-full h-full rounded-2xl flex flex-col items-center justify-center relative transition-all duration-200 ${cellClass}`}
                    >
                      <span className="text-xs sm:text-sm">{cell.day}</span>
                      
                      {hasEvent && (
                        <div className="flex gap-0.5 mt-1">
                          {dayEvents.slice(0, 3).map((ev, i) => {
                            const cfg = categoryConfig[ev.category]
                            return (
                              <span key={i} className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${cfg?.dotColor || 'bg-gray-400'} ${cfg?.dotGlow || ''}`} />
                            )
                          })}
                        </div>
                      )}
                    </button>

                    {/* Hover Tooltip (Desktop) */}
                    {hasEvent && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 hidden md:group-hover:block pointer-events-none z-30 bg-[#0a1128]/95 backdrop-blur border border-white/12 p-3.5 rounded-2xl shadow-2xl space-y-1.5">
                        {dayEvents.map((ev, i) => {
                          const cfg = categoryConfig[ev.category]
                          return (
                            <div key={i} className="space-y-1">
                              <span className={`text-[9px] font-extrabold uppercase tracking-widest ${cfg?.accentColor}`}>
                                {cfg?.label}
                              </span>
                              <p className="text-xs font-bold text-white leading-tight">
                                {ev.title}
                              </p>
                              {ev.notes && (
                                <p className="text-[10px] text-white/45 italic leading-normal">
                                  {ev.notes}
                                </p>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* TBD Events Banner inside calendar panel (since no days below it) */}
        {tbdEvents.length > 0 && (
          <div className="px-5 py-4 bg-white/2 border-t border-white/6 flex items-center justify-between flex-wrap gap-2.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-white/40 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-white/30" />
              <span>Dates to be announced</span>
            </span>
            <div className="flex gap-2 flex-wrap">
              {tbdEvents.map((event, i) => (
                <button
                  key={i}
                  onClick={() => setActiveOverlayEvents({ type: 'tbd', title: event.title, events: [event] })}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/8 text-[11px] font-bold text-white tracking-wide active:scale-95 transition-all duration-150"
                >
                  📌 {event.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* === DETAILED EVENT OVERLAY MODAL === */}
        <AnimatePresence>
          {activeOverlayEvents && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#060d1f]/95 backdrop-blur-lg z-40 p-5 sm:p-6 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between border-b border-white/8 pb-3">
                <span className="text-xs font-black uppercase tracking-widest text-white/40">
                  {activeOverlayEvents.type === 'tbd' ? 'Coming Soon Bestie' : `Events on ${activeOverlayEvents.title}`}
                </span>
                <button
                  onClick={() => setActiveOverlayEvents(null)}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/8 hover:bg-white/10 text-white active:scale-90 transition-all"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 py-6 overflow-y-auto space-y-4 justify-center flex flex-col no-scrollbar">
                {activeOverlayEvents.events.map((event, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.95, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>

              <div className="text-center text-[10px] font-bold text-white/30 uppercase tracking-widest pt-2 border-t border-white/5">
                tap close to return to calendar
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helpful mobile hint */}
      <p className="text-center text-[10px] text-white/30 font-bold uppercase tracking-widest mt-4">
        💡 Tap any highlighted date or TBD button to see the vibe details!
      </p>
    </div>
  )
}
