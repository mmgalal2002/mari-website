import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, X, Maximize2, Minimize2, Headphones, Disc, Volume2 } from 'lucide-react';
import { MUSIC_TRACKS } from '../data/portalData';
import { MusicTrackItem } from '../types';

interface FloatingMusicPlayerProps {
  activeTrack: MusicTrackItem | null;
  isPlaying: boolean;
  onClose: () => void;
  onTogglePlay: () => void;
  onSelectTrack: (track: MusicTrackItem) => void;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({
  activeTrack,
  isPlaying,
  onClose,
  onTogglePlay,
  onSelectTrack,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!activeTrack) return null;

  const currentIndex = MUSIC_TRACKS.findIndex((t) => t.id === activeTrack.id);
  const prevTrack = currentIndex > 0 ? MUSIC_TRACKS[currentIndex - 1] : MUSIC_TRACKS[MUSIC_TRACKS.length - 1];
  const nextTrack = currentIndex < MUSIC_TRACKS.length - 1 ? MUSIC_TRACKS[currentIndex + 1] : MUSIC_TRACKS[0];

  return (
    <aside
      aria-label="Audio player dock"
      className={`fixed z-50 transition-all duration-500 ease-out ${
        isExpanded
          ? 'inset-0 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl'
          : 'bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-96'
      }`}
    >
      <div
        className={`w-full rounded-2xl glass-panel border border-orange-500/30 shadow-2xl shadow-orange-950/40 overflow-hidden flex flex-col ${
          isExpanded ? 'max-w-2xl bg-[#0d121a]' : 'bg-[#0a0e14]/95'
        }`}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/5 text-xs">
          <div className="flex items-center gap-2 font-mono text-orange-400">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="font-semibold">OFFSCRIPT / MIXTAPE</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-400">SIDE A</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              title={isExpanded ? 'Minimize player' : 'Expand player & video'}
              aria-label={isExpanded ? 'Minimize player' : 'Expand player & video'}
            >
              {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Close player"
              aria-label="Close player"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Video Embed Section (visible when expanded or on demand) */}
        {isExpanded && (
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeTrack.videoId}?autoplay=1&enablejsapi=1&rel=0`}
              title={activeTrack.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        )}

        {/* Hidden audio-only video embed when minimized so sound plays */}
        {!isExpanded && (
          <div className="hidden">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeTrack.videoId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`}
              title="Music Player Background"
              allow="autoplay"
            />
          </div>
        )}

        {/* Player Body Details */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            {/* Spinning Vinyl Avatar */}
            <div
              className={`relative w-12 h-12 rounded-full bg-neutral-950 border border-neutral-700 flex items-center justify-center shrink-0 shadow-md ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-orange-500 border border-black flex items-center justify-center">
                <Disc size={10} className="text-black" />
              </div>
            </div>

            {/* Title & Artist */}
            <div className="min-w-0 flex-1">
              <h4 className="font-display font-bold text-sm sm:text-base text-white truncate">
                {activeTrack.title}
              </h4>
              <p className="text-xs text-orange-300/80 truncate font-mono">
                {activeTrack.artist} • {activeTrack.year}
              </p>
            </div>

            {/* Expand prompt on mini mode */}
            {!isExpanded && (
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-neutral-300 border border-white/10 shrink-0"
              >
                Video
              </button>
            )}
          </div>

          {/* Note (if expanded) */}
          {isExpanded && (
            <p className="text-xs text-neutral-300 italic bg-white/5 p-3 rounded-xl border border-white/5">
              "{activeTrack.note}"
            </p>
          )}

          {/* Controls Bar */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectTrack(prevTrack)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Previous track"
                aria-label="Previous track"
              >
                <SkipBack size={16} />
              </button>

              <button
                type="button"
                onClick={onTogglePlay}
                className="p-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white shadow-md shadow-orange-500/20 transition-all hover:scale-105"
                title={isPlaying ? 'Pause' : 'Play'}
                aria-label={isPlaying ? 'Pause track' : 'Play track'}
              >
                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
              </button>

              <button
                type="button"
                onClick={() => onSelectTrack(nextTrack)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Next track"
                aria-label="Next track"
              >
                <SkipForward size={16} />
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
              <Headphones size={13} className="text-orange-400" />
              <span>HEADPHONES ON.</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
