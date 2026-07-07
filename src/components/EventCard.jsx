import React from 'react'
import { Calendar, FileText, Compass, Award, Sparkles, Heart, Tag } from 'lucide-react'

const categoryConfig = {
  "CSR activity": {
    dotColor: "bg-emerald-500",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30",
    icon: Heart,
    label: "CSR"
  },
  "Levitas": {
    dotColor: "bg-blue-600",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30",
    icon: Compass,
    label: "Levitas"
  },
  "Festival": {
    dotColor: "bg-amber-500",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30",
    icon: Sparkles,
    label: "Festival"
  },
  "Gravitas": {
    dotColor: "bg-violet-500",
    badgeClass: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/20 dark:text-violet-300 dark:border-violet-500/30",
    icon: Award,
    label: "Gravitas"
  }
}

export default function EventCard({ event }) {
  const config = categoryConfig[event.category] || {
    dotColor: "bg-gray-400",
    badgeClass: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-white/10 dark:text-white/70 dark:border-white/10",
    icon: Tag,
    label: event.category
  }
  const CategoryIcon = config.icon

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400" />
          <span>{event.date}</span>
          {event.day && event.day !== "TBD" && (
            <span className="text-[10px] text-slate-400 dark:text-slate-400 bg-slate-100 dark:bg-white/8 px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/10">
              {event.day}
            </span>
          )}
        </div>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold tracking-wider uppercase ${config.badgeClass}`}>
          <CategoryIcon className="w-3 h-3" />
          <span>{config.label}</span>
        </div>
      </div>

      <h4 className="text-[13px] sm:text-sm font-bold text-slate-800 dark:text-white leading-snug">
        {event.title}
      </h4>

      {event.notes && (
        <div className="flex items-start gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] border-t border-slate-100 dark:border-white/8 pt-1.5 mt-0.5">
          <FileText className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
          <span className="italic leading-snug">{event.notes}</span>
        </div>
      )}
    </div>
  )
}

export { categoryConfig }
