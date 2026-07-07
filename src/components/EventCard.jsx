import React from 'react'
import { Calendar, FileText, Compass, Award, Sparkles, Heart, Tag } from 'lucide-react'

const categoryConfig = {
  "CSR activity": {
    dotColor: "bg-emerald-400",
    dotGlow: "dot-csr",
    badgeClass: "bg-emerald-400/15 text-emerald-400 border-emerald-400/20",
    icon: Heart,
    label: "CSR"
  },
  "Levitas": {
    dotColor: "bg-sky-400",
    dotGlow: "dot-levitas",
    badgeClass: "bg-sky-400/15 text-sky-400 border-sky-400/20",
    icon: Compass,
    label: "Levitas"
  },
  "Festival": {
    dotColor: "bg-amber-400",
    dotGlow: "dot-festival",
    badgeClass: "bg-amber-400/15 text-amber-400 border-amber-400/20",
    icon: Sparkles,
    label: "Festival"
  },
  "Gravitas": {
    dotColor: "bg-violet-400",
    dotGlow: "dot-gravitas",
    badgeClass: "bg-violet-400/15 text-violet-400 border-violet-400/20",
    icon: Award,
    label: "Gravitas"
  }
}

export default function EventCard({ event }) {
  const config = categoryConfig[event.category] || {
    dotColor: "bg-gray-400",
    dotGlow: "",
    badgeClass: "bg-white/10 text-white/70 border-white/10",
    icon: Tag,
    label: event.category
  }
  const CategoryIcon = config.icon

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 space-y-3">
      {/* Top row: badge + date */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase ${config.badgeClass}`}>
          <CategoryIcon className="w-3 h-3" />
          <span>{config.label}</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/50 text-[11px] font-semibold">
          <Calendar className="w-3 h-3" />
          <span>{event.date}</span>
          {event.day && event.day !== "TBD" && (
            <span className="text-[9px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
              {event.day}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug">
        {event.title}
      </h3>

      {/* Notes */}
      {event.notes && (
        <div className="flex items-start gap-2 text-white/45 text-[11px] sm:text-xs border-t border-white/5 pt-2.5">
          <FileText className="w-3 h-3 text-white/25 shrink-0 mt-0.5" />
          <span className="italic leading-relaxed">{event.notes}</span>
        </div>
      )}
    </div>
  )
}

export { categoryConfig }
