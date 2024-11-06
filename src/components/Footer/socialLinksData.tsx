import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { SvgIconProps } from '@mui/material';

interface SocialLink {
	name: string;
	icon: React.ReactElement<SvgIconProps>;
	href: string;
}

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
