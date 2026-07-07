import React from 'react'
import { Calendar, FileText, Compass, Award, Sparkles, Heart, Tag } from 'lucide-react'

// Define styling parameters per event category
const categoryConfig = {
  "CSR activity": {
    colorClass: "bg-category-csr/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-500/30",
    icon: Heart,
    label: "CSR"
  },
  "Levitas": {
    colorClass: "bg-category-levitas/10 dark:bg-category-levitas/20 text-brand-blue dark:text-sky-400 border-brand-blue/20 dark:border-sky-500/30",
    icon: Compass,
    label: "Levitas"
  },
  "Festival": {
    colorClass: "bg-category-festival/10 text-amber-700 dark:text-amber-400 border-amber-500/20 dark:border-amber-500/30",
    icon: Sparkles,
    label: "Festival"
  },
  "Gravitas": {
    colorClass: "bg-category-gravitas/10 text-purple-600 dark:text-purple-400 border-purple-500/20 dark:border-purple-500/30",
    icon: Award,
    label: "Gravitas"
  }
}

export default function EventCard({ event, index, isMini = false }) {
  const config = categoryConfig[event.category] || {
    colorClass: "bg-black/5 dark:bg-white/5 text-slate-600 dark:text-white/70 border-black/5 dark:border-white/10",
    icon: Tag,
    label: event.category
  }
  const CategoryIcon = config.icon

  if (isMini) {
    return (
      <div className="flex flex-col gap-2">
        {/* Header line: Date & Category */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-white/50 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>{event.date}</span>
            {event.day && event.day !== "TBD" && (
              <span className="text-[10px] text-slate-400 dark:text-white/30 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded-full border border-black/5 dark:border-white/5">
                {event.day}
              </span>
            )}
          </div>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold tracking-wider uppercase ${config.colorClass}`}>
            <CategoryIcon className="w-3 h-3" />
            <span>{config.label}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-sm sm:text-base font-nexa font-extrabold text-slate-800 dark:text-white leading-snug">
          {event.title}
        </h4>

        {/* Notes */}
        {event.notes && (
          <div className="flex items-start gap-1.5 text-slate-500 dark:text-white/50 text-xs mt-1 border-t border-black/5 dark:border-white/5 pt-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400 dark:text-white/20 shrink-0 mt-0.5" />
            <span className="italic leading-normal">{event.notes}</span>
          </div>
        )}
      </div>
    )
  }

  // Fallback layout (Full size card)
  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 h-full border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/3 text-slate-800 dark:text-white group">
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-slate-500 dark:text-white/60">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-semibold">{event.date}</span>
            {event.day && event.day !== "TBD" && (
              <span className="text-xs bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-full border border-black/5 dark:border-white/5">
                {event.day}
              </span>
            )}
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wider uppercase ${config.colorClass}`}>
            <CategoryIcon className="w-3.5 h-3.5" />
            <span>{config.label}</span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-nexa font-extrabold mb-3">
          {event.title}
        </h3>
      </div>

      {event.notes && (
        <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 flex items-start gap-2.5 text-slate-500 dark:text-white/50 text-xs sm:text-sm">
          <FileText className="w-4 h-4 text-slate-400 dark:text-white/20 shrink-0 mt-0.5" />
          <span className="italic leading-relaxed">{event.notes}</span>
        </div>
      )}
    </div>
  )
}
