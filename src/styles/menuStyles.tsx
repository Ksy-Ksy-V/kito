import { SxProps, Theme } from '@mui/material/styles';

export const menuStyles: SxProps<Theme> = {
	borderRadius: '16px',

	width: '20rem',
};

export const menuItemStyles = (theme: Theme): SxProps<Theme> => ({
	color: theme.palette.primary.main,
	'&:hover': {
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.action.hover,
	},
});
