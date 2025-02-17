import { Grid2, Typography } from '@mui/material';
import theme from '../../styles/theme';
import PasswordField from '../Authentication/PasswordField';
import { ChangeEvent, useState } from 'react';
import {
	validateChangePasswordForm,
	validateConfirmPassword,
	validatePassword,
} from '../Authentication/validation';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';

const ChangePasswordSettings = () => {
	const [data, setData] = useState({
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState({
		password: '',
		confirmPassword: '',
	});

	const handleSubmit = async (): Promise<void> => {
		const newErrors = validateChangePasswordForm(
			data.password,
			data.confirmPassword
		);

		setErrors(newErrors);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked, type } = e.target;
		let errorMessage = '';

		const newValue = type === 'checkbox' ? checked : value;
		setData((prevData) => ({ ...prevData, [name]: newValue }));

		switch (name) {
			case 'password':
				errorMessage = validatePassword(value);
				break;
			case 'confirmPassword':
				errorMessage = validateConfirmPassword(data.password, value);
				break;

			default:
				break;
		}

		setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
	};

	return (
		<Grid2 container spacing={2} size={12}>
			<Grid2
				size={12}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					marginBottom: '1rem',
				}}
			>
				<Typography
					variant="h2"
					sx={{
						textAlign: 'center',
						marginTop: '2rem',
						fontSize: {
							xs: theme.typography.h4.fontSize,
							sm: theme.typography.h3.fontSize,
							md: theme.typography.h3.fontSize,
							lg: theme.typography.h2.fontSize,
							xl: theme.typography.h2.fontSize,
						},
					}}
				>
					Change password
				</Typography>
			</Grid2>
			<Grid2
				container
				size={12}
				sx={{
					width: '100%',
				}}
			>
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

				<Grid2
					size={4}
					offset={{ xs: 0, sm: 6, md: 8 }}
					sx={{
						marginTop: '2rem',
						width: '100%',
						display: 'flex',
						justifyContent: 'flex-end',
					}}
				>
					<ButtonWithIcon
						onClick={handleSubmit}
						icon={<DoneOutlineOutlinedIcon />}
						sx={{
							minWidth: '10rem',
							ml: 'auto',
						}}
					>
						Change password
					</ButtonWithIcon>
				</Grid2>
			</Grid2>
		</Grid2>
	);
};

export default ChangePasswordSettings;
