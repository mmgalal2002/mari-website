import React from 'react';
import { RotateCcw, ArrowUp, Sparkles, Compass } from 'lucide-react';

interface EncoreFooterProps {
  onGoAgain: () => void;
  onBackToTop: () => void;
}

export const EncoreFooter: React.FC<EncoreFooterProps> = ({
  onGoAgain,
  onBackToTop,
}) => {
  return (
    <div className="relative border-t border-white/5 bg-[#05070a]">
      {/* Encore Section */}
      <section className="py-24 px-4 sm:px-8 max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-neutral-400">
          <Sparkles size={12} className="text-emerald-400" />
          <span>14 PICKS. NO WRONG TURNS.</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
            One more time?
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-normal max-w-md mx-auto">
            Another world is always one scroll away.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={onGoAgain}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-emerald-400 text-black font-bold text-sm tracking-wide transition-all shadow-xl hover:shadow-emerald-400/20 hover:-translate-y-0.5 cursor-pointer"
            id="encore-go-again-button"
          >
            <RotateCcw size={17} />
            <span>Go again</span>
          </button>

          <button
            type="button"
            onClick={onBackToTop}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-all cursor-pointer"
            id="encore-back-to-top-button"
          >
            <span>Back to the collection</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="py-12 px-4 sm:px-8 border-t border-white/5 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-0.5 text-emerald-400">
            <span className="w-1 h-4 bg-current rounded-full transform -skew-x-12"></span>
            <span className="w-1 h-4 bg-current rounded-full transform -skew-x-12 opacity-80"></span>
            <span className="w-1 h-4 bg-current rounded-full transform -skew-x-12 opacity-60"></span>
          </div>
          <span className="font-display font-bold text-base text-white">
            offscript<span className="text-emerald-400">.</span>
          </span>
        </div>

        {/* Tribute Disclaimer */}
        <p className="text-center md:text-left max-w-md text-neutral-500">
          Original tribute artwork. All titles, trademarks, and media belong to their respective creators and licensing holders.
        </p>

        {/* Monospace Tagline */}
        <div className="font-mono tracking-widest text-[11px] text-emerald-400/90 font-semibold">
          STAY CURIOUS. STAY OFFSCRIPT.
        </div>
      </footer>
    </div>
  );
};
