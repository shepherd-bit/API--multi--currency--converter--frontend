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
      <div className="w-full bg-amber-50/10 border border-zinc-100 rounded-2xl p-4 my-3 relative flex flex-col justify-between h-40">
        
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
            />
            
            {/* Core Vector Stroke */}
            <path
              d="M 5,26 L 20,26 L 35,25 L 50,28 L 65,25 L 80,30 L 95,12"
              fill="none"
              stroke="#18181b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Individual Grid Coordinates/Data Points */}
            <circle cx="5" cy="26" r="2" fill="white" stroke="#18181b" strokeWidth="1.5" />
            <circle cx="20" cy="26" r="2" fill="white" stroke="#18181b" strokeWidth="1.5" />
            <circle cx="35" cy="25" r="2" fill="white" stroke="#18181b" strokeWidth="1.5" />
            <circle cx="50" cy="28" r="2" fill="white" stroke="#18181b" strokeWidth="1.5" />
            <circle cx="65" cy="25" r="2" fill="white" stroke="#18181b" strokeWidth="1.5" />
            <circle cx="80" cy="30" r="2" fill="white" stroke="#18181b" strokeWidth="1.5" />
            
            {/* Accent Target Node Point */}
            <circle cx="95" cy="12" r="3" fill="#18181b" />
          </svg>
        </div>

        {/* X-Axis Timestamps */}
        <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 px-2 uppercase select-none">
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