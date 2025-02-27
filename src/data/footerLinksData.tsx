import { FooterLink, SocialLink } from '../models/Interfaces';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

export const importantLinks: FooterLink[] = [
	{ name: 'About Project', path: '/about' },
	{ name: 'Privacy Policy', path: '/policy' },
	{ name: 'Terms of Service', path: '/terms' },
];

export const socialLinks: SocialLink[] = [
	{
		name: 'Instagram',
		icon: <InstagramIcon sx={{ fontSize: 32 }} />,
		href: 'https://instagram.com',
	},
	{
		name: 'X',
		icon: <XIcon sx={{ fontSize: 28 }} />,
		href: 'https://twitter.com',
	},
	{
		name: 'Facebook',
		icon: <FacebookIcon sx={{ fontSize: 32 }} />,
		href: 'https://facebook.com',
	},
];
