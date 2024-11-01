import {
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	InputAdornment,
	IconButton,
	SelectChangeEvent,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface CustomSelectProps {
	label: string;
	value: string | '';
	onChange: (event: SelectChangeEvent<string>) => void;
	options: string[];
	clearValue: () => void;
	capitalizeOptions?: boolean;
	upperCaseOptions?: boolean;
}

const SelectForm: React.FC<CustomSelectProps> = ({
	label,
	value,
	onChange,
	options,
	clearValue,
	capitalizeOptions = false,
	upperCaseOptions = false,
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
		<FormControl fullWidth variant="filled">
			<InputLabel>{label}</InputLabel>
			<Select
				value={value}
				onChange={onChange}
				endAdornment={
					value && (
						<InputAdornment
							position="end"
							sx={{ position: 'absolute', right: 32 }}
						>
							<IconButton size="small" onClick={clearValue}>
								<ClearIcon
									sx={{
										fontSize: '1.25rem',
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
		</FormControl>
	);
};

export default SelectForm;
