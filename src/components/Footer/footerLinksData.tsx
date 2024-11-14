export interface FooterLink {
	name: string;
	path: string;
}

export const importantLinks: FooterLink[] = [
	{ name: 'About Project', path: '/about' },
	{ name: 'Privacy Policy', path: '/privacy-policy' },
	{ name: 'Terms of Service', path: '/terms-of-service' },
];
