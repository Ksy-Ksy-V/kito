import { Grid2, Typography } from '@mui/material';
import theme from '../../styles/theme';
import errorImg from '../../images/error.png';
import MainButton from '../Buttons/MainButton';

const ErrorSection = () => {
	const handleReload = () => {
		window.location.reload();
	};
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
				Sorry... Something went wrong
			</Typography>

			<Grid2
				sx={{
					width: '100%',
					height: {
						xs: '10rem',
						sm: '20rem',
						xl: '25rem',
					},
					backgroundImage: `url(${errorImg})`,
					backgroundSize: 'contain',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					zIndex: 0,
				}}
			></Grid2>

			<Grid2
				sx={{
					marginTop: '1rem',
					zIndex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<MainButton
					sx={{
						width: { xl: '20rem', sm: '15rem' },
					}}
					onClick={handleReload}
				>
					{' '}
					Try again
				</MainButton>
			</Grid2>
		</Grid2>
	);
};

export default ErrorSection;
