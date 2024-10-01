import { AnimeSearchFilters } from '../models/animeFilters';

export const buildQueryParams = (
	inputSearch: string,
	filters: AnimeSearchFilters
) => {
	const queryParams: string[] = [];
	if (inputSearch) queryParams.push(`q=${inputSearch}`);
	if (filters.genres) queryParams.push(`genres=${filters.genres}`);
	if (filters.type) queryParams.push(`format=${filters.type}`);
	if (filters.status) queryParams.push(`status=${filters.status}`);
	if (filters.rating) queryParams.push(`rating=${filters.rating}`);
	return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
};

export const parseQueryParams = (): AnimeSearchFilters => {
	const queryParams = new URLSearchParams(window.location.search);

	return {
		q: queryParams.get('q') || '',
		genres: queryParams.get('genres') || '',
		type: queryParams.get('format') || '',
		status: queryParams.get('status') || '',
		rating: queryParams.get('rating') || '',
	};
};
