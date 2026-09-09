import React, { useState } from 'react';
import { ExternalLink, Compass, ChevronLeft, ChevronRight, BookOpen, Eye } from 'lucide-react';
import { MANGA_PICKS } from '../data/portalData';
import { MediaStoryItem } from '../types';

interface MangaShowcaseProps {
  onOpenStory: (item: MediaStoryItem) => void;
  onNextChapter: () => void;
}

export const MangaShowcase: React.FC<MangaShowcaseProps> = ({
  onOpenStory,
  onNextChapter,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = MANGA_PICKS[currentIndex];
  const total = MANGA_PICKS.length;
  const nextItem = MANGA_PICKS[(currentIndex + 1) % total];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const handleNext = () => {
    if (currentIndex === total - 1) {
      onNextChapter();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <section
      id="manga"
      className="relative min-h-screen flex flex-col justify-between py-20 px-4 sm:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10 transition-all duration-700">
        <img
          key={current.id}
          src={current.image}
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-15 filter blur-sm scale-110 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090d] via-[#06090d]/90 to-[#06090d]/80" />
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Chapter Header */}
      <div className="max-w-7xl mx-auto w-full pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>CHAPTER 02 / MANGA & MANHWA</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400">BETWEEN THE PANELS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              One more chapter.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-1 max-w-xl">
              The kind of stories that turn a quiet night into a 3 a.m. cliffhanger. Turn the page.
            </p>
          </div>

          {/* Quick Item Jump Tabs */}
          <div className="flex items-center gap-2 bg-neutral-900/80 p-1.5 rounded-xl border border-white/10 shrink-0">
            {MANGA_PICKS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  currentIndex === idx
                    ? 'bg-purple-500 text-white font-semibold shadow-md shadow-purple-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stage Core Showcase */}
      <div className="max-w-7xl mx-auto w-full my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Story Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider font-semibold">
              THE READING ROOM / MANGA & MANHWA
            </span>
            <span className="text-xs font-mono text-neutral-400 tracking-wider">
              {current.genres}
            </span>
          </div>

          <div className="space-y-2">
            {current.nativeTitle && (
              <span className="text-sm font-mono text-purple-400/80 tracking-widest block">
                {current.nativeTitle}
              </span>
            )}
            <h3 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight leading-tight">
              {current.title}
            </h3>
          </div>

          <p className="text-xl sm:text-2xl font-medium text-purple-300 font-display italic">
            "{current.hook}"
          </p>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
            {current.story}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => onOpenStory(current)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-400/30 cursor-pointer"
              id="manga-inside-story-button"
            >
              <span>Inside the story</span>
              <Compass size={17} />
            </button>

            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 hover:border-white/20 transition-all"
              id="manga-read-external-button"
            >
              <span>Read</span>
              <ExternalLink size={16} className="text-purple-400" />
            </a>
          </div>

          {/* Meta specs */}
          <div className="pt-4 flex items-center gap-6 text-xs font-mono text-neutral-400 border-t border-white/5">
            <div>
              <span className="text-neutral-500 block">RATING</span>
              <span className="text-white font-medium">{current.rating}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">LENGTH</span>
              <span className="text-white font-medium">{current.episodesOrChapters}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">PLATFORM</span>
              <span className="text-purple-300 font-medium">{current.platform}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Art Panel */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-lg aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] rounded-2xl overflow-hidden glass-panel border border-purple-500/20 shadow-2xl group">
            <img
              src={current.image}
              alt={current.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

            {/* Corner Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-purple-300">
                0{currentIndex + 1} / 0{total}
              </span>
            </div>

            {/* Quick Discover Trigger overlay */}
            <button
              type="button"
              onClick={() => onOpenStory(current)}
              className="absolute bottom-4 right-4 p-3 rounded-full bg-purple-500 text-white hover:scale-110 transition-transform shadow-xl cursor-pointer"
              title="View full story detail"
            >
              <Eye size={20} />
            </button>
          </div>

          {/* Stepper Navigation Footer for Scene */}
          <div className="w-full max-w-lg mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                title="Previous story"
                aria-label="Previous story"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                title="Next story"
                aria-label="Next story"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="group flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-purple-300 transition-colors text-right"
            >
              <div>
                <span className="block text-[10px] uppercase text-neutral-500">
                  {currentIndex === total - 1 ? 'NEXT CHAPTER' : 'UP NEXT'}
                </span>
                <span className="text-white font-medium group-hover:text-purple-300">
                  {currentIndex === total - 1 ? 'Turn it all the way up (Music)' : nextItem.title}
                </span>
              </div>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
