import {
	AnimeRating,
	AnimeType,
	AnimeSearchStatus,
	SearchOrder,
	SortOptions,
} from '@tutkli/jikan-ts';

export interface AnimeFilters {
	selectedGenres?: string;
	selectedFormat?: string;
	selectedStatus?: string;
	selectedRating?: string;
}

export const animeFormats: AnimeType[] = [
	'TV',
	'Movie',
	'Ova',
	'Special',
	'Ona',
];
export const animeStatuses: AnimeSearchStatus[] = [
	'airing',
	'complete',
	'upcoming',
];
export const animeRatings: AnimeRating[] = ['g', 'pg', 'pg13', 'r17', 'r'];

export const animeOrder: SearchOrder[] = [
	'title',
	'popularity',
	'score',
	'start_date',
];

export const animeSorting: SortOptions[] = ['asc', 'desc'];

export interface AnimeGenresFilters {
	q?: string;
	status?: AnimeSearchStatus;
	format?: AnimeType;
	genres?: string;
	rating?: AnimeRating;
}
