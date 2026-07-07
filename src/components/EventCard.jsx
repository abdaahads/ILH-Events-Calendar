import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Tag, FileText, Compass, Award, Sparkles, Heart } from 'lucide-react'

// Define styling parameters per event category
const categoryConfig = {
  "CSR activity": {
    colorClass: "bg-category-csr/10 text-emerald-400 border-emerald-500/30",
    glowColor: "rgba(70, 148, 111, 0.15)",
    icon: Heart,
    label: "CSR Activity"
  },
  "Levitas": {
    colorClass: "bg-category-levitas/20 text-sky-400 border-sky-500/30",
    glowColor: "rgba(0, 70, 121, 0.25)",
    icon: Compass,
    label: "Levitas"
  },
  "Festival": {
    colorClass: "bg-category-festival/10 text-amber-400 border-amber-500/30",
    glowColor: "rgba(255, 191, 0, 0.15)",
    icon: Sparkles,
    label: "Festival"
  },
  "Gravitas": {
    colorClass: "bg-category-gravitas/10 text-purple-400 border-purple-500/30",
    glowColor: "rgba(139, 92, 246, 0.15)",
    icon: Award,
    label: "Gravitas"
  }
}

export default function EventCard({ event, index }) {
  const config = categoryConfig[event.category] || {
    colorClass: "bg-white/5 text-white/70 border-white/10",
    glowColor: "rgba(255, 255, 255, 0.05)",
    icon: Tag,
    label: event.category
  }
  const CategoryIcon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, cubicBezier: [0.25, 1, 0.5, 1] }}
      whileHover={{ 
        y: -6,
        scale: 1.02,
        boxShadow: `0 15px 30px -10px ${config.glowColor}, 0 0 15px 1px rgba(255,255,255,0.05)`
      }}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl glass-card p-6 h-full border border-white/10 group cursor-pointer"
    >
      {/* Category Glowing Background Indicator */}
      <div 
        className="absolute -right-16 -top-16 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: event.category === 'Levitas' ? '#004679' : event.category === 'CSR activity' ? '#46946f' : event.category === 'Festival' ? '#ffbf00' : '#8b5cf6' }}
      ></div>

      <div>
        {/* Card Header: Date & Category */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors duration-300">
            <Calendar className="w-4 h-4 text-white/50" />
            <span className="text-sm font-semibold tracking-wide">
              {event.date}
            </span>
            {event.day && event.day !== "TBD" && (
              <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                {event.day}
              </span>
            )}
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${config.colorClass}`}>
            <CategoryIcon className="w-3.5 h-3.5" />
            <span>{config.label}</span>
          </div>
        </div>

        {/* Card Title */}
        <h3 className="text-lg sm:text-xl font-nexa font-extrabold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text leading-snug transition-colors duration-300">
          {event.title}
        </h3>
      </div>

      {/* Card Notes */}
      {event.notes ? (
        <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-2.5 text-white/50 text-xs sm:text-sm group-hover:text-white/70 transition-colors duration-300">
          <FileText className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
          <span className="italic leading-relaxed">{event.notes}</span>
        </div>
      ) : (
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2.5 text-white/30 text-xs">
          <span className="italic">No extra details</span>
        </div>
      )}
    </motion.div>
  )
}
