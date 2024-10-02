import {
	FormControl,
	// InputAdornment,
	// InputLabel,
	// MenuItem,
	Select,
} from '@mui/material';
import StyledButton from '../StyledButton';

import theme from '../../styles/theme';

const SearchFilter: React.FC = () => {
	return (
		<>
			<FormControl fullWidth variant="filled">
				{/* <InputLabel>{label}</InputLabel> */}
				<Select
					sx={{
						color: theme.palette.secondary.main,
						backgroundColor: theme.palette.primary.light,
						borderColor: theme.palette.secondary.main,
						borderRadius: '0',
					}}
					// endAdornment={
					// 	value && (
					// 		<InputAdornment
					// 			position="end"
					// 			sx={{ position: 'absolute', right: 32 }}
					// 		></InputAdornment>
					// 	)
					// }
				>
					{/* {options.map((option) => (
						<MenuItem key={option} id={option} value={option}>
							{transformOption(option)}
						</MenuItem>
					))} */}
				</Select>
			</FormControl>

			<StyledButton sx={{ marginTop: '1rem' }}>
				Clean Filters
			</StyledButton>
		</>
	);
};

export default SearchFilter;
