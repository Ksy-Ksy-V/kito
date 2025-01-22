import { DialogContent, Grid2, Typography } from '@mui/material';
import MainButton from '../Buttons/MainButton';
import theme from '../../styles/theme';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = () => {
	const navigate = useNavigate();

	return (
		<DialogContent>
			<Typography
				variant="h5"
				sx={{
					padding: '1rem',
					textAlign: 'center',
				}}
			>
				Sign in to add your favorite anime to your watchlist,
				personalize your settings, and more!
			</Typography>

			<Typography
				variant="h5"
				sx={{
					textAlign: 'center',
					color: theme.palette.primary.main,
					marginBottom: '1rem',
				}}
			>
				Don't have an account?
				<br />
				Create an account now!
			</Typography>

			<Grid2
				container
				spacing={2}
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Grid2 size={{ xs: 12, sm: 6 }}>
					<MainButton
						onClick={() => navigate('/signin')}
						sx={{
							marginTop: { sm: '2rem', xs: '1rem' },
						}}
					>
						Sing In
					</MainButton>
				</Grid2>

				<Grid2 size={{ xs: 12, sm: 6 }}>
					<MainButton
						onClick={() => navigate('/signup')}
						sx={{
							marginTop: { sm: '2rem', xs: '1rem' },
						}}
					>
						Sing Up
					</MainButton>
				</Grid2>
			</Grid2>
		</DialogContent>
	);
};

export default AuthRedirect;
