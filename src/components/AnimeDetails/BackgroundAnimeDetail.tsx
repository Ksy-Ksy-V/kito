import { Box, Skeleton } from '@mui/material';
import { Anime } from '@tutkli/jikan-ts';
import React from 'react';

interface BackgroundAnimeDetailProps {
	anime: Anime | null;
	loading: boolean;
}

const BackgroundAnimeDetail: React.FC<BackgroundAnimeDetailProps> = ({
	anime,
	loading,
}) => {
	if (loading) {
		return (
			<Box
				sx={{
					width: '100%',
					height: '350px',
					position: 'relative',
					borderRadius: '1rem',
				}}
			>
				<Skeleton
					variant="rectangular"
					width="100%"
					height="100%"
					sx={{
						bgcolor: 'rgba(0, 0, 0, 0.5)',
					}}
				/>
			</Box>
		);
	}

	if (!anime) {
		return null;
	}

	return (
		<Box
			sx={{
				width: '100%',
				height: '350px',
				borderRadius: '1rem',
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					backgroundImage: `url(${anime.images.jpg.large_image_url})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					zIndex: 1,
					borderRadius: '1rem',
				}}
			></Box>

			<Box
				sx={{
					borderRadius: '1rem',
					position: 'absolute',
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.6)',
					zIndex: 2,
				}}
			></Box>
		</Box>
	);
};

export default BackgroundAnimeDetail;
