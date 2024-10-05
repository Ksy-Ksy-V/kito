import {
	AnimeRating,
	AnimeSearchStatus,
	SearchOrder,
	SortOptions,
} from '@tutkli/jikan-ts';

enum FormatURLEnum {
	tv = 'TV',
	movie = 'Movie',
	ova = 'Ova',
	special = 'Special',
	ona = 'Ona',
}

import { SearchState } from '../context/SearchReducers';
export const buildQueryParams = (
	inputSearch: string,
	filters?: SearchState['filters'],
	orderBy?: SearchState['orderBy'],
	sort?: SearchState['sort']
) => {
	const queryParams: string[] = [];
	if (inputSearch) queryParams.push(`q=${inputSearch}`);
	if (orderBy) queryParams.push(`order=${orderBy}`);
	if (sort) queryParams.push(`sort=${sort}`);

	if (filters?.genres) queryParams.push(`genres=${filters.genres}`);
	if (filters?.format) {
		const formatKey = Object.keys(FormatURLEnum).find(
			(key) =>
				FormatURLEnum[key as keyof typeof FormatURLEnum] ===
				filters.format
		);
		if (formatKey) queryParams.push(`format=${formatKey}`);
	}
	if (filters?.status) queryParams.push(`status=${filters.status}`);
	if (filters?.rating) queryParams.push(`rating=${filters.rating}`);
	return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
};

export const parseQueryParams = (): SearchState['filters'] & {
	query: string;
	sort: SortOptions | undefined;
	orderBy: SearchOrder | undefined;
} => {
	const queryParams = new URLSearchParams(window.location.search);

	const format =
		FormatURLEnum[
			queryParams
				.get('format')
				?.toLowerCase() as keyof typeof FormatURLEnum
		];

	return {
		query: queryParams.get('q') || '',
		orderBy: queryParams.get('order') as SearchOrder | undefined,
		sort: queryParams.get('sort') as SortOptions | undefined,

		genres: queryParams.get('genres') || '',
		format: format || undefined,
		status: queryParams.get('status') as AnimeSearchStatus | undefined,
		rating: queryParams.get('rating') as AnimeRating | undefined,
	};
};
