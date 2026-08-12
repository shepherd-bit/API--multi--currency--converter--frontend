import { Sparkles } from 'lucide-react';

export default function Slogan() {
  return (
    <div className="w-full flex flex-col items-center text-center px-6 py-9 select-none">
      
      {/* Top Feature Announcement Badge - Balanced sizing */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-400 shadow-xs mb-5 transition-colors duration-300">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-pulse" />
        <span>
          New: <span className="font-bold text-zinc-950 dark:text-white">12 currencies</span> • mid-market rates
        </span>
      </div>

      {/* Main Core Slogan Headline - The Goldilocks sweet spot */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight max-w-3xl leading-[1.15] text-zinc-950 dark:text-zinc-400 transition-colors duration-300">
        Convert currencies in real-
        <span className="text-zinc-400 dark:text-white mx-1">time.</span> 
        Beautifully.
      </h1>

      {/* Subtitle Description Blocks - Scaled halfway */}
      <p className="mt-4 text-xs md:text-sm font-medium text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed transition-colors duration-300">
        The most delightful converter for travelers, freelancers and businesses.
        <span className="block mt-0.5 text-zinc-400 dark:text-zinc-500">
          Glass-clear rates, instant math, zero clutter.
        </span>
      </p>

    </div>
  );
}