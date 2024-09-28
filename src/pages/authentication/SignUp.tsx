import {
	Box,
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
import BackgroundImg from '../../images/background.jpg';

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

	return (
		<Grid2
			container
			spacing={2}
			size={12}
			sx={{
				backgroundImage: `url(${BackgroundImg})`,
				backgroundSize: 'cover',
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
				size={{ xl: 4, lg: 4, md: 6, sm: 6, xs: 12 }}
				offset={{ xl: 8, lg: 8, md: 6, sm: 6, xs: 0 }}
				sx={{
					margin: 'auto',
					padding: '2rem',
					backgroundColor: 'rgba(29, 51, 53, 0.7)',
					zIndex: 1,
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
							onChange={(e) => setName(e.target.value)}
							error={!!errors.name}
							helperText={errors.name}
							sx={{
								marginBottom: '1rem',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderWidth: '0.15rem',
										borderColor: 'primary.main',
									},
									'&:hover fieldset': {
										borderColor: 'primary.main',
									},
									'&.Mui-focused fieldset': {
										borderColor: 'primary.main',
									},
								},
								'& .MuiInputLabel-root': {
									color: 'primary.main',
								},
							}}
						/>

						<TextField
							fullWidth
							label="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							error={!!errors.email}
							helperText={errors.email}
							sx={{
								marginBottom: '1rem',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderWidth: '0.15rem',
										borderColor: 'primary.main',
									},
									'&:hover fieldset': {
										borderColor: 'primary.main',
									},
									'&.Mui-focused fieldset': {
										borderColor: 'primary.main',
									},
								},
								'& .MuiInputLabel-root': {
									color: 'primary.main',
								},
							}}
						/>

						<TextField
							fullWidth
							label="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							error={!!errors.password}
							helperText={errors.password}
							sx={{
								marginBottom: '1rem',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderWidth: '0.15rem',
										borderColor: 'primary.main',
									},
									'&:hover fieldset': {
										borderColor: 'primary.main',
									},
									'&.Mui-focused fieldset': {
										borderColor: 'primary.main',
									},
								},
								'& .MuiInputLabel-root': {
									color: 'primary.main',
								},
							}}
						/>

						<TextField
							fullWidth
							label="Confirm Password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword}
							sx={{
								marginBottom: '1rem',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderWidth: '0.15rem',
										borderColor: 'primary.main',
									},
									'&:hover fieldset': {
										borderColor: 'primary.main',
									},
									'&.Mui-focused fieldset': {
										borderColor: 'primary.main',
									},
								},
								'& .MuiInputLabel-root': {
									color: 'primary.main',
								},
							}}
						/>

						<Typography
							variant="body2"
							sx={{
								textAlign: 'right',
								marginBottom: '1rem',
								cursor: 'pointer',
								color: 'primary.main',
							}}
							onClick={() => navigate('/forgot-password')}
						>
							Forgot password?
						</Typography>

						<FormControlLabel
							control={
								<Checkbox
									checked={agreeToTerms}
									onChange={(e) =>
										setAgreeToTerms(e.target.checked)
									}
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

						<StyledButton
							type="submit"
							sx={{
								'&:hover': {},
							}}
						>
							Register
						</StyledButton>
					</form>
				</Grid2>
			</Grid2>
		</Grid2>
	);
};

export default SignUp;
