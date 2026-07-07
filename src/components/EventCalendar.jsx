import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { CalendarRange, Sparkles, Heart, Compass, Award } from 'lucide-react'
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
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:px-6">
      {/* Manifesto / Culture Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel rounded-3xl p-6 sm:p-8 mb-10 border border-white/10"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>More than just events</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            The heartbeat of <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">ILH Culture</span>.
          </h2>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed font-medium">
            At Ivy League House, we don&apos;t just throw events to check boxes or fill space on a wall. 
            We build these moments because they are the foundation of what ILH stands for: <strong className="text-white font-bold">the absolute best, most unforgettable resident experience</strong> we can offer. 
          </p>

          <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
            This is your home, your community, and your playground. Whether it&apos;s giving back to society, rallying together for local festivals, growing through expert-led masterclasses, or absolute madness at our signature parties — every single date represents a core pillar of our resident lifestyle.
          </p>

          {/* Quick Stats / Category Legend */}
          <div className="pt-4 border-t border-white/8">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
              Explore our core pillars
            </p>
            <div className="grid grid-cols-2 gap-3 text-[11px] font-bold">
              <div className="flex items-center gap-2 text-white/80">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 dot-csr"></span>
                <span>CSR (Giving Back)</span>
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
                <span>Gravitas (Adulting & Growth)</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* === VERTICAL TIMELINE === */}
      <div className="relative">
        {/* The glowing vertical line */}
        <div className="absolute left-[18px] sm:left-[22px] top-0 bottom-0 w-[2px] timeline-line"></div>

        <div className="space-y-2">
          {timeline.map((item, i) => {
            if (item.type === 'month') {
              return (
                <motion.div
                  key={`month-${item.month}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="relative flex items-center gap-3 py-6"
                >
                  {/* Month marker dot on the line */}
                  <div className="relative z-10 shrink-0 w-[38px] sm:w-[46px] h-[38px] sm:h-[46px] rounded-full bg-[#060d1f] border-2 border-sky-400/40 month-marker flex items-center justify-center">
                    <span className="text-lg">{item.emoji}</span>
                  </div>

                  {/* Month label */}
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider leading-none">
                      {item.month}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/40 font-semibold italic mt-1">
                      {item.vibe}
                    </p>
                  </div>

                  {item.eventCount > 0 && (
                    <span className="ml-auto text-[10px] font-extrabold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-400/20 shrink-0">
                      {item.eventCount} vibe{item.eventCount > 1 ? 's' : ''}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="relative flex gap-3 pb-6"
              >
                {/* Small dot on the timeline */}
                <div className="relative z-10 shrink-0 w-[38px] sm:w-[46px] flex justify-center pt-6">
                  <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ${cfg?.dotColor || 'bg-gray-400'} ${cfg?.dotGlow || ''} border-2 border-[#060d1f]`}></div>
                </div>

                {/* Event card */}
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
            className="relative flex items-center gap-3 py-6"
          >
            <div className="relative z-10 shrink-0 w-[38px] sm:w-[46px] h-[38px] sm:h-[46px] rounded-full bg-[#060d1f] border-2 border-emerald-400/30 flex items-center justify-center">
              <span className="text-lg">🏁</span>
            </div>
            <div>
              <p className="text-xs font-black text-white/30 uppercase tracking-widest">
                That&apos;s the whole szn, fam 🫡
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
