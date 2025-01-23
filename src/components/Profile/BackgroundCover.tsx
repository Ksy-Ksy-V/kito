import { Box } from '@mui/material';
import background from '../../images/accountBackground.jpg';
import theme from '../../styles/theme';

const BackgroundCover = () => {
	return (
		<>
			<Box
				sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					backgroundImage: `url(${background})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					borderRadius: '1rem',
					zIndex: 1,
				}}
			></Box>
			<Box
				sx={{
					display: 'flex',
					position: 'absolute',
					width: '100%',
					height: '50%',
					marginTop: { xs: '8rem', sm: '10rem' },
					backgroundColor: theme.palette.background.default,
					borderRadius: '0.5rem',
					zIndex: 2,
				}}
			></Box>
		</>
	);
};

export default BackgroundCover;
