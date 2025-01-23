import { FC, FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Button, Link, TextField, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import MainButton from '../../components/Buttons/MainButton';
import theme from '../../styles/theme';
import { textFieldStyles } from '../../styles/AuthStyles';
import { selectAuth, signinAsync } from '../../store/reducers/authSlice';
import {
	validateEmail,
	validateFormSingIn,
	validatePassword,
} from '../../components/Authentication/validation';
import PasswordField from '../../components/Authentication/PasswordField';
import { AuthFormProps } from '../../models/Interfaces';

const SignInForm: FC<AuthFormProps> = ({ preSignUpPath }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { loading, error } = useAppSelector(selectAuth);

	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const [validationsErrors, setValidationsErrors] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (
		event: FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();
		const email = data.email;
		const password = data.password;

		const newValidationErrors = validateFormSingIn(email, password);
		setValidationsErrors(newValidationErrors);

		const isValid = Object.values(newValidationErrors).every(
			(error) => error === ''
		);

		if (!isValid) {
			return;
		}

		dispatch(signinAsync({ email, password }))
			.unwrap()
			.then(() => {
				if (location.pathname === '/signin') {
					navigate('/');
				} else {
					navigate(location.pathname);
				}
			})
			.catch((_error) => {
				console.error(_error);
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
		<form onSubmit={handleSubmit} aria-labelledby="signup-title">
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
						target: {
							...e.target,
							name: 'password',
						},
					})
				}
				error={validationsErrors.password}
			/>

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
				<span>Don’t have an account yet? </span>
				<Button
					onClick={() =>
						navigate('/signup', {
							state: { preSignUpPath },
						})
					}
				>
					Sign Up
				</Button>
			</Typography>

			<MainButton type="submit" disabled={loading}>
				Sign In
			</MainButton>
		</form>
	);
};

export default SignInForm;
