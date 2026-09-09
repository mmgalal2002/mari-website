import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AnimeShowcase } from './components/AnimeShowcase';
import { MangaShowcase } from './components/MangaShowcase';
import { MusicShowcase } from './components/MusicShowcase';
import { ArchiveGrid } from './components/ArchiveGrid';
import { StoryModal } from './components/StoryModal';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { EncoreFooter } from './components/EncoreFooter';
import { ANIME_PICKS, MANGA_PICKS, MUSIC_TRACKS } from './data/portalData';
import { ChapterType, MediaStoryItem, MusicTrackItem } from './types';

export default function App() {
  const [activeChapter, setActiveChapter] = useState<ChapterType | 'all'>('anime');
  const [viewMode, setViewMode] = useState<'cinematic' | 'archive'>('cinematic');
  const [selectedStory, setSelectedStory] = useState<MediaStoryItem | null>(null);
  const [activeTrack, setActiveTrack] = useState<MusicTrackItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Combined stories for modal navigation
  const allStories = useMemo(() => [...ANIME_PICKS, ...MANGA_PICKS], []);

  // Handle URL hash on initial load (e.g. #anime, #manga, #music)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'anime' || hash === 'manga' || hash === 'music') {
      setActiveChapter(hash as ChapterType);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  // Scroll spy for active chapter
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      const animeEl = document.getElementById('anime');
      const mangaEl = document.getElementById('manga');
      const musicEl = document.getElementById('music');

      if (musicEl && scrollY >= musicEl.offsetTop) {
        setActiveChapter('music');
      } else if (mangaEl && scrollY >= mangaEl.offsetTop) {
        setActiveChapter('manga');
      } else if (animeEl && scrollY >= animeEl.offsetTop) {
        setActiveChapter('anime');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Switch to archive if user types in search
  useEffect(() => {
    if (searchQuery.trim().length > 0 && viewMode !== 'archive') {
      setViewMode('archive');
    }
  }, [searchQuery, viewMode]);

  const handleScrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSurprisePick = () => {
    const totalCount = ANIME_PICKS.length + MANGA_PICKS.length + MUSIC_TRACKS.length;
    const randomIndex = Math.floor(Math.random() * totalCount);

    if (randomIndex < ANIME_PICKS.length) {
      setSelectedStory(ANIME_PICKS[randomIndex]);
    } else if (randomIndex < ANIME_PICKS.length + MANGA_PICKS.length) {
      setSelectedStory(MANGA_PICKS[randomIndex - ANIME_PICKS.length]);
    } else {
      const track = MUSIC_TRACKS[randomIndex - (ANIME_PICKS.length + MANGA_PICKS.length)];
      setActiveTrack(track);
      setIsPlaying(true);
      handleScrollToChapter('music');
    }
  };

  const handlePlayTrack = (track: MusicTrackItem) => {
    setActiveTrack(track);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleGoAgain = () => {
    handleSurprisePick();
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#06090d] text-neutral-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Navigation */}
      <Navbar
        activeChapter={activeChapter}
        onSelectChapter={(chap) => {
          setActiveChapter(chap);
          if (viewMode === 'archive') setViewMode('cinematic');
        }}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onSurprisePick={handleSurprisePick}
        activeTrack={activeTrack}
        onOpenPlayer={() => setIsPlaying(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Viewport */}
      <main className="flex-1 w-full">
        {viewMode === 'cinematic' ? (
          <>
            <HeroSection
              onScrollToChapter={handleScrollToChapter}
              onOpenStory={setSelectedStory}
            />

            <AnimeShowcase
              onOpenStory={setSelectedStory}
              onNextChapter={() => handleScrollToChapter('manga')}
            />

            <MangaShowcase
              onOpenStory={setSelectedStory}
              onNextChapter={() => handleScrollToChapter('music')}
            />

            <MusicShowcase
              activeTrack={activeTrack}
              isPlaying={isPlaying}
              onPlayTrack={handlePlayTrack}
              onTogglePlay={handleTogglePlay}
              onNextChapter={() => handleScrollToChapter('archive-trigger')}
            />
          </>
        ) : (
          <ArchiveGrid
            onOpenStory={setSelectedStory}
            onPlayTrack={handlePlayTrack}
            activeTrack={activeTrack}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}
      </main>

      {/* Encore and Footer */}
      <EncoreFooter
        onGoAgain={handleGoAgain}
        onBackToTop={handleBackToTop}
      />

      {/* Detailed Story Modal */}
      <StoryModal
        item={selectedStory}
        allItems={allStories}
        onClose={() => setSelectedStory(null)}
        onSelectStory={setSelectedStory}
      />

      {/* Interactive Music Player Dock */}
      <FloatingMusicPlayer
        activeTrack={activeTrack}
        isPlaying={isPlaying}
        onClose={() => {
          setIsPlaying(false);
          setActiveTrack(null);
        }}
        onTogglePlay={handleTogglePlay}
        onSelectTrack={handlePlayTrack}
      />
    </div>
  );
}
