import { SvgIconProps } from '@mui/material';

export interface SocialLink {
	name: string;
	icon: React.ReactElement<SvgIconProps>;
	href: string;
}
