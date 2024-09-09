import { TextField, MenuItem, Box, IconButton, Grid } from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const SearchFilter = () => {
	const options = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' },
		{ value: 'option4', label: 'Option 4' },
	];

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						marginBottom: '2rem',
					}}
				>
					<Grid item xs={3}>
						<TextField
							id="outlined-basic"
							label="Search"
							variant="outlined"
							sx={{ minWidth: '200px' }}
						/>
					</Grid>

					<Grid item xs={2}>
						<TextField
							id="outlined-select-1"
							select
							label="Filter 1"
							defaultValue={options[0].value}
							variant="outlined"
							sx={{ minWidth: '150px' }}
						>
							{options.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>

					<Grid item xs={2}>
						<TextField
							id="outlined-select-2"
							select
							label="Filter 2"
							defaultValue={options[0].value}
							variant="outlined"
							sx={{ minWidth: '150px' }}
						>
							{options.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>

					<Grid item xs={2}>
						<TextField
							id="outlined-select-3"
							select
							label="Filter 3"
							defaultValue={options[0].value}
							variant="outlined"
							sx={{ minWidth: '150px' }}
						>
							{options.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={2}>
						<TextField
							id="outlined-select-4"
							select
							label="Filter 4"
							defaultValue={options[0].value}
							variant="outlined"
							sx={{ minWidth: '150px' }}
						>
							{options.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>

					<Grid item xs={1}>
						<IconButton
							color="inherit"
							// onClick={handleMenuClick}
							// sx={{
							// 	color: theme.palette.primary.main,
							// 	'&:hover': {
							// 		color: theme.palette.secondary.main,
							// 	},
							// }}
						>
							<TuneOutlinedIcon sx={{ fontSize: '1.5rem' }} />
						</IconButton>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
};

export default SearchFilter;
