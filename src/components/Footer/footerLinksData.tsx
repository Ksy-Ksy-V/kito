export interface FooterLink {
	name: string;
	path: string;
}

export const pagesLinks: FooterLink[] = [
	{ name: 'Home', path: '/' },
	{ name: 'Search', path: '/search' },
	{ name: 'Popularity', path: '/popularity' },
];

export const randomizerLinks: FooterLink[] = [
	{ name: 'Randomizer', path: '/randomizer' },
	{ name: 'News', path: '/news' },
	{ name: 'Airing', path: '/airing' },
];

export const importantLinks: FooterLink[] = [
	{ name: 'About Project', path: '/' },
	{ name: 'Privacy Policy', path: '/' },
	{ name: 'Terms of Service', path: '/' },
];

export const profileLinks: FooterLink[] = [
	{ name: 'Profile', path: '/profile' },
	{ name: 'Settings', path: '/settings' },
];
