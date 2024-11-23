import { Box, Skeleton } from '@mui/material';
import React from 'react';

interface BackgroundImgProps {
	backgroundImage?: string;
	loading: boolean;
	height: string;
}

const BackgroundImg: React.FC<BackgroundImgProps> = ({
	backgroundImage,
	loading,
	height,
}) => {
	if (loading) {
		return (
			<Box
				sx={{
					width: '100%',
					height: { height },
					position: 'absolute',
					left: '50%',
					right: '50%',
					marginLeft: '-50vw',
					marginRight: '-50vw',
				}}
			>
				<Skeleton
					variant="rectangular"
					width="100%"
					height="100%"
					sx={{
						bgcolor: 'rgba(0, 0, 0, 0.5)',
						zIndex: 1,
					}}
				/>
			</Box>
		);
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
					backgroundImage: `url(${backgroundImage})`,
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
