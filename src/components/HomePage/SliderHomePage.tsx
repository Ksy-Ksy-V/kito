import React, { useState } from 'react';
import { Box, Typography, IconButton, Grid2, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StyledButton from '../StyledButton';

import poster1 from '../../images/homePageSliderImg/slider-poster-img1.jpg';
import poster2 from '../../images/homePageSliderImg/slider-poster-img2.jpg';
import poster3 from '../../images/homePageSliderImg/slider-poster-img3.jpg';

import thumb1 from '../../images/homePageSliderImg/thumb1.jpg';
import thumb2 from '../../images/homePageSliderImg/thumb2.png';
import thumb3 from '../../images/homePageSliderImg/thumb3.png';

interface SliderItem {
	title: string;
	description: string;
	backgroundImage: string;
	thumbnailImage: string;
}

const SliderHomePage: React.FC = () => {
	const theme = useTheme();
	const [currentIndex, setCurrentIndex] = useState(1);
	const [items] = useState<SliderItem[]>([
		{
			title: 'One Piece',
			description:
				'Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as the "One Piece.',
			backgroundImage: poster1,
			thumbnailImage: thumb1,
		},
		{
			title: "Frieren: Beyond Journey's End",
			description:
				'An elf and her friends defeat a demon king in a great war. But the war is over, and the elf must search for a new way of life.',
			backgroundImage: poster2,
			thumbnailImage: thumb2,
		},
		{
			title: 'Cyberpunk: Edgerunners',
			description:
				'A Street Kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an Edgerunner, a Mercenary outlaw also known as a Cyberpunk.',
			backgroundImage: poster3,
			thumbnailImage: thumb3,
		},
	]);

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
	};

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + items.length) % items.length
		);
	};

	const handleThumbnailClick = (index: number) => {
		setCurrentIndex(index);
	};

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
				overflow: 'hidden',
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					overflow: 'hidden',
					zIndex: 0,
				}}
			>
				{items.map((item, index) => (
					<Box
						key={index}
						sx={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							backgroundImage: `url(${item.backgroundImage})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							transform:
								index === currentIndex
									? 'translateX(0)'
									: index < currentIndex
									? 'translateX(-100%)'
									: 'translateX(100%)',
							transition: 'transform 1.30s ease-in-out',
						}}
					/>
				))}
			</Box>

			<Grid2
				container
				sx={{
					height: '100%',
					alignItems: 'center',
					paddingLeft: '5%',
					paddingRight: '5%',
					backgroundColor: 'rgba(0, 0, 0, 0.7)',
					position: 'relative',
					zIndex: 1,
				}}
			>
				<Grid2
					size={{ xs: 3 }}
					sx={{ marginTop: '2rem', marginLeft: '10rem' }}
				>
					<Typography variant="body2">
						№{currentIndex + 1} by Kito opinion
					</Typography>
					<Typography variant="h3">
						{items[currentIndex].title}
					</Typography>
					<Typography
						variant="body1"
						sx={{
							marginTop: '10px',
							marginBottom: '20px',
						}}
					>
						{items[currentIndex].description}
					</Typography>

					<StyledButton>Read More</StyledButton>
				</Grid2>

				<Grid2
					container
					direction="row"
					sx={{
						position: 'absolute',
						right: '10px',
						zIndex: 2,
						marginRight: '12rem',
					}}
				>
					{items.map((thumbItem, thumbIndex) => (
						<Box
							key={thumbIndex}
							sx={{
								width: '150px',
								height: '250px',
								backgroundImage: `url(${thumbItem.thumbnailImage})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								borderRadius: '10px',
								marginBottom: '10px',
								cursor: 'pointer',
								border: `2px solid ${theme.palette.secondary.main}`,
								marginLeft: thumbIndex > 0 ? '10px' : '0',
								transform:
									thumbIndex === currentIndex
										? 'scale(1.1)'
										: 'scale(1)',
								transition:
									'transform 0.75s ease-in-out, opacity 0.75s ease-in-out',
								opacity: thumbIndex === currentIndex ? 1 : 0.5,
							}}
							onClick={() => handleThumbnailClick(thumbIndex)}
						/>
					))}
				</Grid2>
			</Grid2>

			<IconButton
				sx={{
					position: 'absolute',
					top: '50%',
					left: '10px',
					transform: 'translateY(-50%)',
					color: theme.palette.secondary.main,
					zIndex: 2,
				}}
				onClick={handlePrev}
			>
				<ArrowBackIcon />
			</IconButton>
			<IconButton
				sx={{
					position: 'absolute',
					top: '50%',
					right: '10px',
					transform: 'translateY(-50%)',
					color: theme.palette.secondary.main,
					zIndex: 2,
				}}
				onClick={handleNext}
			>
				<ArrowForwardIcon />
			</IconButton>
		</Box>
	);
};

export default SliderHomePage;
