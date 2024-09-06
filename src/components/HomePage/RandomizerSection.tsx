import { Typography, Grid2, Box, Link, Skeleton } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import randomizerImg from '../../images/background.jpg';

import StyledButton from '../StyledButton';

const RandomizerSection = () => {
	const [imageLoaded, setImageLoaded] = useState(false);
	return (
		<Box
			sx={{
				position: 'relative',
				width: '100vw',
				left: '50%',
				right: '50%',
				marginLeft: '-50vw',
				marginRight: '-50vw',
				height: '250px',
				overflow: 'hidden',
				marginTop: '3rem',
			}}
		>
			{!imageLoaded && (
				<Skeleton
					variant="rectangular"
					width="100%"
					height="100%"
					sx={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						zIndex: 1,
					}}
				/>
			)}
			<Box
				onLoad={() => setImageLoaded(true)}
				sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					backgroundImage: `url(${randomizerImg})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					zIndex: 1,
				}}
			></Box>

			<Box
				sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.7)',
					zIndex: 2,
				}}
			></Box>

			<Grid2
				container
				justifyContent="center"
				alignItems="center"
				sx={{
					position: 'relative',
					height: '100%',
					zIndex: 3,
				}}
			>
				<Grid2
					size={12}
					sx={{
						textAlign: 'center',
					}}
				>
					<Typography
						variant="h2"
						sx={{
							marginBottom: '2rem',
						}}
					>
						Don't know what to watch?
					</Typography>

					<Link
						component={RouterLink}
						to="/randomizer"
						sx={{
							textDecoration: 'none',
						}}
					>
						<StyledButton
							sx={{
								width: 'auto',
								padding: '0.3rem 4rem',
							}}
						>
							Try Randomizer
						</StyledButton>
					</Link>
				</Grid2>
			</Grid2>
		</Box>
	);
};

export default RandomizerSection;
