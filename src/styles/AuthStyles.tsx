import { SxProps, Theme } from '@mui/material';
import BackgroundImg from '../images/backgroundKito.png';

export const textFieldStyles: SxProps<Theme> = {
	marginBottom: '1rem',
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderWidth: '0.15rem',
			borderColor: 'secondary.main',
		},
		'&:hover fieldset': {
			borderColor: 'secondary.main',
		},
		'&.Mui-focused fieldset': {
			borderColor: 'secondary.main',
		},
	},
	'& .MuiFormHelperText-root': {
		color: '#d32f2f',
	},
	'& .MuiInputLabel-root': {
		color: 'text.primary',
	},
};

export const formContainerStyles: SxProps<Theme> = {
	margin: 'auto',
	padding: '2rem',
	backgroundColor: 'rgba(29, 51, 53, 0.7)',
	zIndex: 1,
	minHeight: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

export const gridContainerStyles: SxProps<Theme> = {
	backgroundImage: `url(${BackgroundImg})`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	minHeight: '100vh',
	width: '100vw',
	'&::before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		zIndex: 0,
	},
};
