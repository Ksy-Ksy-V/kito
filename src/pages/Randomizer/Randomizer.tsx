import { Typography, Grid } from '@mui/material';

import RandomFilters from '../../components/RandomFilters';

function Randomizer() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
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
			</Grid>
			<Grid item xs={12}>
				<RandomFilters />
			</Grid>
		</Grid>
	);
}

export default Randomizer;
