import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Checkbox,
	FormControlLabel,
	FormHelperText,
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
import { textFieldStyles } from '../../styles/AuthStyles';
import theme from '../../styles/theme';
import {
	selectAuth,
	signinAsync,
	signupAsync,
} from '../../store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PasswordField from '../../components/Authentication/PasswordField';
import { AuthFormProps } from '../../models/Interfaces';

const SignUpForm: FC<AuthFormProps> = ({ preSignUpPath }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { loading, error } = useAppSelector(selectAuth);

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
		e: FormEvent<HTMLFormElement>
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
							if (preSignUpPath) {
								navigate(`${preSignUpPath}`);
							} else {
								navigate('/');
							}

							window.location.reload();
						})
						.catch((_error) => {
							console.error(_error);
						});
				})
				.catch((_error) => {
					console.error(_error);
				});
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
		<form onSubmit={handleSubmit} aria-labelledby="signup-title">
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
						target: {
							...e.target,
							name: 'password',
						},
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
						sx={{
							color: theme.palette.primary.main,
						}}
					/>
				}
				label="I agree with terms and conditions"
			/>

			{errors.terms && (
				<FormHelperText error sx={{ marginBottom: '1rem' }}>
					{errors.terms}
				</FormHelperText>
			)}

			{error && (
				<>
					<Typography
						color="error"
						sx={{
							textAlign: 'center',
							marginBottom: '1rem',
						}}
					>
						{error}
					</Typography>
					<Typography
						color={theme.palette.primary.main}
						sx={{
							margin: '1rem',
							textAlign: 'center',
						}}
					>
						<span>Forgot your password? </span>
						<Link
							href="/"
							color={theme.palette.secondary.main}
							sx={{ textDecoration: 'none' }}
						>
							Reset password
						</Link>
					</Typography>
				</>
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
	);
};

export default SignUpForm;
