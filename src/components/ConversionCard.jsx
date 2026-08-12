import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'motion/react';
import { ArrowLeftRight, Copy, Star, BarChart3, Share2, Globe, Search, X, ChevronDown, Loader2 } from 'lucide-react';

const CURRENCY_METADATA = {
  USD: { name: 'US Dollar', country: 'United States', flag: 'US' },
  EUR: { name: 'Euro', country: 'European Union', flag: 'EU' },
  GBP: { name: 'British Pound', country: 'United Kingdom', flag: 'GB' },
  KES: { name: 'Kenyan Shilling', country: 'Kenya', flag: 'KE' },
  JPY: { name: 'Japanese Yen', country: 'Japan', flag: 'JP' },
  CAD: { name: 'Canadian Dollar', country: 'Canada', flag: 'CA' },
  AUD: { name: 'Australian Dollar', country: 'Australia', flag: 'AU' },
  CHF: { name: 'Swiss Franc', country: 'Switzerland', flag: 'CH' },
  CNY: { name: 'Chinese Yuan', country: 'China', flag: 'CN' },
  INR: { name: 'Indian Rupee', country: 'India', flag: 'IN' },
  ZAR: { name: 'South African Rand', country: 'South Africa', flag: 'ZA' },
  NGN: { name: 'Nigerian Naira', country: 'Nigeria', flag: 'NG' },
  AED: { name: 'UAE Dirham', country: 'United Arab Emirates', flag: 'AE' },
  SGD: { name: 'Singapore Dollar', country: 'Singapore', flag: 'SG' },
  NZD: { name: 'New Zealand Dollar', country: 'New Zealand', flag: 'NZ' },
  MXN: { name: 'Mexican Peso', country: 'Mexico', flag: 'MX' },
  HKD: { name: 'Hong Kong Dollar', country: 'Hong Kong', flag: 'HK' },
  SEK: { name: 'Swedish Krona', country: 'Sweden', flag: 'SE' },
  NOK: { name: 'Norwegian Krone', country: 'Norway', flag: 'NO' },
  BRL: { name: 'Brazilian Real', country: 'Brazil', flag: 'BR' }
};

