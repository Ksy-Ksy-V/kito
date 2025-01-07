import { Tab, RatingOption, TypeOption } from '../models/Tab';

export const tabs: Tab[] = [
	{ label: 'Watching', value: 'Watching' },
	{ label: 'Completed', value: 'Completed' },
	{ label: 'On-Hold', value: 'On-Hold' },
	{ label: 'Dropped', value: 'Dropped' },
	{ label: 'Plan to Watch', value: 'Plan to Watch' },
	{ label: 'Score', value: 'Score' },
];

export const ratingOptions: RatingOption[] = [
	{ label: 'All', value: 'All' },
	{ label: 'This is Legendary - 10!!!', value: '10' },
	{ label: 'Almost Perfect - 9', value: '9' },
	{ label: 'Impressive - 8', value: '8' },
	{ label: 'Pretty Good - 7', value: '7' },
	{ label: 'Decent but Flawed - 6', value: '6' },
	{ label: 'Just OK - 5', value: '5' },
	{ label: 'Mediocre at Best - 4', value: '4' },
	{ label: 'Needs Improvement - 3', value: '3' },
	{ label: 'Barely Watchable - 2', value: '2' },
	{ label: 'Complete Disaster - 1', value: '1' },
];

export const typeOptions: TypeOption[] = [
	{ label: 'All', value: 'All' },
	{ label: 'TV', value: 'TV' },
	{ label: 'Movie', value: 'Movie' },
	{ label: 'OVA', value: 'OVA' },
	{ label: 'Special', value: 'Special' },
	{ label: 'ONA', value: 'ONA' },
];
