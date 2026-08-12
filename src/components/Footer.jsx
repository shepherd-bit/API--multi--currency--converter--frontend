export default function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto px-4 pb-8 mt-4 select-none">
      {/* Main Pill Wrapper Match to Image UI */}
      <div className="w-full bg-white/60 backdrop-blur-md border border-zinc-200/60 rounded-full py-4 px-6 shadow-2xs flex items-center justify-center gap-2">
        
        {/* Active Indicator Pulse Green Dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>

        {/* Brand Core Selling Metrics Text */}
        <p className="text-xs font-semibold text-zinc-500 tracking-tight text-center">
          No hidden fees. Rates refreshed every 60s. Built for humans, not banks.
        </p>
        
      </div>
    </footer>
  );
}