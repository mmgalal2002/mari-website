export type ChapterType = 'anime' | 'manga' | 'music';

export interface MediaStoryItem {
  id: string;
  title: string;
  nativeTitle?: string;
  chapter: 'anime' | 'manga';
  genres: string;
  hook: string;
  story: string;
  why: string;
  image: string;
  imagePosition?: string;
  url: string;
  platform: string;
  rating?: string;
  episodesOrChapters?: string;
  releaseYear?: string;
}

export interface MusicTrackItem {
  id: string;
  title: string;
  artist: string;
  genre: string;
  year: string;
  videoId: string;
  note: string;
  trackNumber: string;
  side: string;
  duration?: string;
  coverImage?: string;
}
