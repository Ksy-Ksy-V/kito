import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	FormHelperText,
	Grid2,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import MainButton from '../../components/Buttons/MainButton';
import theme from '../../styles/theme';
import BackgroundImg from '../../images/backgroundKito.png';
import { textFieldStyles } from '../../styles/AuthStyles';
import { selectAuth, signinAsync } from '../../store/reducers/authSlice';
import {
	validateEmail,
	validateFormSingIn,
	validatePassword,
} from '../../components/Authentication/validation';

const SignIn = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const authState = useAppSelector(selectAuth);
	const error = authState?.error || '';

	const [validationsErrors, setValidationsErrors] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();
		const email = event.currentTarget.email.value;
		const password = event.currentTarget.password.value;

		setLoading(true);

		const newValidationErrors = validateFormSingIn(email, password);
		setValidationsErrors(newValidationErrors);

		dispatch(signinAsync({ email, password }))
			.unwrap()
			.then(() => {
				setLoading(true);
				navigate('/');
				window.location.reload();
			})
			.catch(() => {
				setLoading(false);
			});
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		if (validateEmail(e.target.value) === '') {
			setValidationsErrors((prevErrors) => ({
				...prevErrors,
				email: '',
			}));
		}
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		if (validatePassword(e.target.value) === '') {
			setValidationsErrors((prevErrors) => ({
				...prevErrors,
				password: '',
			}));
		}
	};

	return (
		<Grid2
			container
			spacing={2}
			size={12}
			sx={{
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
			}}
		>
			<Grid2
				size={{ xl: 4, lg: 5, md: 6, sm: 8, xs: 12 }}
				offset={{ xl: 8, lg: 7, md: 6, sm: 4, xs: 0 }}
				sx={{
					margin: 'auto',
					padding: '2rem',
					backgroundColor: 'rgba(29, 51, 53, 0.7)',
					zIndex: 1,
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Grid2>
					<Typography
						variant="h3"
						sx={{ textAlign: 'center', marginBottom: '1.5rem' }}
					>
						Create Account
					</Typography>

					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							label="Email"
							type="email"
							helperText={validationsErrors.email}
							value={email}
							onChange={handleEmailChange}
							sx={textFieldStyles}
						/>

						<TextField
							fullWidth
							label="Password"
							type="password"
							value={password}
							onChange={handlePasswordChange}
							helperText={validationsErrors.password}
							sx={textFieldStyles}
						/>

						{error && (
							<FormHelperText error sx={{ marginBottom: '1rem' }}>
								{error}
							</FormHelperText>
						)}

						<Typography
							color={theme.palette.primary.main}
							sx={{
								margin: '1rem',
								textAlign: 'center',
							}}
						>
							<span>Don’t have an account yet? </span>
							<Link
								href="/signup"
								color={theme.palette.secondary.main}
								sx={{ textDecoration: 'none' }}
							>
								Sign Up
							</Link>
						</Typography>

						<Typography> {error} </Typography>

						<MainButton type="submit" disabled={loading}>
							Sign In
						</MainButton>
					</form>
				</Grid2>
			</Grid2>
		</Grid2>
	);
};

export default SignIn;
