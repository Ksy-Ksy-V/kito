import { Typography, Grid2 } from '@mui/material';
import SliderHomePage from '../../components/HomePage/SliderHomePage';

function Home() {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12 }} sx={{ marginTop: '2rem' }}>
				<SliderHomePage />

				<Typography variant="h2">Home Page </Typography>
			</Grid2>
		</Grid2>
	);
}

export default Home;
