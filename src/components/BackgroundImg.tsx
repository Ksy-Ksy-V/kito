import { Box, Skeleton, Typography } from '@mui/material';
import React from 'react';
import theme from '../styles/theme';
import { BackgroundImgProps } from '../models/Interfaces';

const BackgroundImg: React.FC<BackgroundImgProps> = ({
	backgroundImage,
	loading = false,
	title,
	height,
}) => {
	if (loading) {
		return (
			<Box
				sx={{
					width: '100vw',
					height: { height },
					position: 'relative',
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
						position: 'absolute',
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
				height: height,
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
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{title && (
					<Typography
						variant="h1"
						sx={{
							textAlign: 'center',
							fontSize: {
								xs: theme.typography.h4.fontSize,
								sm: theme.typography.h3.fontSize,
								md: theme.typography.h2.fontSize,
								lg: theme.typography.h2.fontSize,
								xl: theme.typography.h1.fontSize,
							},
						}}
					>
						{title}
					</Typography>
				)}
			</Box>
		</Box>
	);
};

export default BackgroundImg;
