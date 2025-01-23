import { DialogContent, Typography } from '@mui/material';
import SignInForm from '../Authentication/SignInForm';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/reducers/authSlice';
import LoadingOverlay from '../Authentication/LoadingOverlay';
import { useLocation } from 'react-router-dom';

const AuthRedirect = () => {
	const { loading } = useAppSelector(selectAuth);
	const location = useLocation();
	return (
		<>
			{loading && <LoadingOverlay />}

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

				<SignInForm preSignUpPath={location.pathname} />
			</DialogContent>
		</>
	);
};

export default AuthRedirect;
