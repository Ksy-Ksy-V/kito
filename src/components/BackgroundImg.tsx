import { Box, Skeleton } from '@mui/material';
import { Anime } from '@tutkli/jikan-ts';
import React from 'react';

interface BackgroundImgProps {
	anime: Anime | null;
	loading: boolean;
	height: string;
}

const BackgroundImg: React.FC<BackgroundImgProps> = ({
	anime,
	loading,
	height,
}) => {
	if (loading) {
		return (
			<Box
				sx={{
					width: '100%',
					height: { height },
					position: 'relative',
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
				position: 'relative',
				width: '100vw',
				left: '50%',
				right: '50%',
				marginLeft: '-50vw',
				marginRight: '-50vw',
				height: { height },
				marginTop: '2rem',
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
				}}
			></Box>

			<Box
				sx={{
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

export default BackgroundImg;
