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

enum OrderURLEnum {
	title = 'Title',
	score = 'Score',
	popularity = 'Popularity',
	start_date = 'Start date',
}

import { SearchState } from '../context/SearchReducers';
export const buildQueryParams = (
	inputSearch: string,
	filters?: SearchState['filters'],
	sorting?: SearchState['sorting']
) => {
	const queryParams: string[] = [];
	if (inputSearch) queryParams.push(`q=${inputSearch}`);

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
	if (sorting?.orderBy) queryParams.push(`order=${sorting.orderBy}`);

	if (sorting?.sort) queryParams.push(`sort=${sorting.sort}`);

	if (sorting?.orderBy) {
		const sortingKey = Object.keys(OrderURLEnum).find(
			(key) =>
				OrderURLEnum[key as keyof typeof OrderURLEnum].toLowerCase() ===
				sorting.orderBy?.toLowerCase()
		);
		if (sortingKey) queryParams.push(`order=${sortingKey}`);
	}

	return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
};

export const parseQueryParams = (): SearchState['filters'] &
	SearchState['sorting'] & {
		query: string;
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
		orderBy:
			(queryParams.get('order') as SearchOrder | undefined) || 'title',
		sort: (queryParams.get('sort') as SortOptions | undefined) || 'desc',
		genres: queryParams.get('genres') || '',
		format: format || undefined,
		status: queryParams.get('status') as AnimeSearchStatus | undefined,
		rating: queryParams.get('rating') as AnimeRating | undefined,
	};
};
