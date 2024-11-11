import { Box, Grid2, Typography, useMediaQuery } from '@mui/material';

import theme from '../../styles/theme';
import MainButton from '../Buttons/MainButton';
import { useNavigate } from 'react-router-dom';
import NotFoundCard from '../Cards/NotFoundCard';

const RandomEmptyResult = () => {
	const navigate = useNavigate();

	const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

	const handleReturnToFilter = () => {
		navigate(`/randomizer`);
	};

	return (
		<>
			{isLargeScreen && (
				<Box
					sx={{
						width: '100%',
						height: '31.25rem',
						position: 'absolute',
						left: '50%',
						right: '50%',
						marginLeft: '-50vw',
						marginRight: '-50vw',
						bgcolor: 'rgba(0, 0, 0, 0.5)',
						zIndex: 0,
						marginTop: '2rem',
					}}
				></Box>
			)}

			<Grid2
				container
				spacing={2}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: { xs: 'column', md: 'row' },
					position: 'relative',
					height: {
						xs: '70vh',
						xl: '80vh',
					},
				}}
			>
				<Grid2
					size={{ xs: 12, md: 5 }}
					offset={{ md: 1 }}
					sx={{
						order: { xs: 2, md: 2 },
						textAlign: { xs: 'center', md: 'left' },
						zIndex: 1,
						position: { xs: 'relative', md: 'initial' },
					}}
				>
					<Typography variant="h3" sx={{ marginTop: '-5rem' }}>
						Sorry ...
					</Typography>
					{!isLargeScreen && (
						<Grid2
							size={{ xs: 12, md: 4 }}
							sx={{
								order: { xs: 1, md: 1 },
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: { xs: '2.5rem', sm: '4rem' },
								width: '100%',
								height: { xs: '80%', md: '400px' },
							}}
						>
							<NotFoundCard />
						</Grid2>
					)}

					<Typography
						variant="h5"
						sx={{ marginTop: { md: '1rem', xs: '0' } }}
					>
						We couldn't find matching anime.
					</Typography>
					<Typography variant="h5" sx={{ marginTop: '1rem' }}>
						Try changing your filter parameters
					</Typography>

					<MainButton
						onClick={handleReturnToFilter}
						sx={{ marginTop: { md: '4rem', xs: '2rem' } }}
					>
						New Filter
					</MainButton>
				</Grid2>

				<Grid2>
					{isLargeScreen && (
						<Grid2
							size={{ xs: 12, md: 4 }}
							sx={{
								order: { xs: 1, md: 1 },
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'flex-start',
								position: { xs: 'absolute', md: 'relative' },
								marginTop: '4rem',
								width: '100%',
								height: { xs: '100%', md: '400px' },
								opacity: { xs: 0.2, md: 1 },
							}}
						>
							<NotFoundCard />
						</Grid2>
					)}
				</Grid2>
			</Grid2>
		</>
	);
};

export default RandomEmptyResult;
