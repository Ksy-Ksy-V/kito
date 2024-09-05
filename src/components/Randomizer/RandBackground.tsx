import { Box } from '@mui/material';
import { Anime } from '@tutkli/jikan-ts';
import React from 'react';

interface RandBackgroundProps {
	randomAnime: Anime | null;
}

const RandBackground: React.FC<RandBackgroundProps> = ({ randomAnime }) => {
	return (
		<Box
			sx={{
				position: 'relative',
				width: '100vw',
				left: '50%',
				right: '50%',
				marginLeft: '-50vw',
				marginRight: '-50vw',
				height: '500px',
				marginTop: '2rem',
			}}
		>
			{randomAnime && (
				<Box
					sx={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						backgroundImage: `url(${randomAnime.images.jpg.large_image_url})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						zIndex: 1,
					}}
				></Box>
			)}
			<Box
				sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.7)',
					zIndex: 2,
				}}
			></Box>
		</Box>
	);
};

export default RandBackground;
