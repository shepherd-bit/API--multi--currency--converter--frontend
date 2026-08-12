import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

export default function Topbar({ theme, toggleTheme }) {
  return (
    <header className="w-full border-b-2 border-zinc-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md sticky top-0 z-50 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left Side: Logo & Status Badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Circle "F" Brand Icon */}
            <div className="w-7 h-7 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-full flex items-center justify-center text-sm font-sans tracking-tighter select-none">
              F
            </div>
            {/* Brand Title */}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm tracking-wide">
              Flux <span className="text-zinc-400 dark:text-zinc-500 font-normal select-none">• Currency</span>
            </span>
          </div>

          {/* Live Rates Status Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 shadow-sm transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live rates
          </div>
        </div>

        {/* Right Side: Navigation, Theme Toggle, & CTA */}
        <nav className="flex items-center gap-6">
          <a href="#rates" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Rates
          </a>
          <a href="#history" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            History
          </a>
          <a href="#pro" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Pro
          </a>
          
          {/* Dynamic Light/Dark Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 shadow-2xs transition-all cursor-pointer flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>
          
          {/* Bulging Interaction Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold tracking-wide shadow-sm cursor-pointer transition-colors"
          >
            Get App
          </motion.button>
        </nav>

      </div>
    </header>
  );
}