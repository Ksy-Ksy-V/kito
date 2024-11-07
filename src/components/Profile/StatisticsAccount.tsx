import { Divider, Grid2, Typography } from '@mui/material';
import theme from '../../styles/theme';
import StyledInformation from '../StyledInformation';

const StatisticsAccount = () => {
	const animeNumber = 0;
	const completedVatue = '0 Titles';
	return (
		<Grid2 container spacing={2} size={12}>
			<Grid2
				size={{ lg: 4, md: 5, xs: 12 }}
				sx={{
					backgroundColor: 'rgba(29, 51, 53, 0.7)',
					width: '100%',
					height: '20rem',
					marginTop: '3rem',
					borderRadius: '0.5rem',
				}}
			>
				<Grid2 size={{ lg: 4, md: 5, xs: 12 }}>
					<Typography
						variant="h4"
						sx={{
							padding: '1rem ',
							color: theme.palette.secondary.main,
							textAlign: 'center',
						}}
					>
						{' '}
						Watched{' '}
					</Typography>
				</Grid2>
				<Grid2
					size={{ xs: 4, lg: 1, md: 5 }}
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-evenly',
					}}
				>
					<Typography
						variant="h3"
						sx={{
							color: theme.palette.secondary.main,
						}}
					>
						{animeNumber}
					</Typography>
					<Typography
						variant="h3"
						sx={{
							color: theme.palette.secondary.main,
						}}
					>
						{animeNumber}
					</Typography>
					<Typography
						variant="h3"
						sx={{
							color: theme.palette.secondary.main,
						}}
					>
						{animeNumber}
					</Typography>
				</Grid2>

				<Grid2
					size={{ xs: 4, lg: 1, md: 5 }}
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-evenly',
					}}
				>
					<Typography variant="h5">Anime</Typography>
					<Typography variant="h5">Episodes</Typography>
					<Typography variant="h5">Movies</Typography>
				</Grid2>

				<Divider
					variant="middle"
					sx={{
						marginTop: '1rem',
						marginBottom: '1rem',
						backgroundColor: theme.palette.text.primary,
					}}
				/>

				<Grid2 size={{ xs: 4, lg: 1, md: 5 }} sx={{ padding: '1rem' }}>
					<StyledInformation
						label="Completed:"
						value={completedVatue}
					/>
					<StyledInformation
						label="On hold:"
						value={completedVatue}
					/>
					<StyledInformation
						label="Dropped:"
						value={completedVatue}
					/>
					<StyledInformation
						label="Plan to watch:"
						value={completedVatue}
					/>
				</Grid2>
			</Grid2>

			<Grid2 size={{ lg: 8, md: 7, xs: 12 }}>
				<Typography
					variant="h3"
					sx={{
						width: '50%',
						marginTop: '8rem',
						display: 'flex',
						textAlign: 'center',
						justifyContent: 'center',
						color: theme.palette.primary.main,
					}}
				>
					This Cat is not yet ready to share their journey with the
					world.
				</Typography>
			</Grid2>
		</Grid2>
	);
};

export default StatisticsAccount;
