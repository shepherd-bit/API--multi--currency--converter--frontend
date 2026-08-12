import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function Slogan() {
  return (
    <section className="flex flex-col items-center text-center pt-12 pb-6 px-4">
      
      {/* Heavily Defined Feature Pill Card */}
      <motion.div 
        whileHover={{ scale: 1.03 }}
        className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-zinc-300/90 text-[11px] font-semibold text-zinc-700 shadow-sm cursor-default select-none mb-6"
      >
        <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
        <span>New: 12 currencies • mid-market rates</span>
      </motion.div>

      {/* Slogan Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 max-w-2xl leading-[1.15]">
        Convert currencies in real-<br className="hidden sm:inline" />
        <span className="text-zinc-500">time.</span> Beautifully.
      </h1>

      {/* Sub-text Paragraphs */}
      <p className="mt-4 text-xs md:text-sm font-medium text-zinc-500 max-w-xl leading-relaxed">
        The most delightful converter for travelers, freelancers and businesses.
        <span className="block mt-0.5">Glass‑clear rates, instant math, zero clutter.</span>
      </p>

    </section>
  );
}