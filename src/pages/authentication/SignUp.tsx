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
import MainButton from '../../components/Buttons/MainButton';

import {
	validateName,
	validateEmail,
	validatePassword,
	validateConfirmPassword,
	validateTerms,
	validateForm,
} from '../../components/Authentication/validation';
import {
	formContainerStyles,
	gridContainerStyles,
	textFieldStyles,
} from '../../styles/AuthStyles';
import theme from '../../styles/theme';
import { signinAsync, signupAsync } from '../../store/reducers/authSlice';
import { useAppDispatch } from '../../store/hooks';
import PasswordField from '../../components/Authentication/PasswordField';

const SignUp = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		agreeToTerms: false,
	});

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
			data.name,
			data.email,
			data.password,
			data.confirmPassword,
			data.agreeToTerms
		);

		setErrors(newErrors);

		const isValid = Object.values(newErrors).every((error) => error === '');

		if (isValid) {
			setLoading(true);
			dispatch(
				signupAsync({
					name: data.name,
					email: data.email,
					password: data.password,
				})
			)
				.unwrap()
				.then(() => {
					dispatch(
						signinAsync({
							email: data.email,
							password: data.password,
						})
					)
						.unwrap()
						.then(() => {
							setLoading(true);
							navigate('/');
							window.location.reload();
						})
						.catch(() => {
							setLoading(false);
						});
				})
				.catch(() => setLoading(false));
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked, type } = e.target;
		let errorMessage = '';

		const newValue = type === 'checkbox' ? checked : value;
		setData((prevData) => ({ ...prevData, [name]: newValue }));

		switch (name) {
			case 'name':
				errorMessage = validateName(value);
				break;
			case 'email':
				errorMessage = validateEmail(value);
				break;
			case 'password':
				errorMessage = validatePassword(value);
				break;
			case 'confirmPassword':
				errorMessage = validateConfirmPassword(data.password, value);
				break;
			case 'agreeToTerms':
				errorMessage = validateTerms(checked);
				break;
			default:
				break;
		}

		setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
	};

	return (
		<Grid2 container spacing={2} size={12} sx={gridContainerStyles}>
			<Grid2
				size={{ xl: 4, lg: 5, md: 6, sm: 8, xs: 12 }}
				offset={{ xl: 8, lg: 7, md: 6, sm: 4, xs: 0 }}
				sx={formContainerStyles}
			>
				<Grid2>
					<Typography
						id="signup-title"
						variant="h3"
						sx={{ textAlign: 'center', marginBottom: '1.5rem' }}
					>
						Create Account
					</Typography>

					<form
						onSubmit={handleSubmit}
						aria-labelledby="signup-title"
					>
						<TextField
							id="name"
							fullWidth
							label="Name"
							value={data.name}
							name="name"
							onChange={handleChange}
							helperText={errors.name}
							sx={textFieldStyles}
						/>

						<TextField
							id="email"
							fullWidth
							label="Email"
							type="email"
							value={data.email}
							name="email"
							onChange={handleChange}
							helperText={errors.email}
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
							error={errors.password}
						/>

						<PasswordField
							label="Confirm Password"
							value={data.confirmPassword}
							onChange={(e) =>
								handleChange({
									...e,
									target: {
										...e.target,
										name: 'confirmPassword',
									},
								})
							}
							error={errors.confirmPassword}
						/>

						<FormControlLabel
							control={
								<Checkbox
									checked={data.agreeToTerms}
									name="agreeToTerms"
									onChange={handleChange}
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
								aria-labelledby="login-link-text"
								color={theme.palette.secondary.main}
								sx={{ textDecoration: 'none' }}
							>
								Sign In
							</Link>
						</Typography>

						<MainButton
							type="submit"
							disabled={loading}
							aria-busy={loading}
							aria-label="Sign Up"
						>
							Sign Up
						</MainButton>
					</form>
				</Grid2>
			</Grid2>
		</Grid2>
	);
};

export default SignUp;
