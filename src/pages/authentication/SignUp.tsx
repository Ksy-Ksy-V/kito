import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Checkbox,
	FormControlLabel,
	FormHelperText,
	Grid2,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import StyledButton from '../../components/Buttons/StyledButton';
import BackgroundImg from '../../images/backgroundKito.png';
import {
	validateName,
	validateEmail,
	validatePassword,
	validateConfirmPassword,
	validateTerms,
	validateForm,
} from '../../components/Authentication/validation';
import { textFieldStyles } from '../../components/Authentication/TextFieldStyles ';
import theme from '../../styles/theme';
import { signup } from '../../store/reducers/authSlice';
import { useAppDispatch } from '../../store/hooks';

const SignUp = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [agreeToTerms, setAgreeToTerms] = useState(false);

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		terms: '',
	});

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();

		const newErrors = validateForm(
			name,
			email,
			password,
			confirmPassword,
			agreeToTerms
		);

		setErrors(newErrors);

		const isValid = Object.values(newErrors).every((error) => error === '');

		if (isValid) {
			setLoading(true);
			dispatch(
				signup({
					name,
					email,
					password,
				})
			)
				.unwrap()
				.then(() => navigate('/'))
				.catch(() => setLoading(false));
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		if (validateEmail(e.target.value) === '') {
			setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
		}
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
		if (validateName(e.target.value) === '') {
			setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
		}
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		if (validatePassword(e.target.value) === '') {
			setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
		}
	};

	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setConfirmPassword(e.target.value);
		if (validateConfirmPassword(password, e.target.value) === '') {
			setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
		}
	};

	const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAgreeToTerms(e.target.checked);
		if (validateTerms(e.target.checked) === '') {
			setErrors((prevErrors) => ({ ...prevErrors, terms: '' }));
		}
	};

	// const handleApply = async (
	// 	e: React.FormEvent<HTMLFormElement>
	// ): Promise<void> => {
	// 	e.preventDefault();
	// 	setLoading(true);

	// 	dispatch(signup({ name, email, password, confirmPassword }))
	// 		.unwrap()
	// 		// .then(() => {
	// 		// 	dispatch(loginAsync({ email, password }))
	// 		// 		.unwrap()
	// 		// 		.then(() => {
	// 		// 			setLoading(true);
	// 		// 			navigate('/');
	// 		// 			window.location.reload();
	// 		// 		})
	// 		// 		.catch(() => {
	// 		// 			setLoading(false);
	// 		// 		});
	// 		// })
	// 		.catch(() => {
	// 			setLoading(false);
	// 		});
	// };

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
							label="Name"
							value={name}
							onChange={handleNameChange}
							helperText={errors.name}
							sx={textFieldStyles}
						/>

						<TextField
							fullWidth
							label="Email"
							type="email"
							value={email}
							onChange={handleEmailChange}
							helperText={errors.email}
							sx={textFieldStyles}
						/>

						<TextField
							fullWidth
							label="Password"
							type="password"
							value={password}
							onChange={handlePasswordChange}
							helperText={errors.password}
							sx={textFieldStyles}
						/>

						<TextField
							fullWidth
							label="Confirm Password"
							type="password"
							value={confirmPassword}
							onChange={handleConfirmPasswordChange}
							helperText={errors.confirmPassword}
							sx={textFieldStyles}
						/>

						<FormControlLabel
							control={
								<Checkbox
									checked={agreeToTerms}
									onChange={handleTermsChange}
									sx={{ color: theme.palette.primary.main }}
								/>
							}
							label="I agree with terms and conditions"
						/>

						{errors.terms && (
							<FormHelperText error sx={{ marginBottom: '1rem' }}>
								{errors.terms}
							</FormHelperText>
						)}

						<Typography
							color={theme.palette.primary.main}
							sx={{
								margin: '1rem',
								textAlign: 'center',
							}}
						>
							<span>Already registered? </span>
							<Link
								href="/signin"
								color={theme.palette.secondary.main}
								sx={{ textDecoration: 'none' }}
							>
								Sign In
							</Link>
						</Typography>

						<StyledButton type="submit" disabled={loading}>
							Sign Up
						</StyledButton>
					</form>
				</Grid2>
			</Grid2>
		</Grid2>
	);
};

export default SignUp;
