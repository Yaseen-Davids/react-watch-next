export type Series = {
  id: number;
  name: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  premiered: string;
  rating: number;
  medium_image: string;
  original_image: string;
  summary: string;
  updated: number;
  next_episode: string;
  previous_episode: string;
};

export type PreviousEpisodeType = {
  airdate: string;
  name: string;
  episode: number;
  runtime: number;
  season: number;
  summary: string;
};

export type NextEpisodeType = {
  airdate: string;
  name: string;
  episode: number;
  runtime: number;
  season: number;
  summary: string;
};
