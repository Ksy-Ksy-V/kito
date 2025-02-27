import { FC, useState } from 'react';
import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { textFieldStyles } from '../../styles/AuthStyles';
import { PasswordFieldProps } from '../../models/Interfaces';

const PasswordField: FC<PasswordFieldProps> = ({
	label,
	value,
	onChange,
	error,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	return (
		<FormControl variant="outlined" fullWidth sx={textFieldStyles}>
			<InputLabel>{label}</InputLabel>
			<OutlinedInput
				value={value}
				onChange={onChange}
				type={showPassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label={
								showPassword
									? 'Hide the password'
									: 'Display the password'
							}
							onClick={handleClickShowPassword}
							edge="end"
						>
							{showPassword ? (
								<VisibilityIcon />
							) : (
								<VisibilityOffIcon />
							)}
						</IconButton>
					</InputAdornment>
				}
				label={label}
			/>

			{error && <FormHelperText error>{error}</FormHelperText>}
		</FormControl>
	);
};

export default PasswordField;
