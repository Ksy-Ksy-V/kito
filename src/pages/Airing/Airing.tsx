import { Typography, Grid } from '@mui/material';

function Airing() {
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
					Now on the screens
				</Typography>
			</Grid>
		</Grid>
	);
}

export default Airing;
