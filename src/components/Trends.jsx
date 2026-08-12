import { TrendingUp } from 'lucide-react';

export default function Trends() {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 rounded-[2rem] p-6 shadow-md flex flex-col justify-between h-full transition-colors duration-300">
      
      {/* Top Heading Row */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-950 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-950">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">USD/KES • 7 days</span>
          </div>
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mt-1">Mid-market trend, daily close</p>
        </div>
        
        {/* Weekly Return Percentage Pill */}
        <div className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shadow-2xs">
          +2.26% this week
        </div>
      </div>

      {/* Embedded Sparkline Graphic Container */}
      <div className="w-full bg-amber-50/10 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-800/60 rounded-2xl p-4 my-3 relative flex flex-col justify-between h-40">
        
        {/* Fixed Viewport SVG wrapper preventing unnatural horizontal stretching */}
        <div className="w-full h-24 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full max-w-sm overflow-visible" viewBox="0 0 100 40">
            {/* Ambient Gradient Fill Underneath the Path */}
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#18181b" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#18181b" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Area fill under the path closes correctly at the bottom y=38 */}
            <path
              d="M 5,26 L 20,26 L 35,25 L 50,28 L 65,25 L 80,30 L 95,12 L 95,38 L 5,38 Z"
              fill="url(#chartGradient)"
              className="dark:opacity-20 text-zinc-400"
            />
            
            {/* Core Vector Stroke - adaptive color */}
            <path
              d="M 5,26 L 20,26 L 35,25 L 50,28 L 65,25 L 80,30 L 95,12"
              fill="none"
              stroke="currentColor"
              className="text-zinc-900 dark:text-zinc-100"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Individual Grid Coordinates/Data Points */}
            <circle cx="5" cy="26" r="2" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="text-white dark:text-zinc-900 stroke-zinc-900 dark:stroke-zinc-100" />
            <circle cx="20" cy="26" r="2" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="text-white dark:text-zinc-900 stroke-zinc-900 dark:stroke-zinc-100" />
            <circle cx="35" cy="25" r="2" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="text-white dark:text-zinc-900 stroke-zinc-900 dark:stroke-zinc-100" />
            <circle cx="50" cy="28" r="2" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="text-white dark:text-zinc-900 stroke-zinc-900 dark:stroke-zinc-100" />
            <circle cx="65" cy="25" r="2" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="text-white dark:text-zinc-900 stroke-zinc-900 dark:stroke-zinc-100" />
            <circle cx="80" cy="30" r="2" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="text-white dark:text-zinc-900 stroke-zinc-900 dark:stroke-zinc-100" />
            
            {/* Accent Target Node Point */}
            <circle cx="95" cy="12" r="3" fill="currentColor" className="text-zinc-900 dark:text-zinc-100" />
          </svg>
        </div>

        {/* X-Axis Timestamps */}
        <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 dark:text-zinc-500 px-2 uppercase select-none">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
          <span>Today</span>
        </div>
      </div>

      {/* Metrics Footer Grid Blocks */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-zinc-50/60 dark:bg-zinc-950/40 border-2 border-zinc-100 dark:border-zinc-800/40 rounded-xl p-2.5 shadow-2xs">
          <span className="block text-[9px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">High</span>
          <span className="text-xs font-black text-zinc-800 dark:text-zinc-200 tracking-tight mt-0.5 block">129.25</span>
        </div>
        <div className="bg-zinc-50/60 dark:bg-zinc-950/40 border-2 border-zinc-100 dark:border-zinc-800/40 rounded-xl p-2.5 shadow-2xs">
          <span className="block text-[9px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">Low</span>
          <span className="text-xs font-black text-zinc-800 dark:text-zinc-200 tracking-tight mt-0.5 block">125.87</span>
        </div>
        <div className="bg-zinc-50/60 dark:bg-zinc-950/40 border-2 border-zinc-100 dark:border-zinc-800/40 rounded-xl p-2.5 shadow-2xs">
          <span className="block text-[9px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">Volatility</span>
          <span className="text-xs font-black text-zinc-800 dark:text-zinc-200 tracking-tight mt-0.5 block">Low</span>
        </div>
      </div>

    </div>
  );
}