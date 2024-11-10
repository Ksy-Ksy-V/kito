import { useState } from 'react';
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
import { textFieldStyles } from './AuthStyles';

interface PasswordFieldProps {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
	label,
	value,
	onChange,
	error,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
	};

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
									? 'hide the password'
									: 'display the password'
							}
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
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
