import Topbar from './components/Topbar';
import Slogan from './components/Slogan';
import ConversionCard from './components/ConversionCard';
import Trends from './components/Trends';
import PopularConversions from './components/PopularConversions';
import Footer from './components/Footer';

export default function App() {
  return (
    // Change "bg-black text-zinc-100" to a light gradient and dark text:
    <div className="min-h-screen bg-gradient-to-tr from-amber-50/60 via-slate-50 to-blue-50 font-sans text-zinc-900 flex flex-col antialiased">
      <Topbar />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 space-y-6">
        <Slogan />
        <ConversionCard />
        <Trends />
        <PopularConversions />
      </main>
      <Footer />
    </div>
  );
}