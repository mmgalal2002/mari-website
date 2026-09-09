import React, { useState, useMemo } from 'react';
import { Film, BookOpen, Music2, Search, ExternalLink, Play, Eye, Compass, Sparkles } from 'lucide-react';
import { ANIME_PICKS, MANGA_PICKS, MUSIC_TRACKS } from '../data/portalData';
import { MediaStoryItem, MusicTrackItem } from '../types';

interface ArchiveGridProps {
  onOpenStory: (item: MediaStoryItem) => void;
  onPlayTrack: (track: MusicTrackItem) => void;
  activeTrack: MusicTrackItem | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const ArchiveGrid: React.FC<ArchiveGridProps> = ({
  onOpenStory,
  onPlayTrack,
  activeTrack,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'anime' | 'manga' | 'music'>('all');

  const filteredStories = useMemo(() => {
    let list: MediaStoryItem[] = [];
    if (selectedTab === 'all' || selectedTab === 'anime') {
      list = list.concat(ANIME_PICKS);
    }
    if (selectedTab === 'all' || selectedTab === 'manga') {
      list = list.concat(MANGA_PICKS);
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase();
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.genres.toLowerCase().includes(q) ||
        item.hook.toLowerCase().includes(q) ||
        item.story.toLowerCase().includes(q) ||
        (item.nativeTitle && item.nativeTitle.toLowerCase().includes(q))
    );
  }, [selectedTab, searchQuery]);

  const filteredTracks = useMemo(() => {
    if (selectedTab === 'anime' || selectedTab === 'manga') return [];

    let list = MUSIC_TRACKS;
    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase();
    return list.filter(
      (track) =>
        track.title.toLowerCase().includes(q) ||
        track.artist.toLowerCase().includes(q) ||
        track.genre.toLowerCase().includes(q) ||
        track.note.toLowerCase().includes(q)
    );
  }, [selectedTab, searchQuery]);

  const totalResults = filteredStories.length + filteredTracks.length;

  return (
    <section id="archive" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      {/* Archive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            <Sparkles size={13} />
            <span>ARCHIVE & EXPLORER</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-400">14 PICKS. ZERO FILLER.</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            The Complete Collection
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-1 max-w-xl">
            Filter across all 14 curated anime masterpieces, manhwa cliffhangers, and heavy metal tracks.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-neutral-900/80 p-1.5 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => setSelectedTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedTab === 'all'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            All (14)
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('anime')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedTab === 'anime'
                ? 'bg-emerald-500 text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Film size={13} />
            <span>Anime (4)</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('manga')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedTab === 'manga'
                ? 'bg-purple-500 text-white font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <BookOpen size={13} />
            <span>Manga (5)</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('music')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedTab === 'music'
                ? 'bg-orange-500 text-white font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Music2 size={13} />
            <span>Mixtape (5)</span>
          </button>
        </div>
      </div>

      {/* Search status if searching */}
      {searchQuery.trim() && (
        <div className="py-4 text-xs font-mono text-neutral-400 flex items-center justify-between">
          <span>
            Found {totalResults} result{totalResults === 1 ? '' : 's'} matching "{searchQuery}"
          </span>
          <button
            onClick={() => onSearchChange('')}
            className="text-emerald-400 hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Grid of Stories (Anime + Manga) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
        {filteredStories.map((item) => {
          const isAnime = item.chapter === 'anime';
          return (
            <article
              key={item.id}
              className={`group rounded-2xl glass-panel overflow-hidden border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                isAnime
                  ? 'border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-emerald-950/40'
                  : 'border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-950/40'
              } shadow-xl`}
            >
              {/* Card Image Cover */}
              <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d121a] via-[#0d121a]/40 to-transparent" />

                {/* Chapter badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider ${
                      isAnime
                        ? 'bg-emerald-500 text-black'
                        : 'bg-purple-500 text-white'
                    }`}
                  >
                    {item.chapter}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/70 text-neutral-300 border border-white/10">
                    {item.rating || 'Curated'}
                  </span>
                </div>

                {/* Discover overlay button */}
                <button
                  type="button"
                  onClick={() => onOpenStory(item)}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/90 hover:bg-white text-black shadow-lg hover:scale-110 transition-all cursor-pointer"
                  title="Inside the story"
                >
                  <Eye size={16} />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    {item.genres}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  {item.nativeTitle && (
                    <p className="text-xs font-mono text-neutral-400">
                      {item.nativeTitle}
                    </p>
                  )}
                  <p className="text-xs text-neutral-300 italic pt-1 line-clamp-2">
                    "{item.hook}"
                  </p>
                </div>

                {/* Card Action footer */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenStory(item)}
                    className="text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1.5"
                  >
                    <span>Inside the story</span>
                    <Compass size={13} className={isAnime ? 'text-emerald-400' : 'text-purple-400'} />
                  </button>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1"
                  >
                    <span>{isAnime ? 'Watch' : 'Read'}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Grid of Music Tracks */}
      {filteredTracks.length > 0 && (
        <div className="pt-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-400 mb-6">
            <Music2 size={13} />
            <span>SIDE A / THE MIXTAPE TRACKS ({filteredTracks.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track) => {
              const isCurrent = activeTrack?.id === track.id;
              return (
                <article
                  key={track.id}
                  className={`group rounded-2xl glass-panel overflow-hidden border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                    isCurrent
                      ? 'border-orange-500 bg-orange-950/20 shadow-orange-950/50 shadow-xl'
                      : 'border-orange-500/20 hover:border-orange-500/40'
                  }`}
                >
                  {/* Track Cover Image */}
                  {track.coverImage && (
                    <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                      <img
                        src={track.coverImage}
                        alt={track.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d121a] via-[#0d121a]/50 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-orange-300 border border-orange-500/30">
                          TRACK {track.trackNumber}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-mono text-neutral-300 bg-black/70 px-2 py-0.5 rounded border border-white/10 uppercase">
                          {track.genre}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-lg font-display font-bold text-white group-hover:text-orange-300 transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-xs font-mono text-neutral-400 uppercase">
                          {track.artist} • {track.year}
                        </p>
                      </div>

                      <p className="text-xs text-neutral-300 italic line-clamp-2">
                        "{track.note}"
                      </p>
                    </div>

                    <div className="pt-4 mt-2 border-t border-white/5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => onPlayTrack(track)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                          isCurrent
                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                            : 'bg-white/10 hover:bg-orange-500 hover:text-white text-neutral-200'
                        }`}
                      >
                        <Play size={13} fill="currentColor" />
                        <span>{isCurrent ? 'Now Playing' : 'Play Track'}</span>
                      </button>

                      <span className="text-[11px] font-mono text-neutral-500">
                        HEADPHONES ON.
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
