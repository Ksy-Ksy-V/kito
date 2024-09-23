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
import theme from '../../styles/theme';

interface StyledSarchFiltersProps {
	label: string;
	value: string | '';
	onChange?: (event: SelectChangeEvent<string>) => void;
	options: string[];
	clearValue: () => void;
	capitalizeOptions?: boolean;
	defaultValue?: string;
	upperCaseOptions?: boolean;
}

const StyledSarchFilters: React.FC<StyledSarchFiltersProps> = ({
	label,
	value,
	onChange,
	options,
	clearValue,
	defaultValue,
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
		</FormControl>
	);
};

export default StyledSarchFilters;
