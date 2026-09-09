import React from 'react';
import { ArrowDown, Flame, Compass, Sparkles, Play } from 'lucide-react';
import { ALL_PICKS_COUNT, ANIME_PICKS } from '../data/portalData';
import { MediaStoryItem } from '../types';

interface HeroSectionProps {
  onScrollToChapter: (id: string) => void;
  onOpenStory: (item: MediaStoryItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToChapter,
  onOpenStory,
}) => {
  const spotlightItem = ANIME_PICKS[0]; // Blue Exorcist

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 overflow-hidden"
    >
      {/* Cinematic ambient backdrop with overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <img
          src="/images/new/hero_cinematic_anime_1788981132179.jpg"
          alt="Hero Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 filter blur-xs scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090d] via-[#06090d]/85 to-[#06090d]/60" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Banner Tag */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>ONE SCROLL. ANOTHER WORLD.</span>
        </div>
        <div className="hidden sm:block text-xs font-mono tracking-wider text-neutral-400">
          14 PICKS. ZERO FILLER.
        </div>
      </div>

      {/* Hero Core Content */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="text-xs uppercase font-mono tracking-widest text-neutral-400 flex items-center gap-2">
            <span className="w-6 h-px bg-neutral-600"></span>
            <span>FOR THE BEAUTIFULLY OBSESSED</span>
          </div>

          <h1 className="text-5xl sm:text-7xl xl:text-8xl font-display font-extrabold tracking-tight leading-[0.95] text-white">
            Reality is{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400 bg-clip-text text-transparent">
              overrated.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 max-w-xl leading-relaxed font-normal">
            Extraordinary worlds. Unforgettable stories. A soundtrack that refuses to stay quiet.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => onScrollToChapter('anime')}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 hover:-translate-y-0.5 cursor-pointer"
              id="hero-explore-cta"
            >
              <span>Find your next obsession</span>
              <ArrowDown size={16} />
            </button>

            <button
              type="button"
              onClick={() => onScrollToChapter('music')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <Flame size={15} className="text-orange-400" />
              <span>Enter Mixtape</span>
            </button>
          </div>

          {/* Mini Category Overview */}
          <div className="pt-6 flex flex-wrap gap-3 text-xs font-mono">
            <button
              onClick={() => onScrollToChapter('anime')}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-950/70 transition-colors"
            >
              #01 ANIME (4)
            </button>
            <button
              onClick={() => onScrollToChapter('manga')}
              className="px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-500/20 text-purple-300 hover:bg-purple-950/70 transition-colors"
            >
              #02 MANGA & MANHWA (5)
            </button>
            <button
              onClick={() => onScrollToChapter('music')}
              className="px-3 py-1.5 rounded-lg bg-orange-950/40 border border-orange-500/20 text-orange-300 hover:bg-orange-950/70 transition-colors"
            >
              #03 MIXTAPE (5)
            </button>
          </div>
        </div>

        {/* Hero Spotlight Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative group w-full max-w-md rounded-2xl glass-panel p-5 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                <Sparkles size={12} />
                IN THE SPOTLIGHT
              </span>
              <span className="text-xs font-mono text-neutral-400">01 / ANIME</span>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden mb-4 group-hover:shadow-lg transition-all">
              <img
                src={spotlightItem.image}
                alt={spotlightItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/80 text-black font-semibold uppercase">
                    {spotlightItem.genres.split('/')[0]}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mt-1">
                    {spotlightItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenStory(spotlightItem)}
                  className="p-3 rounded-full bg-white text-black hover:bg-emerald-400 transition-colors shadow-lg"
                  title="Discover story"
                >
                  <Play size={16} fill="currentColor" />
                </button>
              </div>
            </div>

            <p className="text-xs text-neutral-300 line-clamp-2 italic mb-4">
              "{spotlightItem.hook}"
            </p>

            <button
              type="button"
              onClick={() => onOpenStory(spotlightItem)}
              className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <span>Inside the story</span>
              <Compass size={14} className="text-emerald-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-neutral-400 pt-6 border-t border-white/5 font-mono">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400">//</span>
          <span>CURATED COLLECTION</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-300">
          <span>SCROLL DOWN TO EXPLORE</span>
          <ArrowDown size={14} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
};
