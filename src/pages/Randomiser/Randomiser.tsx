import { Typography, Grid2 } from '@mui/material';

import RandomFilters from '../../components/RandomFilters';

function Randomiser() {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12 }}>
				<Typography
					variant="h1"
					sx={{
						textAlign: 'center',
						marginTop: '1rem',
						marginBottom: '2rem',
					}}
				>
					Choose Your Preferences
				</Typography>
			</Grid2>
			<Grid2 size={{ xs: 12 }}>
				<RandomFilters />
			</Grid2>
		</Grid2>
	);
}

export default Randomiser;
