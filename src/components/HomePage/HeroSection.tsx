import { Grid2, Typography } from '@mui/material';

import heroSectionBackground from '../../images/heroSectionBackground.png';
import theme from '../../styles/theme';

const HeroSection = () => {
	return (
		<Grid2 container>
			<Grid2
				size={12}
				sx={{
					position: 'relative',
					width: '100vw',
					left: '50%',
					right: '50%',
					marginLeft: '-50vw',
					marginRight: '-50vw',
					marginTop: '1rem',
					height: '500px',
					zIndex: '0',

					backgroundImage: `url(${heroSectionBackground})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				{' '}
			</Grid2>

			<Grid2 size={12} sx={{ zIndex: '1' }}>
				<Typography variant="h1" sx={{ marginTop: '7rem' }}>
					Otaku has no goal, <br />
					only a path.
				</Typography>
				<Typography
					variant="h2"
					sx={{ color: theme.palette.text.primary }}
				>
					Find yours!
				</Typography>
			</Grid2>
		</Grid2>
	);
};

export default HeroSection;
