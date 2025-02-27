import { Grid2, Typography } from '@mui/material';
import AuthPageLayout from '../../components/Authentication/AuthPageLayout';
import SignUpForm from '../../components/Authentication/SignUpForm';
import { useLocation } from 'react-router-dom';

const SignUp = () => {
	const location = useLocation();

	return (
		<AuthPageLayout>
			<Grid2>
				<Typography
					id="signup-title"
					variant="h3"
					sx={{ textAlign: 'center', marginBottom: '1.5rem' }}
				>
					Create Account
				</Typography>
				<SignUpForm preSignUpPath={location.state?.preSignUpPath} />
			</Grid2>
		</AuthPageLayout>
	);
};

export default SignUp;
