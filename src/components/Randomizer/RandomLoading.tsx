import {
	Box,
	Grid2,
	keyframes,
	Typography,
	useMediaQuery,
} from '@mui/material';

import theme from '../../styles/theme';
import { useMemo } from 'react';
import notFoundImg from '../../images/notFound.png';

const RandomLoading = () => {
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

	const pulse = useMemo(
		() => keyframes`
			0% { transform: scale(1); }
			50% { transform: scale(1.2); }
			100% { transform: scale(1); }
		`,
		[]
	);

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
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
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
					<Typography
						variant="h3"
						sx={{ marginTop: { md: '12rem', xs: '6rem' } }}
					>
						Loading ...
					</Typography>

					{!isLargeScreen && (
						<Grid2
							size={{ xs: 12, md: 4 }}
							sx={{
								order: { xs: 1, md: 1 },
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',

								width: '100%',
								height: { xs: '150%', md: '300px' },
							}}
						>
							<Box
								sx={{
									width: { xs: '150%', md: '100%' },
									height: { xs: '150%', md: '300px' },
									backgroundImage: `url(${notFoundImg})`,
									backgroundSize: 'contain',
									backgroundPosition: 'center',
									backgroundRepeat: 'no-repeat',
									animation: `${pulse} 5s ease-in-out infinite`,
								}}
							/>
						</Grid2>
					)}

					<Typography
						variant="h5"
						sx={{ marginTop: { md: '3rem', xs: '0' } }}
					>
						It will take a few seconds, please wait
					</Typography>
				</Grid2>

				<Grid2
					size={{ xs: 12, md: 5 }}
					sx={{ marginTop: { md: '6rem', sm: '0rem' } }}
				>
					{isLargeScreen && (
						<Box
							sx={{
								width: { xs: '80%', md: '100%' },
								height: { xs: '80%', md: '300px' },
								backgroundImage: `url(${notFoundImg})`,
								backgroundSize: 'contain',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
								animation: `${pulse} 5s ease-in-out infinite`,
							}}
						/>
					)}
				</Grid2>
			</Grid2>
		</>
	);
};

export default RandomLoading;
