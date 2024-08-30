import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#387171',
		},
		secondary: {
			main: '#64fcf2',
		},
		background: {
			default: '#1d3335',
			paper: '#1d3335',
		},
		text: {
			primary: '#dbfeff',
			secondary: '#E5BDC4',
		},
		action: {
			active: '#387171',
			hover: '#387171',
		},
	},
	typography: {
		fontFamily: 'DM Sans, sans-serif',
		h1: {
			fontFamily: 'Karma, serif',
			fontWeight: 700,
			fontSize: '4.210rem',
			color: '#64fcf2',
		},
		h2: {
			fontFamily: 'Karma, serif',
			fontWeight: 700,
			fontSize: '3.158rem',
			color: '#64fcf2',
		},
		h3: {
			fontFamily: 'Karma, serif',
			fontWeight: 700,
			fontSize: '2.369rem',
			color: '#64fcf2',
		},
		h4: {
			fontFamily: 'Karma, serif',
			fontWeight: 700,
			fontSize: '1.777rem',
			color: '#dbfeff',
		},
		h5: {
			fontFamily: 'Karma, serif',
			fontWeight: 700,
			fontSize: '1.333rem',
			color: '#dbfeff',
		},
		body1: {
			fontFamily: 'DM Sans, sans-serif',
			fontWeight: 400,
			fontSize: '1rem',
			color: '#dbfeff',
		},
		body2: {
			fontFamily: 'DM Sans, sans-serif',
			fontWeight: 400,
			fontSize: '0.550rem',
			color: '#dbfeff',
		},
	},
});

export default theme;
