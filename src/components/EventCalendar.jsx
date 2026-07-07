import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { CalendarRange, MapPin } from 'lucide-react'
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

const MONTH_META = {
  "August":    { emoji: "🇮🇳", vibe: "Freedom & Freshers szn" },
  "September": { emoji: "🎉", vibe: "Ganpati Bappa Morya!" },
  "October":   { emoji: "💃", vibe: "Garba nights hit different" },
  "November":  { emoji: "🪔", vibe: "Diwali + Football era" },
  "December":  { emoji: "🎄", vibe: "Winter Fest loading…" },
  "January":   { emoji: "🏏", vibe: "New year, new league" },
  "February":  { emoji: "💰", vibe: "Adulting is real, fam" },
  "March":     { emoji: "🎊", vibe: "Grand Finale szn" }
}

const MONTH_ORDER = ["August", "September", "October", "November", "December", "January", "February", "March"]

export default function EventCalendar() {
  // Build ordered timeline: [{type:'month', ...}, {type:'event', ...}, ...]
  const timeline = useMemo(() => {
    const items = []
    MONTH_ORDER.forEach(month => {
      const meta = MONTH_META[month]
      const monthEvents = EVENT_DATA.filter(e => e.month === month)
      items.push({ type: 'month', month, ...meta, eventCount: monthEvents.length })
      monthEvents.forEach(event => {
        items.push({ type: 'event', event })
      })
    })
    return items
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:px-6">
      {/* Hero — compact, mobile-first */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl p-4 sm:p-5 mb-8"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-sky-400/10 text-sky-400 border border-sky-400/15 shrink-0">
            <CalendarRange className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-extrabold text-white leading-tight">
              Your year at ILH, mapped out 🗺️
            </h2>
            <p className="text-[11px] sm:text-xs text-white/45 mt-1 leading-relaxed">
              From freshers to fiesta — the complete vibe timeline. No FOMO allowed 🚫
            </p>
          </div>
        </div>

        {/* Legend — horizontal scroll on mobile */}
        <div className="flex gap-3 mt-4 pt-3 border-t border-white/5 overflow-x-auto no-scrollbar">
          {[
            { label: "CSR", color: "bg-emerald-400", glow: "dot-csr" },
            { label: "Levitas", color: "bg-sky-400", glow: "dot-levitas" },
            { label: "Festival", color: "bg-amber-400", glow: "dot-festival" },
            { label: "Gravitas", color: "bg-violet-400", glow: "dot-gravitas" }
          ].map(l => (
            <span key={l.label} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-white/60 whitespace-nowrap">
              <span className={`w-2 h-2 rounded-full ${l.color} ${l.glow}`}></span> {l.label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* === VERTICAL TIMELINE === */}
      <div className="relative">
        {/* The glowing vertical line — left-aligned for mobile readability */}
        <div className="absolute left-[18px] sm:left-[22px] top-0 bottom-0 w-[2px] timeline-line"></div>

        <div className="space-y-0">
          {timeline.map((item, i) => {
            if (item.type === 'month') {
              return (
                <motion.div
                  key={`month-${item.month}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="relative flex items-center gap-3 py-5"
                >
                  {/* Month marker dot on the line */}
                  <div className="relative z-10 shrink-0 w-[38px] sm:w-[46px] h-[38px] sm:h-[46px] rounded-full bg-brand-dark border-2 border-sky-400/40 month-marker flex items-center justify-center">
                    <span className="text-base sm:text-lg">{item.emoji}</span>
                  </div>

                  {/* Month label */}
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-extrabold text-white uppercase tracking-wide leading-none">
                      {item.month}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-white/35 font-semibold italic mt-0.5">
                      {item.vibe}
                    </p>
                  </div>

                  {item.eventCount > 0 && (
                    <span className="ml-auto text-[9px] font-bold uppercase tracking-widest text-sky-400/50 bg-sky-400/8 px-2 py-0.5 rounded-full border border-sky-400/15 shrink-0">
                      {item.eventCount}
                    </span>
                  )}
                </motion.div>
              )
            }

            // Event card
            const cfg = categoryConfig[item.event.category]
            return (
              <motion.div
                key={`event-${item.event.title}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="relative flex gap-3 pb-4"
              >
                {/* Small dot on the timeline */}
                <div className="relative z-10 shrink-0 w-[38px] sm:w-[46px] flex justify-center pt-5">
                  <div className={`w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-full ${cfg?.dotColor || 'bg-gray-400'} ${cfg?.dotGlow || ''}`}></div>
                </div>

                {/* Event card — takes remaining width */}
                <div className="flex-1 min-w-0">
                  <EventCard event={item.event} />
                </div>
              </motion.div>
            )
          })}

          {/* End marker */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative flex items-center gap-3 py-5"
          >
            <div className="relative z-10 shrink-0 w-[38px] sm:w-[46px] h-[38px] sm:h-[46px] rounded-full bg-brand-dark border-2 border-emerald-400/30 flex items-center justify-center">
              <span className="text-base sm:text-lg">🏁</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white/30 uppercase tracking-widest">
                That&apos;s the whole szn, fam 🫡
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
