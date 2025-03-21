import { LabeledOption } from '../models/Interfaces';

export enum listNameValues {
	Watching = 'Watching',
	Completed = 'Completed',
	OnHold = 'On-Hold',
	Dropped = 'Dropped',
	PlanToWatch = 'Plan to Watch',
	Empty = ' ',
}

export const tabs: LabeledOption[] = [
	{ value: listNameValues.Watching, label: 'Watching' },
	{ value: listNameValues.Completed, label: 'Completed' },
	{ value: listNameValues.OnHold, label: 'On-Hold' },
	{ value: listNameValues.Dropped, label: 'Dropped' },
	{ value: listNameValues.PlanToWatch, label: 'Plan to Watch' },
	{ value: 'Score', label: 'Score' },
];

export const listNames = [
	'Watching',
	'Completed',
	'On-Hold',
	'Dropped',
	'Plan to Watch',
] as const;
export type ListName = (typeof listNames)[number];

export const type = ['TV', 'Movie', 'OVA', 'Special', 'ONA'] as const;
export type type = (typeof type)[number];

export const ratingOptions: LabeledOption[] = [
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

export const typeOptions: LabeledOption[] = [
	{ label: 'All', value: 'All' },
	{ label: 'TV', value: 'TV' },
	{ label: 'Movie', value: 'Movie' },
	{ label: 'OVA', value: 'OVA' },
	{ label: 'Special', value: 'Special' },
	{ label: 'ONA', value: 'ONA' },
];

export enum GenreKitoValues {
	Action = 'Action',
	Adventure = 'Adventure',
	AvantGarde = 'Avant Garde',
	AwardWinning = 'Award Winning',
	BoysLove = 'Boys Love',
	Comedy = 'Comedy',
	Drama = 'Drama',
	Fantasy = 'Fantasy',
	GirlsLove = 'Girls Love',
	Gourmet = 'Gourmet',
	Horror = 'Horror',
	Mystery = 'Mystery',
	Romance = 'Romance',
	SciFi = 'Sci-Fi',
	SliceOfLife = 'Slice of Life',
	Sports = 'Sports',
	Supernatural = 'Supernatural',
	Suspense = 'Suspense',
}
