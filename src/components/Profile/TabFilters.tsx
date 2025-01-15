import {
	FormControl,
	Grid2,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import { ratingOptions, typeOptions } from '../../data/tabs';
import theme from '../../styles/theme';

const TabFilters = ({
	loading,
	ratingFilter,
	typeFilter,
	onFilterChange,
}: {
	loading: boolean;
	ratingFilter: string;
	typeFilter: string;
	onFilterChange: (
		event: SelectChangeEvent<string>,
		filterType: 'rating' | 'type'
	) => void;
}) => (
	<>
		<Grid2
			size={{ xs: 12, sm: 6 }}
			sx={{
				display: 'flex',
				gap: '1rem',
				marginBottom: { xs: '2rem', sm: '0rem' },
			}}
		>
			<FormControl fullWidth variant="filled">
				<InputLabel
					id="rating-filter-label"
					sx={{
						color: loading
							? theme.palette.primary.main
							: theme.palette.secondary.main,
						'&:hover': {
							color: theme.palette.secondary.main,
						},
						'&.Mui-focused': {
							color: theme.palette.secondary.main,
						},
						'& .Mui-disabled': {
							color: theme.palette.primary.main,
						},
					}}
				>
					Rating
				</InputLabel>
				<Select
					labelId="rating-filter-label"
					value={ratingFilter}
					onChange={(event) => onFilterChange(event, 'rating')}
					sx={{
						height: '3rem',
						border: 'solid 1px  ',
						borderRadius: '0.25rem',
						borderColor: loading
							? theme.palette.primary.main
							: theme.palette.secondary.main,
						'& .Mui-disabled': {
							borderColor: theme.palette.primary.main,
						},
					}}
				>
					{ratingOptions.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Grid2>

		<Grid2
			size={{ xs: 12, sm: 6 }}
			sx={{
				display: 'flex',
				gap: '1rem',
				marginLeft: { sm: '2rem', xs: '0rem' },
			}}
		>
			<FormControl fullWidth variant="filled">
				<InputLabel
					id="type-filter-label"
					sx={{
						color: loading
							? theme.palette.primary.main
							: theme.palette.secondary.main,
						'&:hover': {
							color: theme.palette.secondary.main,
						},
						'&.Mui-focused': {
							color: theme.palette.secondary.main,
						},
						'& .Mui-disabled': {
							color: theme.palette.primary.main,
						},
					}}
				>
					Type
				</InputLabel>
				<Select
					labelId="type-filter-label"
					value={typeFilter}
					onChange={(event) => onFilterChange(event, 'type')}
					sx={{
						height: '3rem',
						border: 'solid 1px  ',
						borderRadius: '0.25rem',
						borderColor: loading
							? theme.palette.primary.main
							: theme.palette.secondary.main,
						'& .Mui-disabled': {
							borderColor: theme.palette.primary.main,
						},
					}}
				>
					{typeOptions.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Grid2>
	</>
);

export default TabFilters;
