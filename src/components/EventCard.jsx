import React from 'react'
import { Calendar, FileText, Compass, Award, Sparkles, Heart, Tag } from 'lucide-react'

const categoryConfig = {
  "CSR activity": {
    dotColor: "bg-emerald-400",
    dotGlow: "dot-csr",
    borderColor: "border-l-emerald-400",
    accentColor: "text-emerald-400",
    bgTint: "bg-emerald-400/5",
    badgeClass: "bg-emerald-400/15 text-emerald-400 border-emerald-400/25",
    icon: Heart,
    label: "CSR"
  },
  "Levitas": {
    dotColor: "bg-sky-400",
    dotGlow: "dot-levitas",
    borderColor: "border-l-sky-400",
    accentColor: "text-sky-400",
    bgTint: "bg-sky-400/5",
    badgeClass: "bg-sky-400/15 text-sky-400 border-sky-400/25",
    icon: Compass,
    label: "Levitas"
  },
  "Festival": {
    dotColor: "bg-amber-400",
    dotGlow: "dot-festival",
    borderColor: "border-l-amber-400",
    accentColor: "text-amber-400",
    bgTint: "bg-amber-400/5",
    badgeClass: "bg-amber-400/15 text-amber-400 border-amber-400/25",
    icon: Sparkles,
    label: "Festival"
  },
  "Gravitas": {
    dotColor: "bg-violet-400",
    dotGlow: "dot-gravitas",
    borderColor: "border-l-violet-400",
    accentColor: "text-violet-400",
    bgTint: "bg-violet-400/5",
    badgeClass: "bg-violet-400/15 text-violet-400 border-violet-400/25",
    icon: Award,
    label: "Gravitas"
  }
}

export default function EventCard({ event }) {
  const config = categoryConfig[event.category] || {
    dotColor: "bg-gray-400",
    dotGlow: "",
    borderColor: "border-l-gray-400",
    accentColor: "text-gray-400",
    bgTint: "bg-white/3",
    badgeClass: "bg-white/10 text-white/70 border-white/15",
    icon: Tag,
    label: event.category
  }
  const CategoryIcon = config.icon

  return (
    <div className={`glass-card rounded-2xl p-5 border-l-[3px] ${config.borderColor} ${config.bgTint} space-y-3`}>
      {/* Category badge + date row */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-extrabold tracking-wider uppercase ${config.badgeClass}`}>
          <CategoryIcon className="w-3.5 h-3.5" />
          <span>{config.label}</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>{event.date}</span>
          {event.day && event.day !== "TBD" && (
            <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-md border border-white/8 font-bold">
              {event.day}
            </span>
          )}
        </div>
      </div>

      {/* Title — big and bold */}
      <h3 className={`text-base sm:text-lg font-extrabold leading-snug ${config.accentColor}`} style={{ textShadow: '0 0 30px currentColor' }}>
        {event.title}
      </h3>

      {/* Notes */}
      {event.notes && (
        <div className="flex items-start gap-2 text-white/50 text-xs border-t border-white/6 pt-3">
          <FileText className="w-3.5 h-3.5 text-white/25 shrink-0 mt-0.5" />
          <span className="italic leading-relaxed">{event.notes}</span>
        </div>
      )}
    </div>
  )
}

export { categoryConfig }
