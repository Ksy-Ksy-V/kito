import {
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	InputAdornment,
	IconButton,
	FormHelperText,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../../styles/theme';
import { StyledCustomSelectProps } from '../../models/Interfaces';
import { FC } from 'react';

const CustomSelect: FC<StyledCustomSelectProps> = ({
	label,
	value,
	onChange,
	options,
	clearValue,
	defaultValue,
	capitalizeOptions = false,
	upperCaseOptions = false,
	validationError,
	hasValidationError,
}) => {
	const transformOption = (option: string) => {
		if (capitalizeOptions) {
			return (
				option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()
			);
		}
		if (upperCaseOptions) {
			return option.toUpperCase();
		}

		return option;
	};

	return (
		<FormControl
			fullWidth
			variant="filled"
			sx={{ marginTop: { xs: '1rem', md: '1.1rem' } }}
		>
			<InputLabel>{label}</InputLabel>
			<Select
				defaultValue={defaultValue}
				value={value}
				onChange={onChange}
				sx={{
					color: theme.palette.secondary.main,
					backgroundColor: theme.palette.primary.light,
					borderColor: theme.palette.secondary.main,
					borderRadius: '0',
				}}
				endAdornment={
					value && (
						<InputAdornment
							position="end"
							sx={{ position: 'absolute', right: 32 }}
						>
							<IconButton size="small" onClick={clearValue}>
								<ClearIcon
									sx={{
										fontSize: '20px',
									}}
								/>
							</IconButton>
						</InputAdornment>
					)
				}
			>
				{options.map((option) => (
					<MenuItem key={option} id={option} value={option}>
						{transformOption(option)}
					</MenuItem>
				))}
			</Select>
			{hasValidationError && (
				<FormHelperText>{validationError}</FormHelperText>
			)}
		</FormControl>
	);
};

export default CustomSelect;
