import { ChangeEvent, ReactElement, ReactNode } from 'react';
import { AbstractAnime } from './AbstractAnime';
import { ButtonProps, SelectChangeEvent, SvgIconProps } from '@mui/material';
import { Anime, Genre, JikanImages } from '@tutkli/jikan-ts';
import { AnimeKito, UserAccount } from './ProfileModels';

// General Anime Details and Sections
export interface AbstractAnimeProps {
	anime?: AbstractAnime | null;
	loading: boolean;
	randomizerPage?: boolean;
	getRandomize?: (timeout: boolean) => void;
}

export interface AnimeSectionProps {
	anime: Anime | null;
	loading?: boolean;
}

//User
export interface UserInfoProps {
	user: UserAccount;
	hideStats?: boolean;
	newName?: string;
	newStatus?: string;
	isSettingsPage?: boolean;
}

// Anime Information and Cards
export interface AnimeCardProps {
	image: string;
	title: string;
	mal_id?: number;
	isTitle?: boolean;
}

export interface AnimeAvatarProps {
	title?: string;
	imageUrl?: string;
	mal_id?: number;
	loading: boolean;
}

export interface KitoCardProps {
	anime: AnimeKito;
	loading?: boolean;
}

export interface AnimeInfoCardProps {
	number: number;
	anime: Anime;
	loading: boolean;
}

// Filters, Sorting, and Search Options

export interface GeneralSelectProps {
	label: string;
	options: string[];
	clearValue: () => void;
	capitalizeOptions?: boolean;
	upperCaseOptions?: boolean;
}
export interface CustomSelectProps extends GeneralSelectProps {
	value: string | '';
	onChange: (event: SelectChangeEvent<string>) => void;
}

export interface StyledCustomSelectProps extends GeneralSelectProps {
	value: string | undefined;
	defaultValue?: string;
	onChange?: (event: SelectChangeEvent<string>) => void;
	upperCaseOptions?: boolean;
	validationError?: string | null;
	hasValidationError?: boolean;
}

export interface RandomFiltersProps {
	loading?: boolean;
	error?: boolean;
	animeGenres: Genre[];
}

export interface AnimeFilters {
	selectedGenres?: string;
	selectedFormat?: string;
	selectedStatus?: string;
	selectedRating?: string;
}

export interface GenresFilterProps {
	genresOpenValue: boolean;
}

export interface AnimeOptionType {
	inputValue?: string;
	title: string;
	mal_id?: number;
	images?: JikanImages;
}

// Pages and Wrappers
export interface PageWrapperProps {
	children: ReactNode;
	fullWidth: boolean;
}

export interface AuthPageLayoutProps {
	children: ReactNode;
}

export interface PagePaginationProps {
	loading?: boolean;
	page?: number;
	count?: number;
	onChange?: (event: ChangeEvent<unknown>, page: number) => void;
}

export interface BackgroundImgProps {
	backgroundImage?: string;
	loading?: boolean;
	title?: string;
	height?: string | Record<string, string>;
}

// Legal and Text Content
export interface WelcomeLegalProps {
	content: string[];
}

export interface legalProps {
	id: number;
	title: string;
	content: string[];
}

export interface TextBlockProps {
	welcomeText: WelcomeLegalProps[];
	itemText: legalProps[];
}

// Buttons and Inputs
export interface PasswordFieldProps {
	label: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	error?: string;
}

export interface IconButtonProps extends ButtonProps {
	loading?: boolean;
	icon?: ReactNode;
}

export interface SearchButtonsProps {
	dialogOptions?: boolean;
	closeDialog?: () => void;
}

export interface YourRatingFieldProps {
	loading?: boolean;
	width: {
		xs: string;
		sm: string;
		md: string;
	};
}

export interface WidthProps {
	width?: {
		xs: string;
		sm: string;
		md: string;
		lg: string;
	};
}

export interface MenuProps {
	userAuthorized?: boolean;
	onSignOut: () => void;
}

export interface ChangeListProps {
	loading?: boolean;
	anime: AnimeKito;
	handleClose: () => void;
	handleRemoveOpen?: () => void;
}
export interface RemoveListProps {
	loading?: boolean;
	anime: AnimeKito;
	handleClose: () => void;
	handleCloseRemove: () => void;
}

export interface AddAnimeDialogProps {
	loading?: boolean;
	handleClose: () => void;
	anime: Anime;
}

export interface AuthFormProps {
	preSignUpPath?: string;
}

// Utility and Shared Data
export interface RouteContent {
	path: string;
	element: JSX.Element;
}

export interface SliderItem {
	title: string;
	description: string;
	backgroundImage: string;
	thumbnailImage: string;
	mal_id: number;
}

export interface LabeledOption {
	label: string;
	value: string;
}

export interface SocialLink {
	name: string;
	icon: ReactElement<SvgIconProps>;
	href: string;
}

export interface FooterLink {
	name: string;
	path: string;
}

// Placeholder and Empty States
export interface EmptyListProps {
	isFiltrated: boolean;
}

export interface RenderAnimeCardsProps {
	paginatedAnime: AnimeKito[];
	activeTab: string;
	isFiltrated: boolean;
	loading: boolean;
}
