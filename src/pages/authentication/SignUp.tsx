import {
	Checkbox,
	FormControlLabel,
	FormHelperText,
	Grid2,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../components/Buttons/StyledButton';
import theme from '../../styles/theme';
import BackgroundImg from '../../images/backgroundKito.png';

const SignUp = () => {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [agreeToTerms, setAgreeToTerms] = useState(false);

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		terms: '',
	});

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePassword = (password: string) => {
		return password.length >= 8;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		let isValid = true;
		const newErrors = {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			terms: '',
		};

		if (!name) {
			newErrors.name = 'Name is required';
			isValid = false;
		}

		if (!validateEmail(email)) {
			newErrors.email = 'Invalid email format';
			isValid = false;
		}

		if (!validatePassword(password)) {
			newErrors.password = 'Password must be at least 8 characters';
			isValid = false;
		}

		if (password !== confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
			isValid = false;
		}

		if (!agreeToTerms) {
			newErrors.terms = 'You must agree to the terms and conditions';
			isValid = false;
		}

		setErrors(newErrors);

		if (isValid) {
			console.log('Form submitted');
			navigate('/welcome');
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		if (validateEmail(e.target.value)) {
			setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
		}
	};

	const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAgreeToTerms(e.target.checked);
		if (e.target.checked) {
			setErrors((prevErrors) => ({ ...prevErrors, terms: '' }));
		}
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
		if (e.target.checked) {
			setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
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
							label="Name"
							value={name}
							onChange={handleNameChange}
							helperText={errors.name}
							sx={{
								marginBottom: '1rem',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderWidth: '0.15rem',
										borderColor: 'secondary.main',
									},
									'&:hover fieldset': {
										borderColor: 'secondary.main',
									},
									'&.Mui-focused fieldset': {
										borderColor: 'secondary.main',
									},
								},
								'& .MuiFormHelperText-root': {
									color: 'red',
								},
								'& .MuiInputLabel-root': {
									color: 'text.primary',
								},
							}}
						/>

						<TextField
							fullWidth
							label="Email"
							type="email"
							value={email}
							onChange={handleEmailChange}
							helperText={errors.email}
							sx={{
								marginBottom: '1rem',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderWidth: '0.15rem',
										borderColor: 'secondary.main',
									},
									'&:hover fieldset': {
										borderColor: 'secondary.main',
									},
									'&.Mui-focused fieldset': {
										borderColor: 'secondary.main',
									},
								},
								'& .MuiFormHelperText-root': {
									color: 'red',
								},
								'& .MuiInputLabel-root': {
									color: 'text.primary',
								},
							}}
						/>

						<TextField
							fullWidth
							label="Password"
							type="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								if (errors.password)
									setErrors((prev) => ({
										...prev,
										password: '',
									}));
							}}
							helperText={errors.password}
							sx={{
								marginBottom: '1rem',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderWidth: '0.15rem',
										borderColor: 'secondary.main',
									},
									'&:hover fieldset': {
										borderColor: 'secondary.main',
									},
									'&.Mui-focused fieldset': {
										borderColor: 'secondary.main',
									},
								},
								'& .MuiFormHelperText-root': {
									color: 'red',
								},
								'& .MuiInputLabel-root': {
									color: 'text.primary',
								},
							}}
						/>

						<TextField
							fullWidth
							label="Confirm Password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							helperText={errors.confirmPassword}
							sx={{
								marginBottom: '1rem',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderWidth: '0.15rem',
										borderColor: 'secondary.main',
									},
									'&:hover fieldset': {
										borderColor: 'secondary.main',
									},
									'&.Mui-focused fieldset': {
										borderColor: 'secondary.main',
									},
								},
								'& .MuiFormHelperText-root': {
									color: 'red',
								},
								'& .MuiInputLabel-root': {
									color: 'text.primary',
								},
							}}
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

						<StyledButton type="submit" sx={{ '&:hover': {} }}>
							Sign Up
						</StyledButton>
					</form>
				</Grid2>
			</Grid2>
		</Grid2>
	);
};

export default SignUp;
