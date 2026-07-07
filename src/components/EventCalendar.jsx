import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarRange } from 'lucide-react'
import EventCard, { categoryConfig } from './EventCard'

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
    const day = parseInt(singleMatch[1])
    if (m === "January" && day === 21) return [21, 22, 23, 24, 26]
    if (m === "November" && day === 17) return [17, 18, 19, 20, 21]
    return [day]
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

function buildMonthGrid(monthConfig) {
  const { year, jsMonth } = monthConfig
  const startDay = new Date(year, jsMonth, 1).getDay()
  const totalDays = new Date(year, jsMonth + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < startDay; i++) cells.push({ day: null })
  for (let d = 1; d <= totalDays; d++) cells.push({ day: d })
  return cells
}

function MonthBlock({ monthConfig, events, index }) {
  const [expandedDay, setExpandedDay] = useState(null)
  const cells = useMemo(() => buildMonthGrid(monthConfig), [monthConfig])

  const dayEventMap = useMemo(() => {
    const map = {}
    events.forEach(event => {
      parseEventDays(event).forEach(day => {
        if (!map[day]) map[day] = []
        // Avoid duplicates for multi-day events
        if (!map[day].find(e => e.title === event.title)) {
          map[day].push(event)
        }
      })
    })
    return map
  }, [events])

  const tbdEvents = useMemo(() => events.filter(e => parseEventDays(e).length === 0), [events])

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
    >
      {/* Month Header — fun vibes */}
      <div className="glass-month-header rounded-t-2xl px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{monthConfig.emoji}</span>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold tracking-wide uppercase text-brand-blue dark:text-white leading-none">
              {monthConfig.name} <span className="text-xs font-bold text-slate-400 dark:text-slate-500 normal-case tracking-normal">{monthConfig.year}</span>
            </h2>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5 italic">
              {monthConfig.vibe}
            </p>
          </div>
        </div>
        {events.length > 0 && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60 dark:text-sky-400/60 bg-brand-blue/5 dark:bg-sky-400/10 px-2.5 py-1 rounded-full border border-brand-blue/10 dark:border-sky-400/20">
            {events.length} event{events.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Grid */}
      <div className="glass-panel rounded-b-2xl rounded-t-none border-t-0 p-3 sm:p-4">
        <div className="grid grid-cols-7 gap-1 mb-1.5">
          {DAYS_HEADER.map(d => (
            <div key={d} className="text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 py-0.5">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, idx) => {
            if (cell.day === null) return <div key={`e-${idx}`} className="aspect-square" />

            const dayEvents = dayEventMap[cell.day] || []
            const hasEvent = dayEvents.length > 0
            const isExpanded = expandedDay === cell.day && hasEvent

            return (
              <div
                key={cell.day}
                onClick={() => hasEvent && setExpandedDay(isExpanded ? null : cell.day)}
                className={`aspect-square rounded-lg sm:rounded-xl flex flex-col items-center justify-center relative transition-all duration-200 ${
                  hasEvent ? 'glass-cell-event' : 'glass-cell'
                } ${isExpanded ? 'ring-2 ring-brand-blue/30 dark:ring-sky-400/40 scale-105' : ''}`}
              >
                <span className={`text-[11px] sm:text-sm font-bold leading-none ${
                  hasEvent ? 'text-slate-800 dark:text-white' : 'text-slate-300 dark:text-slate-700'
                }`}>
                  {cell.day}
                </span>

                {hasEvent && (
                  <div className="flex gap-[2px] mt-[3px]">
                    {dayEvents.slice(0, 3).map((ev, i) => {
                      const cfg = categoryConfig[ev.category]
                      return <span key={i} className={`w-[5px] h-[5px] sm:w-1.5 sm:h-1.5 rounded-full ${cfg?.dotColor || 'bg-gray-400'}`} />
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Expanded day details */}
        {expandedDay && dayEventMap[expandedDay] && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 pt-3 border-t border-slate-200 dark:border-white/10 space-y-2.5"
          >
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-brand-blue/50 dark:text-sky-400/50">
              📍 {monthConfig.name} {expandedDay}
            </p>
            {dayEventMap[expandedDay].map((event, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/70 dark:bg-white/6 border border-slate-200/80 dark:border-white/10">
                <EventCard event={event} />
              </div>
            ))}
          </motion.div>
        )}

        {tbdEvents.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/10 space-y-2.5">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              📌 Date TBD — stay tuned bestie
            </p>
            {tbdEvents.map((event, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/50 dark:bg-white/4 border border-dashed border-slate-200 dark:border-white/10">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  )
}

export default function EventCalendar() {
  const eventsByMonth = useMemo(() => {
    const map = {}
    MONTHS_CONFIG.forEach(m => { map[m.name] = [] })
    EVENT_DATA.forEach(e => { if (map[e.month]) map[e.month].push(e) })
    return map
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Hero intro — GenZ energy */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl p-5 sm:p-6 mb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-brand-blue/6 dark:bg-sky-500/15 text-brand-blue dark:text-sky-400 border border-brand-blue/8 dark:border-sky-500/20 shrink-0">
              <CalendarRange className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-800 dark:text-white leading-tight">
                Your year at ILH, mapped out 🗺️
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed max-w-xl">
                From freshers to fiesta, garba nights to football leagues — we&apos;ve got the whole vibe calendar right here. 
                Tap any highlighted date to see what&apos;s popping. No FOMO allowed. 🚫
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold shrink-0 bg-white/40 dark:bg-white/5 px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-white/8">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> CSR
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Levitas
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Festival
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500"></span> Gravitas
            </span>
          </div>
        </div>
      </motion.div>

      {/* All Months — 2 columns desktop, 1 column mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {MONTHS_CONFIG.map((mc, i) => (
          <MonthBlock key={mc.name} monthConfig={mc} events={eventsByMonth[mc.name]} index={i} />
        ))}
      </div>
    </div>
  )
}
