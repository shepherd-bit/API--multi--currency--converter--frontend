import { TrendingUp } from 'lucide-react';

export default function Trends() {
  return (
    <div className="w-full bg-white border-2 border-zinc-300 rounded-[2rem] p-6 shadow-md flex flex-col justify-between h-full">
      
      {/* Top Heading Row */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-950 flex items-center justify-center text-white">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-bold text-zinc-900 tracking-tight">USD/KES • 7 days</span>
          </div>
          <p className="text-xs font-medium text-zinc-400 mt-1">Mid-market trend, daily close</p>
        </div>
        
        {/* Weekly Return Percentage Pill */}
        <div className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-600 shadow-2xs">
          +2.26% this week
        </div>
      </div>

      {/* Embedded Sparkline Graphic Container */}
      <div className="w-full bg-amber-50/20 border-2 border-zinc-100 rounded-2xl p-4 my-3 relative flex flex-col justify-between h-36">
        
        {/* SVG Custom Vector Chart Path matching the mockup line perfectly */}
        <div className="w-full h-20 relative mt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
            {/* Ambient Gradient Fill Underneath the Path */}
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#18181b" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#18181b" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 10,25 L 25,25 L 40,24 L 55,27 L 70,24 L 85,29 L 95,10"
              fill="url(#chartGradient)"
              className="absolute inset-0"
            />
            
            {/* Core Vector Stroke */}
            <path
              d="M 10,25 L 25,25 L 40,24 L 55,27 L 70,24 L 85,29 L 95,10"
              fill="none"
              stroke="#18181b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Individual Grid Coordinates/Data Points */}
            <circle cx="10" cy="25" r="1.5" fill="white" stroke="#18181b" strokeWidth="1.2" />
            <circle cx="25" cy="25" r="1.5" fill="white" stroke="#18181b" strokeWidth="1.2" />
            <circle cx="40" cy="24" r="1.5" fill="white" stroke="#18181b" strokeWidth="1.2" />
            <circle cx="55" cy="27" r="1.5" fill="white" stroke="#18181b" strokeWidth="1.2" />
            <circle cx="70" cy="24" r="1.5" fill="white" stroke="#18181b" strokeWidth="1.2" />
            <circle cx="85" cy="29" r="1.5" fill="white" stroke="#18181b" strokeWidth="1.2" />
            
            {/* Accent Target Node Point */}
            <circle cx="95" cy="10" r="2" fill="#18181b" />
          </svg>
        </div>

        {/* X-Axis Timestamps */}
        <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 px-1 mt-1 uppercase select-none">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
          <span>Today</span>
        </div>
      </div>

      {/* Metrics Footer Grid Blocks */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-zinc-50/60 border-2 border-zinc-100 rounded-xl p-2.5 shadow-2xs">
          <span className="block text-[9px] font-bold text-zinc-400 tracking-wider uppercase">High</span>
          <span className="text-xs font-black text-zinc-800 tracking-tight mt-0.5 block">129.25</span>
        </div>
        <div className="bg-zinc-50/60 border-2 border-zinc-100 rounded-xl p-2.5 shadow-2xs">
          <span className="block text-[9px] font-bold text-zinc-400 tracking-wider uppercase">Low</span>
          <span className="text-xs font-black text-zinc-800 tracking-tight mt-0.5 block">125.87</span>
        </div>
        <div className="bg-zinc-50/60 border-2 border-zinc-100 rounded-xl p-2.5 shadow-2xs">
          <span className="block text-[9px] font-bold text-zinc-400 tracking-wider uppercase">Volatility</span>
          <span className="text-xs font-black text-zinc-800 tracking-tight mt-0.5 block">Low</span>
        </div>
      </div>

    </div>
  );
}