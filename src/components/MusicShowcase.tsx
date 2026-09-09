import React, { useState } from 'react';
import { Play, Pause, Disc, Headphones, ChevronLeft, ChevronRight, Sparkles, Volume2 } from 'lucide-react';
import { MUSIC_TRACKS } from '../data/portalData';
import { MusicTrackItem } from '../types';

interface MusicShowcaseProps {
  activeTrack: MusicTrackItem | null;
  isPlaying: boolean;
  onPlayTrack: (track: MusicTrackItem) => void;
  onTogglePlay: () => void;
  onNextChapter: () => void;
}

export const MusicShowcase: React.FC<MusicShowcaseProps> = ({
  activeTrack,
  isPlaying,
  onPlayTrack,
  onTogglePlay,
  onNextChapter,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = MUSIC_TRACKS[currentIndex];
  const total = MUSIC_TRACKS.length;
  const nextItem = MUSIC_TRACKS[(currentIndex + 1) % total];
  const isCurrentActive = activeTrack?.id === current.id && isPlaying;

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

  const handlePlayCurrent = () => {
    if (activeTrack?.id === current.id) {
      onTogglePlay();
    } else {
      onPlayTrack(current);
    }
  };

  return (
    <section
      id="music"
      className="relative min-h-screen flex flex-col justify-between py-20 px-4 sm:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10 transition-all duration-700">
        <img
          src="/images/new/vinyl_metal_cover_1788981158516.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-15 filter blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090d] via-[#06090d]/90 to-[#06090d]/80" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Chapter Header */}
      <div className="max-w-7xl mx-auto w-full pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              <span>CHAPTER 03 / MUSIC</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400">SIDE A / PLAY IT LOUD</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Louder than words.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-1 max-w-xl">
              For everything you can't put into words. Five tracks. One at a time. All feeling. Enter the mixtape.
            </p>
          </div>

          {/* Quick Track Jump Tabs */}
          <div className="flex items-center gap-2 bg-neutral-900/80 p-1.5 rounded-xl border border-white/10 shrink-0">
            {MUSIC_TRACKS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  currentIndex === idx
                    ? 'bg-orange-500 text-white font-semibold shadow-md shadow-orange-500/30'
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
        {/* Left Column: Track Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-wider font-semibold">
              SIDE A — TRACK {current.trackNumber}
            </span>
            <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase">
              {current.genre} • {current.year}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-sm font-mono text-orange-400/90 tracking-wider block uppercase">
              {current.artist}
            </span>
            <h3 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight leading-tight">
              {current.title}
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed italic">
              "{current.note}"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handlePlayCurrent}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-400/30 cursor-pointer"
              id="music-play-track-button"
            >
              {isCurrentActive ? (
                <>
                  <Pause size={17} fill="currentColor" />
                  <span>Pause track</span>
                </>
              ) : (
                <>
                  <Play size={17} fill="currentColor" />
                  <span>Play this track</span>
                </>
              )}
            </button>

            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs">
              <Headphones size={14} className="text-orange-400" />
              <span>HEADPHONES ON.</span>
            </span>
          </div>

          {/* Audio Equalizer visual simulation */}
          <div className="pt-2 flex items-center gap-1.5 h-6">
            {[40, 70, 95, 60, 85, 30, 90, 45, 100, 50, 75, 35].map((height, i) => (
              <span
                key={i}
                className="w-1 bg-gradient-to-t from-orange-500 to-amber-300 rounded-full transition-all duration-300"
                style={{
                  height: isCurrentActive ? `${height}%` : '20%',
                  opacity: isCurrentActive ? 0.9 : 0.3,
                }}
              />
            ))}
            <span className="text-[11px] font-mono text-neutral-500 ml-3">
              {isCurrentActive ? 'STREAMING 320 KBPS' : 'NO SKIPS. NO APOLOGIES.'}
            </span>
          </div>
        </div>

        {/* Right Column: Vinyl Visualizer Record & Album Sleeve */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center p-4 sm:p-8">
            {/* Album Cover Art Sleeve */}
            {current.coverImage && (
              <div className="absolute left-2 sm:left-6 top-8 bottom-8 w-44 sm:w-56 rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl z-0 transform -rotate-6 transition-transform duration-500 hover:rotate-0">
                <img
                  src={current.coverImage}
                  alt={current.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[9px] font-mono uppercase text-orange-400 font-bold block">
                    TRACK {current.trackNumber}
                  </span>
                  <span className="text-xs font-display font-bold text-white truncate block">
                    {current.artist}
                  </span>
                </div>
              </div>
            )}

            {/* Spinning Vinyl Record Disk */}
            <div
              className={`relative z-10 w-64 sm:w-76 h-64 sm:h-76 rounded-full bg-neutral-950 border-4 border-neutral-800 shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-700 ml-auto mr-2 sm:mr-6 ${
                isCurrentActive ? 'animate-spin-slow shadow-orange-500/30' : ''
              }`}
              style={{
                backgroundImage:
                  'radial-gradient(circle, #1a1d22 10%, #0d0f13 40%, #15181e 65%, #090a0d 90%)',
              }}
            >
              {/* Vinyl Grooves concentric rings */}
              <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-10 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-24 rounded-full border border-white/5 pointer-events-none" />

              {/* Center Vinyl Label */}
              <div className="relative w-24 sm:w-28 h-24 sm:h-28 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 p-2 text-center flex flex-col items-center justify-center shadow-inner">
                <span className="text-[8px] font-mono font-bold tracking-widest text-black/80 uppercase">
                  OFFSCRIPT
                </span>
                <span className="text-[10px] font-display font-black text-black leading-tight truncate max-w-[90px]">
                  {current.title}
                </span>
                <span className="text-[8px] font-mono text-black/70 mt-0.5">
                  SIDE A • 0{currentIndex + 1}
                </span>
                {/* Spindle hole */}
                <div className="w-4 h-4 rounded-full bg-neutral-900 border-2 border-white/30 mt-1" />
              </div>
            </div>

            {/* Play trigger overlay in center if not active */}
            {!isCurrentActive && (
              <button
                type="button"
                onClick={handlePlayCurrent}
                className="absolute z-20 inset-0 m-auto ml-auto mr-12 sm:mr-16 w-16 h-16 rounded-full bg-orange-500/90 hover:bg-orange-400 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer"
                title="Play track"
              >
                <Play size={24} fill="currentColor" className="ml-1" />
              </button>
            )}
          </div>

          {/* Stepper Navigation Footer for Scene */}
          <div className="w-full max-w-lg mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                title="Previous track"
                aria-label="Previous track"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                title="Next track"
                aria-label="Next track"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="group flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-orange-300 transition-colors text-right"
            >
              <div>
                <span className="block text-[10px] uppercase text-neutral-500">
                  {currentIndex === total - 1 ? 'COLLECTION FINALE' : 'UP NEXT'}
                </span>
                <span className="text-white font-medium group-hover:text-orange-300">
                  {currentIndex === total - 1 ? 'One more time?' : nextItem.title}
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