const POPULAR_CODES = ['USD', 'EUR', 'GBP', 'KES'];
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function ConversionCard() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KES');
  
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState('from'); 
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch live rates directly from your backend proxy endpoint
  useEffect(() => {
    let isMounted = true;
    const fetchRatesFromBackend = async () => {
      setIsLoading(true);
      setApiError(null);
      try {
        const response = await fetch(`${BACKEND_URL}/api/rates?base=${fromCurrency}`);
        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
        const data = await response.json();
        
        if (isMounted && data.rates) {
          setRates({ ...data.rates, [fromCurrency]: 1.0 });
        }
      } catch (err) {
        console.error('Failed to communicate with backend:', err.message);
        if (isMounted) {
          setApiError('Backend connection failed');
          setRates({});
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchRatesFromBackend();
    return () => { isMounted = false; };
  }, [fromCurrency]);

  const availableCurrencies = Object.keys(CURRENCY_METADATA).map(code => ({
    code,
    name: CURRENCY_METADATA[code].name,
    country: CURRENCY_METADATA[code].country,
    flag: CURRENCY_METADATA[code].flag,
    rate: rates[code] !== undefined ? rates[code] : 0
  }));

  const fromObj = availableCurrencies.find(c => c.code === fromCurrency) || availableCurrencies[0];
  const toObj = availableCurrencies.find(c => c.code === toCurrency) || availableCurrencies[3];

  const getRawNumericValue = (str) => {
    return parseFloat(str.replace(/,/g, '')) || 0;
  };

  const dynamicExchangeRate = rates[toCurrency] !== undefined ? rates[toCurrency] : 0;
  const rawTargetValue = getRawNumericValue(amount) * dynamicExchangeRate;

  const countMotion = useMotionValue(0);
  const roundedCount = useTransform(countMotion, (latest) => 
    Math.floor(latest).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );

  useEffect(() => {
    const controls = animate(countMotion, rawTargetValue, {
      duration: 0.3,
      ease: 'easeOut'
    });
    return () => controls.stop();
  }, [rawTargetValue, countMotion]);

  const handleAmountChange = (e) => {
    const inputVal = e.target.value.replace(/[^0-9.]/g, '');
    if (inputVal === '') {
      setAmount('');
      return;
    }
    const parts = inputVal.split('.');
    parts[0] = Number(parts[0]).toLocaleString('en-US'); 
    setAmount(parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0]);
  };

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

  const filteredCurrencies = availableCurrencies.filter(c =>
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-md flex flex-col gap-6 relative transition-colors duration-300">
      
      <style>{`
        .live-caret-input {
          caret-color: currentColor !important;
          animation: blink-caret 1s step-end infinite;
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: currentColor }
        }
      `}</style>

      {/* Top Meta row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 tracking-wide uppercase">
          <span>Amount</span>
          <span className="text-zinc-200 dark:text-zinc-800">—</span>
          <span className="text-zinc-500 dark:text-zinc-400 normal-case">{fromObj.code} • {fromObj.country}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 shadow-xs">
          {isLoading ? <Loader2 className="w-3 h-3 animate-spin text-emerald-500" /> : <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
          {isLoading ? 'Querying Backend...' : 'Backend Connected'}
        </div>
      </div>

      {/* Input Box Container */}
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-3xl font-bold text-zinc-300 dark:text-zinc-700 select-none tracking-tight uppercase">
          {fromObj.code.slice(0, 2)}
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0"
          className="w-full bg-transparent border-none text-5xl font-bold text-zinc-900 dark:text-zinc-100 outline-none p-0 focus:ring-0 tracking-tight live-caret-input"
          autoFocus
        />
      </div>

      {/* Presets Grid */}
      <div className="flex gap-2.5 mt-1">
        {[1, 100, 500, 1000].map((preset) => {
          const isSelected = getRawNumericValue(amount) === preset;
          const label = preset >= 1000 ? `${preset / 1000}K` : preset;
          return (
            <button
              key={preset}
              onClick={() => setAmount(preset.toLocaleString('en-US'))}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-xs cursor-pointer ${
                isSelected
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-white border-2 border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-850'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Interactive Picker Cards Row */}
      <div className="flex items-center gap-2 w-full mt-2 relative">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          onClick={() => openCurrencyModal('from')}
          className="flex-1 flex items-center justify-between px-4 py-3 bg-white border-2 border-zinc-200/90 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold flex items-center justify-center border-2 border-zinc-300 uppercase dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">
              {fromObj.flag}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-none">{fromObj.code} <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">FROM</span></span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">{fromObj.name}</span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSwap}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border-2 border-zinc-200 shadow-md flex items-center justify-center cursor-pointer text-zinc-700 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 transition-all"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </motion.button>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          onClick={() => openCurrencyModal('to')}
          className="flex-1 flex items-center justify-between px-4 py-3 bg-white border-2 border-zinc-200/90 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700 pl-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold flex items-center justify-center border-2 border-zinc-300 uppercase dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">
              {toObj.flag}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-none">{toObj.code} <span className="text-[10px] bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 px-1 py-0.5 rounded font-medium text-[9px]">TO</span></span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">{toObj.name}</span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
        </motion.div>
      </div>

      {/* Converted Output Value Section */}
      <div className="w-full bg-amber-50/40 border-2 border-amber-200/80 rounded-3xl p-5 flex flex-col gap-4 relative mt-2 shadow-xs dark:bg-zinc-850/20 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white border border-zinc-200 text-[10px] font-bold text-zinc-500 shadow-2xs dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            CONVERTED TO • Live API
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-white border-2 border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 shadow-2xs transition-colors cursor-pointer dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200">
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button className="w-8 h-8 rounded-full bg-white border-2 border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 shadow-2xs transition-colors cursor-pointer dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200">
              <Star className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight uppercase">{toObj.code.slice(0, 2)}</span>
          <motion.span className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight ml-1">
            {roundedCount}
          </motion.span>
          <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 tracking-wide ml-2 uppercase">{toObj.code}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-1">
          <div className="px-2 py-0.5 rounded-full bg-white border border-zinc-200 flex items-center gap-1 font-semibold text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300">
            <span>~ 1 {fromObj.code} = {dynamicExchangeRate.toFixed(4)} {toObj.code}</span>
          </div>
          <span>•</span>
          <span>{apiError || 'Synced with backend proxy'}</span>
        </div>
      </div>

      {/* Action Toolbar Bottom Bar */}
      <div className="flex items-center gap-3 w-full mt-2">
        <div className="flex-1 h-12 rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 flex items-center justify-center text-xs font-bold tracking-wide shadow-md select-none">
          Convert {fromObj.code} to {toObj.code} • Live API
        </div>
        
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-12 h-12 rounded-full bg-white border-2 border-zinc-200 flex items-center justify-center text-zinc-700 shadow-sm cursor-pointer dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300"><BarChart3 className="w-4 h-4" /></motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-12 h-12 rounded-full bg-white border-2 border-zinc-200 flex items-center justify-center text-zinc-700 shadow-sm cursor-pointer dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300"><Share2 className="w-4 h-4" /></motion.button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 dark:text-zinc-500 font-bold tracking-wide mt-2">
        <Globe className="w-3 h-3 text-zinc-300 dark:text-zinc-700" />
        <span>BACKEND PROXY • FRANKFURTER API V2 • NO MARKUP FEES</span>
      </div>

      {/* --- OVERLAY POPUP MODAL DIALOG PORTAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-xs"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-white border-2 border-zinc-300 rounded-[2rem] p-6 shadow-2xl flex flex-col max-h-[80vh] dark:bg-zinc-900 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Select currency</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 cursor-pointer dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search currency or country"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50/80 border-2 border-zinc-200 rounded-xl outline-none text-sm font-medium text-zinc-900 focus:border-zinc-400 focus:ring-0 transition-colors dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-700"
                />
              </div>

              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wide uppercase mr-1 select-none">Popular</span>
                {POPULAR_CODES.map(code => {
                  const curr = availableCurrencies.find(c => c.code === code);
                  return (
                    <button
                      key={code}
                      onClick={() => selectCurrency(code)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border-2 border-zinc-200 text-xs font-bold text-zinc-700 hover:border-zinc-400 transition-colors shadow-2xs cursor-pointer dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600"
                    >
                      <span className="text-[10px] opacity-60 uppercase">{curr?.flag}</span>
                      <span>{code}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
                {filteredCurrencies.map((item) => {
                  const isCurrentSelection = (modalTarget === 'from' && item.code === fromCurrency) || (modalTarget === 'to' && item.code === toCurrency);
                  return (
                    <div
                      key={item.code}
                      onClick={() => selectCurrency(item.code)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all cursor-pointer ${
                        isCurrentSelection
                          ? 'bg-zinc-950 border-zinc-950 text-white shadow-sm dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-950'
                          : 'bg-white border-transparent text-zinc-900 hover:bg-zinc-50 hover:border-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-850 dark:hover:border-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center border-2 uppercase ${
                          isCurrentSelection ? 'bg-zinc-800 border-zinc-700 text-white dark:bg-zinc-200 dark:border-zinc-300 dark:text-zinc-900' : 'bg-zinc-50 border-zinc-200 text-zinc-500 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400'
                        }`}>
                          {item.flag}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-bold leading-none">
                            {item.code} <span className={`text-[10px] font-medium ml-1 ${isCurrentSelection ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-400 dark:text-zinc-500'}`}>{item.country}</span>
                          </span>
                          <span className={`text-xs font-medium mt-0.5 ${isCurrentSelection ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-400 dark:text-zinc-500'}`}>
                            {item.name}
                          </span>
                        </div>
                      </div>
                      <span className={`text-xs font-bold ${isCurrentSelection ? 'text-zinc-200 dark:text-zinc-700' : 'text-zinc-500'}`}>
                        {item.rate.toFixed(4)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="text-center text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 tracking-wide mt-4 uppercase select-none">
                Live backend rates • Tap to select
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}