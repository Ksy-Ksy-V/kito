import { SxProps, Theme } from '@mui/material/styles';

export const menuStyles: SxProps<Theme> = {
	borderRadius: '16px',
	boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
	border: '1px solid rgba(29, 51, 53, 0.3)',
};

export const menuItemStyles = (theme: Theme): SxProps<Theme> => ({
	color: theme.palette.primary.main,
	'&:hover': {
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.action.hover,
	},
});
