import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'motion/react';
import { ArrowLeftRight, Copy, Star, BarChart3, Share2, Globe, Search, X, ChevronDown } from 'lucide-react';

// Top 20 internationally recognized currencies dataset mapping to the mockup UI metrics
const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', country: 'United States', flag: 'US', rate: 1.0000 },
  { code: 'EUR', name: 'Euro', country: 'European Union', flag: 'EU', rate: 0.9200 },
  { code: 'GBP', name: 'British Pound', country: 'United Kingdom', flag: 'GB', rate: 0.7900 },
  { code: 'KES', name: 'Kenyan Shilling', country: 'Kenya', flag: 'KE', rate: 129.25 },
  { code: 'JPY', name: 'Japanese Yen', country: 'Japan', flag: 'JP', rate: 154.32 },
  { code: 'CAD', name: 'Canadian Dollar', country: 'Canada', flag: 'CA', rate: 1.3600 },
  { code: 'AUD', name: 'Australian Dollar', country: 'Australia', flag: 'AU', rate: 1.5100 },
  { code: 'CHF', name: 'Swiss Franc', country: 'Switzerland', flag: 'CH', rate: 0.9000 },
  { code: 'CNY', name: 'Chinese Yuan', country: 'China', flag: 'CN', rate: 7.2400 },
  { code: 'INR', name: 'Indian Rupee', country: 'India', flag: 'IN', rate: 83.45 },
  { code: 'ZAR', name: 'South African Rand', country: 'South Africa', flag: 'ZA', rate: 18.20 },
  { code: 'NGN', name: 'Nigerian Naira', country: 'Nigeria', flag: 'NG', rate: 1580.5 },
  { code: 'AED', name: 'UAE Dirham', country: 'United Arab Emirates', flag: 'AE', rate: 3.6700 },
  { code: 'SGD', name: 'Singapore Dollar', country: 'Singapore', flag: 'SG', rate: 1.3500 },
  { code: 'NZD', name: 'New Zealand Dollar', country: 'New Zealand', flag: 'NZ', rate: 1.6300 },
  { code: 'MXN', name: 'Mexican Peso', country: 'Mexico', flag: 'MX', rate: 16.85 },
  { code: 'HKD', name: 'Hong Kong Dollar', country: 'Hong Kong', flag: 'HK', rate: 7.8200 },
  { code: 'SEK', name: 'Swedish Krona', country: 'Sweden', flag: 'SE', rate: 10.75 },
  { code: 'NOK', name: 'Norwegian Krone', country: 'Norway', flag: 'NO', rate: 10.82 },
  { code: 'BRL', name: 'Brazilian Real', country: 'Brazil', flag: 'BR', rate: 5.1500 }
];

const POPULAR_CODES = ['USD', 'EUR', 'GBP', 'KES'];

