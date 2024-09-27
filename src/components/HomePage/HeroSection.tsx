import { Grid2, Typography } from '@mui/material';

import heroSectionBackground from '../../images/heroSectionBackground.png';
import heroSectionBackground2 from '../../images/heroSectionBackground2.png';
import theme from '../../styles/theme';
import AnimeSearchField from '../Search/AnimeSearchField';

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
					height: {
						xs: '500px',
						xl: '600px',
					},
					zIndex: '0',

					backgroundImage: {
						xl: `url(${heroSectionBackground})`,
						lg: `url(${heroSectionBackground})`,
						md: `url(${heroSectionBackground})`,
						sm: `url(${heroSectionBackground})`,
						xs: `url(${heroSectionBackground2})`,
					},
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					'&::before': {
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: {
							xs: 'rgba(0, 0, 0, 0.5)',
							sm: 'transparent',
						},
					},
				}}
			>
				{' '}
			</Grid2>

			<Grid2 size={12} sx={{ zIndex: '1' }}>
				<Typography
					variant="h1"
					sx={{
						textAlign: {
							xs: 'center',
							sm: 'inherit',
						},
						marginTop: {
							xs: '3rem',
							lg: '4rem',
							md: '5rem',
							sm: '6rem',
							xl: '7rem',
						},
						fontSize: {
							xl: theme.typography.h1.fontSize,
							lg: theme.typography.h1.fontSize,
							md: theme.typography.h2.fontSize,
							sm: theme.typography.h2.fontSize,
							xs: theme.typography.h3.fontSize,
						},
					}}
				>
					Otaku has no goal, <br />
					only a path.
				</Typography>
				<Typography
					variant="h2"
					sx={{
						textAlign: {
							xs: 'center',
							sm: 'inherit',
						},
						marginTop: {
							xl: '1rem',
							lg: '1rem',
							md: '1.5rem',
							sm: '1.5rem',
							xs: '3rem',
						},
						color: theme.palette.primary.main,
						fontSize: {
							xl: theme.typography.h2.fontSize,
							lg: theme.typography.h2.fontSize,
							md: theme.typography.h3.fontSize,
							sm: theme.typography.h3.fontSize,
							xs: theme.typography.h4.fontSize,
						},
						marginBottom: '2rem',
					}}
				>
					Find yours!
				</Typography>

				<Grid2 size={6}>
					<AnimeSearchField />
				</Grid2>
			</Grid2>
		</Grid2>
	);
};

export default HeroSection;
