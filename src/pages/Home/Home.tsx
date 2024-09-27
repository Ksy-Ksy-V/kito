import { Grid2 } from '@mui/material';

import HeroSection from '../../components/HomePage/HeroSection';
import PopularSection from '../../components/HomePage/PopularSection';
import RandomizerSection from '../../components/HomePage/RandomizerSection';
import OngoingSection from '../../components/HomePage/OngoingSection';

function Home() {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12 }}>
				<HeroSection />
				<PopularSection />
				<RandomizerSection />
				<OngoingSection />
			</Grid2>
		</Grid2>
	);
}

export default Home;