export default function ConversionCard() {
  // Store the formatted string directly in state to preserve commas while typing
  const [amount, setAmount] = useState('1,000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KES');
  
  // Modal State Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState('from'); // 'from' or 'to'
  const [searchQuery, setSearchQuery] = useState('');

  const fromObj = CURRENCIES.find(c => c.code === fromCurrency) || CURRENCIES[0];
  const toObj = CURRENCIES.find(c => c.code === toCurrency) || CURRENCIES[3];

  // Helper to convert localized comma strings back into a clean float value for math integration
  const getRawNumericValue = (str) => {
    return parseFloat(str.replace(/,/g, '')) || 0;
  };

  // Dynamic cross-multiplication exchange math
  const dynamicExchangeRate = toObj.rate / fromObj.rate;
  const rawTargetValue = getRawNumericValue(amount) * dynamicExchangeRate;

  // Real-time counting motion engines
  const countMotion = useMotionValue(0);
  const roundedCount = useTransform(countMotion, (latest) => 
    Math.floor(latest).toLocaleString('en-US')
  );

  useEffect(() => {
    const controls = animate(countMotion, rawTargetValue, {
      duration: 0.4,
      ease: 'easeOut'
    });
    return () => controls.stop();
  }, [rawTargetValue, countMotion]);

  // Strips characters, enforces digits, and formats commas into the input string dynamically
  const handleAmountChange = (e) => {
    const inputVal = e.target.value.replace(/[^0-9.]/g, ''); // strip non-numeric keys
    
    if (inputVal === '') {
      setAmount('');
      return;
    }

    // Split decimal halves to prevent wiping float trailing numbers
    const parts = inputVal.split('.');
    parts[0] = Number(parts[0]).toLocaleString('en-US'); 
    
    setAmount(parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0]);
  };

  // Handle Interchange Swap
  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const openCurrencyModal = (target) => {
    setModalTarget(target);
    setSearchQuery('');
    setIsModalOpen(true);
  };

  const selectCurrency = (code) => {
    if (modalTarget === 'from') {
      if (code === toCurrency) setToCurrency(fromCurrency);
      setFromCurrency(code);
    } else {
      if (code === fromCurrency) setFromCurrency(toCurrency);
      setToCurrency(code);
    }
    setIsModalOpen(false);
  };

  // Filter list based on user search input
  const filteredCurrencies = CURRENCIES.filter(c =>
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-white border-2 border-zinc-300 rounded-[2.5rem] p-8 shadow-md flex flex-col gap-6 relative">
      
      {/* Injecting styles for a thick, permanently blinking system cursor overlay */}
      <style>{`
        .live-caret-input {
          caret-color: #18181b !important;
          animation: blink-caret 1s step-end infinite;
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #18181b }
        }
      `}</style>

      {/* Top Meta row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 tracking-wide uppercase">
          <span>Amount</span>
          <span className="text-zinc-200">—</span>
          <span className="text-zinc-500 normal-case">{fromObj.code} • {fromObj.country}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-700 border border-emerald-200 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Mid-market
        </div>
      </div>

      {/* Input Box Container */}
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-3xl font-bold text-zinc-300 select-none tracking-tight uppercase">
          {fromObj.code.slice(0, 2)}
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0"
          className="w-full bg-transparent border-none text-5xl font-bold text-zinc-900 outline-none p-0 focus:ring-0 tracking-tight live-caret-input"
          autoFocus
        />
      </div>

      {/* Presets Grid */}
      <div className="flex gap-2.5 mt-1">
        {[100, 500, 1000, 5000].map((preset) => {
          const isSelected = getRawNumericValue(amount) === preset;
          const label = preset >= 1000 ? `${preset / 1000}K` : preset;
          return (
            <button
              key={preset}
              onClick={() => setAmount(preset.toLocaleString('en-US'))}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-xs cursor-pointer ${
                isSelected
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white border-2 border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Interactive Picker Cards Row */}
      <div className="flex items-center gap-2 w-full mt-2 relative">
        {/* From Picker Minicard */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          onClick={() => openCurrencyModal('from')}
          className="flex-1 flex items-center justify-between px-4 py-3 bg-white border-2 border-zinc-200/90 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold flex items-center justify-center border-2 border-zinc-300 uppercase">
              {fromObj.flag}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-900 leading-none">{fromObj.code} <span className="text-[10px] font-medium text-zinc-400">FROM</span></span>
              <span className="text-xs text-zinc-400 font-medium mt-0.5">{fromObj.name}</span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </motion.div>

        {/* Swap Switcher Toggle Button */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSwap}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border-2 border-zinc-200 shadow-md flex items-center justify-center cursor-pointer text-zinc-700"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </motion.button>

        {/* To Picker Minicard */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          onClick={() => openCurrencyModal('to')}
          className="flex-1 flex items-center justify-between px-4 py-3 bg-white border-2 border-zinc-200/90 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-shadow pl-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold flex items-center justify-center border-2 border-zinc-300 uppercase">
              {toObj.flag}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-900 leading-none">{toObj.code} <span className="text-[10px] bg-zinc-950 text-white px-1 py-0.5 rounded font-medium text-[9px]">TO</span></span>
              <span className="text-xs text-zinc-400 font-medium mt-0.5">{toObj.name}</span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </motion.div>
      </div>

      {/* Converted Output Value Section */}
      <div className="w-full bg-amber-50/40 border-2 border-amber-200/80 rounded-3xl p-5 flex flex-col gap-4 relative mt-2 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white border border-zinc-200 text-[10px] font-bold text-zinc-500 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            CONVERTED TO • Live
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-white border-2 border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 shadow-2xs transition-colors cursor-pointer">
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button className="w-8 h-8 rounded-full bg-white border-2 border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 shadow-2xs transition-colors cursor-pointer">
              <Star className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-black text-zinc-900 tracking-tight uppercase">{toObj.code.slice(0, 2)}</span>
          <motion.span className="text-4xl font-black text-zinc-900 tracking-tight ml-1">
            {roundedCount}
          </motion.span>
          <span className="text-xs font-bold text-zinc-400 tracking-wide ml-2 uppercase">{toObj.code}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-medium mt-1">
          <div className="px-2 py-0.5 rounded-full bg-white border border-zinc-200 flex items-center gap-1 font-semibold text-zinc-600">
            <span>~ 1 {fromObj.code} = {dynamicExchangeRate.toFixed(4)} {toObj.code}</span>
          </div>
          <span>•</span>
          <span>Mid-market rate</span>
          <span>•</span>
          <span>Updated just now</span>
        </div>
      </div>

      {/* Action Toolbar Bottom Bar */}
      <div className="flex items-center gap-3 w-full mt-2">
        <div className="flex-1 h-12 rounded-full bg-zinc-950 flex items-center justify-center text-white text-xs font-bold tracking-wide shadow-md select-none">
          Convert {fromObj.code} to {toObj.code} • {toObj.code.slice(0, 2)}
        </div>
        
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-12 h-12 rounded-full bg-white border-2 border-zinc-200 flex items-center justify-center text-zinc-700 shadow-sm cursor-pointer"><BarChart3 className="w-4 h-4" /></motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-12 h-12 rounded-full bg-white border-2 border-zinc-200 flex items-center justify-center text-zinc-700 shadow-sm cursor-pointer"><Share2 className="w-4 h-4" /></motion.button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 font-bold tracking-wide mt-2">
        <Globe className="w-3 h-3 text-zinc-300" />
        <span>RATES BY ECB + CENTRAL BANK OF KENYA • NO FEES • NO MARKUP</span>
      </div>

      {/* --- OVERLAY POPUP MODAL DIALOG PORTAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/30 backdrop-blur-xs"
            />

            {/* Modal Body Container Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-white border-2 border-zinc-300 rounded-[2rem] p-6 shadow-2xl flex flex-col max-h-[80vh]"
            >
              {/* Header Title Bar */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-zinc-900">Select currency</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Input Search Field Wrapper */}
              <div className="relative mb-4">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search currency or country"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50/80 border-2 border-zinc-200 rounded-xl outline-none text-sm font-medium text-zinc-900 focus:border-zinc-400 focus:ring-0 transition-colors"
                />
              </div>

              {/* Popular Fast Picks Row */}
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[10px] font-bold text-zinc-400 tracking-wide uppercase mr-1 select-none">Popular</span>
                {POPULAR_CODES.map(code => {
                  const curr = CURRENCIES.find(c => c.code === code);
                  return (
                    <button
                      key={code}
                      onClick={() => selectCurrency(code)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border-2 border-zinc-200 text-xs font-bold text-zinc-700 hover:border-zinc-400 transition-colors shadow-2xs cursor-pointer"
                    >
                      <span className="text-[10px] opacity-60 uppercase">{curr?.flag}</span>
                      <span>{code}</span>
                    </button>
                  );
                })}
              </div>

              {/* Scrollable Core Currency Grid List */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
                {filteredCurrencies.map((item) => {
                  const isCurrentSelection = (modalTarget === 'from' && item.code === fromCurrency) || (modalTarget === 'to' && item.code === toCurrency);
                  return (
                    <div
                      key={item.code}
                      onClick={() => selectCurrency(item.code)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all cursor-pointer ${
                        isCurrentSelection
                          ? 'bg-zinc-950 border-zinc-950 text-white shadow-sm'
                          : 'bg-white border-transparent text-zinc-900 hover:bg-zinc-50 hover:border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center border-2 uppercase ${
                          isCurrentSelection ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-500'
                        }`}>
                          {item.flag}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-bold leading-none">
                            {item.code} <span className={`text-[10px] font-medium ml-1 ${isCurrentSelection ? 'text-zinc-400' : 'text-zinc-400'}`}>{item.country}</span>
                          </span>
                          <span className={`text-xs font-medium mt-0.5 ${isCurrentSelection ? 'text-zinc-400' : 'text-zinc-400'}`}>
                            {item.name}
                          </span>
                        </div>
                      </div>
                      <span className={`text-xs font-bold ${isCurrentSelection ? 'text-zinc-200' : 'text-zinc-500'}`}>
                        {item.rate.toFixed(4)}
                      </span>
                    </div>
                  );
                })}

                {filteredCurrencies.length === 0 && (
                  <div className="text-center py-6 text-xs font-medium text-zinc-400">
                    No currencies match your search criteria.
                  </div>
                )}
              </div>

              {/* Popup Bottom Sticky Indicator Text */}
              <div className="text-center text-[10px] font-semibold text-zinc-400 tracking-wide mt-4 uppercase select-none">
                Mid-market rates • Tap to select
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}