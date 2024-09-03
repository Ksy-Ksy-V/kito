import { Grid2 } from '@mui/material';
import SliderHomePage from '../../components/HomePage/SliderHomePage';
import PopularSection from '../../components/HomePage/PopularSection';

function Home() {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12 }} sx={{ marginTop: '2rem' }}>
				<SliderHomePage />
				<PopularSection />
			</Grid2>
		</Grid2>
	);
}

export default Home;
