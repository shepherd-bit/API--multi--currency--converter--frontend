import { motion } from 'motion/react';

export default function Topbar() {
  return (
    <header className="w-full border-b-2 border-zinc-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left Side: Logo & Status Badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Circle "F" Brand Icon */}
            <div className="w-7 h-7 bg-zinc-900 text-white font-bold rounded-full flex items-center justify-center text-sm font-sans tracking-tighter select-none">
              F
            </div>
            {/* Brand Title */}
            <span className="font-semibold text-zinc-900 text-sm tracking-wide">
              Flux <span className="text-zinc-400 font-normal select-none">• Currency</span>
            </span>
          </div>

          {/* Live Rates Status Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-zinc-200 text-[11px] font-medium text-zinc-500 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live rates
          </div>
        </div>

        {/* Right Side: Navigation & CTA */}
        <nav className="flex items-center gap-6">
          <a href="#rates" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
            Rates
          </a>
          <a href="#history" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
            History
          </a>
          <a href="#pro" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
            Pro
          </a>
          
          {/* Bulging Interaction Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-semibold tracking-wide shadow-sm cursor-pointer"
          >
            Get App
          </motion.button>
        </nav>

      </div>
    </header>
  );
}