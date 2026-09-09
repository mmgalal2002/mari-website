import React, { useState } from 'react';
import { Sparkles, Search, Compass, Grid, Music2, Film, BookOpen, Volume2, X } from 'lucide-react';
import { ChapterType, MusicTrackItem } from '../types';

interface NavbarProps {
  activeChapter: ChapterType | 'all';
  onSelectChapter: (chapter: ChapterType | 'all') => void;
  viewMode: 'cinematic' | 'archive';
  onToggleViewMode: (mode: 'cinematic' | 'archive') => void;
  onSurprisePick: () => void;
  activeTrack: MusicTrackItem | null;
  onOpenPlayer: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeChapter,
  onSelectChapter,
  viewMode,
  onToggleViewMode,
  onSurprisePick,
  activeTrack,
  onOpenPlayer,
  searchQuery,
  onSearchChange,
}) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl glass-panel border border-white/10 shadow-2xl shadow-black/60">
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
          id="brand-logo"
        >
          {/* Stylized slash marks */}
          <div className="flex items-center space-x-0.5 text-emerald-400 group-hover:text-cyan-300 transition-colors">
            <span className="w-1 h-5 bg-current rounded-full transform -skew-x-12"></span>
            <span className="w-1 h-5 bg-current rounded-full transform -skew-x-12 opacity-80"></span>
            <span className="w-1 h-5 bg-current rounded-full transform -skew-x-12 opacity-60"></span>
          </div>
          <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            offscript<span className="text-emerald-400">.</span>
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-white/5 border border-white/10 rounded-full text-neutral-400">
            curated
          </span>
        </a>

        {/* Navigation Chapters */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/60 p-1 rounded-xl border border-white/5">
          <a
            href="#anime"
            onClick={(e) => {
              e.preventDefault();
              onSelectChapter('anime');
              document.getElementById('anime')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
              activeChapter === 'anime'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Film size={13} className="text-emerald-400" />
            <span>Anime</span>
            <span className="text-[10px] font-mono opacity-60 ml-0.5">04</span>
          </a>

          <a
            href="#manga"
            onClick={(e) => {
              e.preventDefault();
              onSelectChapter('manga');
              document.getElementById('manga')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
              activeChapter === 'manga'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen size={13} className="text-purple-400" />
            <span>Manga</span>
            <span className="text-[10px] font-mono opacity-60 ml-0.5">05</span>
          </a>

          <a
            href="#music"
            onClick={(e) => {
              e.preventDefault();
              onSelectChapter('music');
              document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
              activeChapter === 'music'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Music2 size={13} className="text-orange-400" />
            <span>Mixtape</span>
            <span className="text-[10px] font-mono opacity-60 ml-0.5">05</span>
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Search bar toggle or input */}
          {showSearch ? (
            <div className="flex items-center bg-black/60 border border-white/20 rounded-xl px-2.5 py-1 transition-all">
              <Search size={14} className="text-neutral-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search 14 picks..."
                className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-28 sm:w-44"
                autoFocus
              />
              <button
                type="button"
                onClick={() => {
                  setShowSearch(false);
                  onSearchChange('');
                }}
                className="text-neutral-400 hover:text-white p-0.5"
                title="Close search"
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowSearch(true)}
              className="p-2 text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/10"
              title="Search collection"
              id="search-button"
            >
              <Search size={15} />
            </button>
          )}

          {/* View mode toggle */}
          <button
            type="button"
            onClick={() => onToggleViewMode(viewMode === 'cinematic' ? 'archive' : 'cinematic')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
              viewMode === 'archive'
                ? 'bg-white/15 text-white border-white/30'
                : 'text-neutral-300 hover:text-white hover:bg-white/5 border-white/10'
            }`}
            title="Toggle Archive / Cinematic view"
            id="viewmode-toggle"
          >
            {viewMode === 'cinematic' ? (
              <>
                <Grid size={14} className="text-emerald-400" />
                <span className="hidden sm:inline">Archive</span>
              </>
            ) : (
              <>
                <Compass size={14} className="text-cyan-400" />
                <span className="hidden sm:inline">Cinematic</span>
              </>
            )}
          </button>

          {/* Surprise Me Shuffle button */}
          <button
            type="button"
            onClick={onSurprisePick}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/50 text-xs font-medium transition-all shadow-sm"
            title="Pick a random story or track"
            id="surprise-button"
          >
            <Sparkles size={13} className="text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Surprise Me</span>
          </button>

          {/* Active track indicator */}
          {activeTrack && (
            <button
              type="button"
              onClick={onOpenPlayer}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs animate-pulse"
              title="Now Playing"
              id="now-playing-nav-button"
            >
              <Volume2 size={13} className="text-orange-400" />
              <span className="max-w-[80px] sm:max-w-[120px] truncate font-medium">
                {activeTrack.title}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
