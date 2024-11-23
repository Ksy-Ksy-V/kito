import { Grid2 } from '@mui/material';
import BackgroundImg from '../../components/BackgroundImg';
import heroSectionBackground from '../../images/heroSectionBackground.png';

const AboutKito = () => {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={12}>
				<BackgroundImg
					title={'About Kito'}
					backgroundImage={heroSectionBackground}
					height={{
						xs: '150px',
						sm: '250px',
						md: '300px',
						lg: '400px',
						xl: '400px',
					}}
				/>
			</Grid2>
		</Grid2>
	);
};

export default AboutKito;
