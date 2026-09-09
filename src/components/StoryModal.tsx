import React, { useEffect } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Bookmark, Sparkles } from 'lucide-react';
import { MediaStoryItem } from '../types';

interface StoryModalProps {
  item: MediaStoryItem | null;
  allItems: MediaStoryItem[];
  onClose: () => void;
  onSelectStory: (item: MediaStoryItem) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  item,
  allItems,
  onClose,
  onSelectStory,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const currentIndex = allItems.findIndex((i) => i.id === item.id);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : allItems[allItems.length - 1];
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : allItems[0];

  const isAnime = item.chapter === 'anime';
  const themeColor = isAnime ? 'emerald' : 'purple';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl rounded-3xl glass-panel border border-white/15 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Art Hero inside Modal */}
        <div className="relative h-60 sm:h-72 w-full shrink-0 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d121a] via-[#0d121a]/60 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 transition-colors z-10 cursor-pointer"
            title="Close dialog"
            id="close-story-modal-button"
          >
            <X size={18} />
          </button>

          {/* Nav pills */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border ${
                isAnime
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
              }`}
            >
              {item.chapter}
            </span>
            <span className="text-xs font-mono text-neutral-300 px-2.5 py-1 rounded-full bg-black/50 border border-white/10">
              {item.genres}
            </span>
          </div>

          {/* Title & Native Title in Art */}
          <div className="absolute bottom-4 left-6 right-6">
            {item.nativeTitle && (
              <span className={`text-xs font-mono tracking-widest block mb-1 ${
                isAnime ? 'text-emerald-400/90' : 'text-purple-400/90'
              }`}>
                {item.nativeTitle}
              </span>
            )}
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              {item.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Hook Callout */}
          <div className={`p-4 rounded-xl border ${
            isAnime
              ? 'bg-emerald-950/30 border-emerald-500/20 text-emerald-200'
              : 'bg-purple-950/30 border-purple-500/20 text-purple-200'
          }`}>
            <p className="text-base sm:text-lg font-medium font-display italic">
              "{item.hook}"
            </p>
          </div>

          {/* Section: The Premise */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <Bookmark size={13} className={isAnime ? 'text-emerald-400' : 'text-purple-400'} />
              <span>THE PREMISE</span>
            </h3>
            <p className="text-neutral-200 text-sm sm:text-base leading-relaxed">
              {item.story}
            </p>
          </div>

          {/* Section: Why It Stays With You */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <Sparkles size={13} className={isAnime ? 'text-emerald-400' : 'text-purple-400'} />
              <span>WHY IT STAYS WITH YOU</span>
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
              {item.why}
            </p>
          </div>

          {/* Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-white/5">
              <span className="text-neutral-500 block mb-1">RATING</span>
              <span className="text-white font-medium text-sm">{item.rating || 'Recommended'}</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-white/5">
              <span className="text-neutral-500 block mb-1">FORMAT</span>
              <span className="text-white font-medium text-sm">{item.episodesOrChapters || 'Series'}</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-white/5 col-span-2 sm:col-span-1">
              <span className="text-neutral-500 block mb-1">PLATFORM</span>
              <span className={`font-medium text-sm ${isAnime ? 'text-emerald-400' : 'text-purple-400'}`}>
                {item.platform}
              </span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-4 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-xl ${
                isAnime
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
                  : 'bg-purple-500 hover:bg-purple-400 text-white shadow-purple-500/20'
              }`}
            >
              <span>{item.platform}</span>
              <ExternalLink size={17} />
            </a>
          </div>

          <p className="text-center text-[11px] font-mono text-neutral-500 pt-1">
            Original tribute artwork. Availability varies by region.
          </p>
        </div>

        {/* Modal Footer: Prev / Next item */}
        <div className="p-4 border-t border-white/10 bg-neutral-950/60 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => onSelectStory(prevItem)}
            className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">PREVIOUS:</span>
            <span className="text-white">{prevItem.title}</span>
          </button>

          <span className="text-xs font-mono text-neutral-500">
            0{currentIndex + 1} / 0{allItems.length}
          </span>

          <button
            type="button"
            onClick={() => onSelectStory(nextItem)}
            className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <span className="hidden sm:inline">NEXT:</span>
            <span className="text-white">{nextItem.title}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
