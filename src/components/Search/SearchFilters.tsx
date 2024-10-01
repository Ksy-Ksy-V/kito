import React from 'react';
import {
	Box,
	Checkbox,
	Collapse,
	FormControlLabel,
	FormGroup,
	Paper,
	Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useSearchContext } from '../../context/SearchContext';

const SearchFilters: React.FC = () => {
	const { state, dispatch } = useSearchContext();

	const handleFilterChange = (filterName: string, value: string) => {
		dispatch({
			type: 'SET_FILTERS',
			payload: { [filterName]: value },
		});
	};

	return (
		<Paper sx={{ padding: '1rem' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Typography variant="h6">Genres</Typography>
				<ExpandMore />
			</Box>

			<Collapse in={true}>
				<FormGroup>
					{['Action', 'Comedy', 'Drama'].map((genre) => (
						<FormControlLabel
							key={genre}
							control={
								<Checkbox
									value={genre}
									checked={state.filters.genres.includes(
										genre
									)}
									onChange={(e) =>
										handleFilterChange(
											'genres',
											e.target.value
										)
									}
								/>
							}
							label={genre}
						/>
					))}
				</FormGroup>
			</Collapse>
		</Paper>
	);
};

export default SearchFilters;
