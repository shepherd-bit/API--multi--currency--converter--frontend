import { useState, useEffect } from 'react';
import Topbar from './components/Topbar';
import Slogan from './components/Slogan';
import ConversionCard from './components/ConversionCard';
import Trends from './components/Trends';
import PopularConversions from './components/PopularConversions';
import Footer from './components/Footer';

export default function App() {
  // Initialize state based on prior localStorage selection or system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  // Keep the DOM element synchronized with state
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-amber-50/60 via-slate-50 to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 flex flex-col antialiased transition-colors duration-300">
      {/* Pass down theme state and control toggler to Topbar */}
      <Topbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-6">
        <Slogan />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 flex">
            <ConversionCard />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex-1">
              <Trends />
            </div>
            <div className="flex-1">
              <PopularConversions />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}