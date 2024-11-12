import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { Grid2, Link, TextField, Typography } from '@mui/material';
import MainButton from '../../components/Buttons/MainButton';
import theme from '../../styles/theme';
import BackgroundImg from '../../images/backgroundKito.png';
import { textFieldStyles } from '../../styles/AuthStyles';
import { signinAsync } from '../../store/reducers/authSlice';
import {
	validateEmail,
	validateFormSingIn,
	validatePassword,
} from '../../components/Authentication/validation';
import PasswordField from '../../components/Authentication/PasswordField';

const SignIn = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const [validationsErrors, setValidationsErrors] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();
		const email = data.email;
		const password = data.password;

		setLoading(true);

		const newValidationErrors = validateFormSingIn(email, password);
		setValidationsErrors(newValidationErrors);

		const isValid = Object.values(newValidationErrors).every(
			(error) => error === ''
		);

		if (!isValid) {
			setLoading(false);
			return;
		}

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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setData((prevData) => ({ ...prevData, [name]: value }));

		const error =
			name === 'email' ? validateEmail(value) : validatePassword(value);

		setValidationsErrors((prevErrors) => ({
			...prevErrors,
			[name]: error,
		}));
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
						Sign In
					</Typography>

					<form
						onSubmit={handleSubmit}
						aria-labelledby="signup-title"
					>
						<TextField
							id="email"
							fullWidth
							label="Email"
							type="email"
							value={data.email}
							name="email"
							onChange={handleChange}
							helperText={validationsErrors.email}
							sx={textFieldStyles}
						/>

						<PasswordField
							label="Password"
							value={data.password}
							onChange={(e) =>
								handleChange({
									...e,
									target: { ...e.target, name: 'password' },
								})
							}
							error={validationsErrors.password}
						/>

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
