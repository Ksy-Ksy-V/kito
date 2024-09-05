import { Grid2 } from '@mui/material';
import SliderHomePage from '../../components/HomePage/SliderHomePage';
import PopularSection from '../../components/HomePage/PopularSection';
import RandomizerSection from '../../components/HomePage/RandomizerSection';

function Home() {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12 }} sx={{ marginTop: '2rem' }}>
				<SliderHomePage />
				<PopularSection />
				<RandomizerSection />
			</Grid2>
		</Grid2>
	);
}

export default Home;
