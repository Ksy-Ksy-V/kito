import { Typography, Grid } from '@mui/material';

function Popularity() {
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
					Top Anime by Popularity
				</Typography>
			</Grid>
		</Grid>
	);
}

export default Popularity;
