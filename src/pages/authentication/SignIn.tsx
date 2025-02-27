import { Grid2, Typography } from '@mui/material';
import AuthPageLayout from '../../components/Authentication/AuthPageLayout';
import SignInForm from '../../components/Authentication/SignInForm';

const SignIn = () => {
	return (
		<AuthPageLayout>
			<Grid2>
				<Typography
					variant="h3"
					sx={{ textAlign: 'center', marginBottom: '1.5rem' }}
				>
					Welcome Back
				</Typography>
				<SignInForm />
			</Grid2>
		</AuthPageLayout>
	);
};

export default SignIn;
