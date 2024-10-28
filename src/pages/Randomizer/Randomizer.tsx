import { Typography, Grid2 } from '@mui/material';

import RandomFilters from '../../components/Randomizer/RandomFilters';
import theme from '../../styles/theme';

function Randomizer() {
	return (
		<Grid2
			container
			spacing={2}
			sx={{
				minHeight: '70vh',
			}}
		>
			<Grid2 size={{ xs: 12 }}>
				<Typography
					variant="h1"
					sx={{
						textAlign: 'center',
						marginTop: '2rem',
						marginBottom: '2rem',
						color: theme.palette.secondary.main,
						fontSize: {
							xs: theme.typography.h4.fontSize,
							sm: theme.typography.h3.fontSize,
							md: theme.typography.h2.fontSize,
							lg: theme.typography.h2.fontSize,
							xl: theme.typography.h1.fontSize,
						},
					}}
				>
					Choose Your Preferences
				</Typography>
			</Grid2>
			<Grid2
				size={{ xs: 12 }}
				sx={{
					marginBottom: '3rem',
				}}
			>
				<RandomFilters />
			</Grid2>
		</Grid2>
	);
}

export default Randomizer;
