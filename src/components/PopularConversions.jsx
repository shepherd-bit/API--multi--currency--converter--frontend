import { ChevronRight } from 'lucide-react';

const POPULAR_LIST = [
  { from: 'USD', to: 'KES', label: 'USD → KES', value: '129.25', fromFlag: 'US', toFlag: 'KE' },
  { from: 'EUR', to: 'KES', label: 'EUR → KES', value: '140.49', fromFlag: 'EU', toFlag: 'KE' },
  { from: 'GBP', to: 'KES', label: 'GBP → KES', value: '163.61', fromFlag: 'GB', toFlag: 'KE' },
  { from: 'USD', to: 'NGN', label: 'USD → NGN', value: '1,580.5', fromFlag: 'US', toFlag: 'NG' },
  { from: 'USD', to: 'INR', label: 'USD → INR', value: '83.45', fromFlag: 'US', toFlag: 'IN' }
];

export default function PopularConversions() {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 rounded-[2rem] p-6 shadow-md flex flex-col justify-between h-full transition-colors duration-300">
      
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Popular conversions</span>
        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wide uppercase">Mid-market</span>
      </div>

      {/* Conversion Rows List */}
      <div className="flex flex-col gap-1.5 flex-1 justify-center">
        {POPULAR_LIST.map((item, idx) => (
          <div 
            key={idx}
            className="flex items-center justify-between py-2 px-3 rounded-xl border-2 border-transparent hover:border-zinc-100 dark:hover:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40 transition-all cursor-pointer group"
          >
            {/* Currency Flags & Label */}
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-1.5 select-none">
                <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[8px] font-black flex items-center justify-center text-zinc-500 dark:text-zinc-400 uppercase">
                  {item.fromFlag}
                </div>
                <div className="w-5 h-5 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-[8px] font-black flex items-center justify-center text-zinc-400 dark:text-zinc-500 uppercase">
                  {item.toFlag}
                </div>
              </div>
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 tracking-tight group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                {item.label}
              </span>
            </div>

            {/* Value & Action Indicator Arrow */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-zinc-800 dark:text-zinc-200 tracking-tight">
                {item.value}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}