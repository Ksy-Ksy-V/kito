import { Grid2, Typography } from '@mui/material';
import notFoundImg from '../../images/notFound.png';
import theme from '../../styles/theme';

const EmptyResult = () => {
	return (
		<Grid2 size={12}>
			<Typography
				variant="h3"
				sx={{
					zIndex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					marginTop: '1rem',
					fontSize: {
						xs: theme.typography.h5.fontSize,
						sm: theme.typography.h4.fontSize,
						md: theme.typography.h4.fontSize,
						lg: theme.typography.h3.fontSize,
						xl: theme.typography.h3.fontSize,
					},
				}}
			>
				Sorry... We couldn't find matching anime.
			</Typography>

			<Grid2
				sx={{
					width: '100%',
					height: {
						xs: '10rem',
						sm: '20rem',
						xl: '25rem',
					},
					backgroundImage: `url(${notFoundImg})`,
					backgroundSize: 'contain',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					zIndex: 0,
				}}
			></Grid2>

			<Typography
				variant="h3"
				component="span"
				sx={{
					zIndex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					marginTop: '1rem',
					fontSize: {
						xs: theme.typography.h5.fontSize,
						sm: theme.typography.h4.fontSize,
						md: theme.typography.h4.fontSize,
						lg: theme.typography.h3.fontSize,
						xl: theme.typography.h3.fontSize,
					},
				}}
			>
				Try changing your filter parameters
			</Typography>
		</Grid2>
	);
};

export default EmptyResult;
