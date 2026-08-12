import Topbar from './components/Topbar';
import Slogan from './components/Slogan';
import ConversionCard from './components/ConversionCard';
import Trends from './components/Trends';
import PopularConversions from './components/PopularConversions';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-amber-50/60 via-slate-50 to-blue-50 font-sans text-zinc-900 flex flex-col antialiased">
      <Topbar />
      
      {/* Increased max-width slightly to max-w-6xl to accommodate the clean side-by-side split */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-6">
        <Slogan />
        
        {/* Layout Grid Engine: Switches to side-by-side alignment on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Side: Conversion Core Card Container */}
          <div className="lg:col-span-7 flex">
            <ConversionCard />
          </div>

          {/* Right Side: Double Stack Columns locked to match the left element height exactly */}
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