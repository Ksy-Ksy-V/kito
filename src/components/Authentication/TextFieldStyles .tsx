import { SxProps, Theme } from '@mui/material';

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
		color: 'red',
	},
	'& .MuiInputLabel-root': {
		color: 'text.primary',
	},
};
