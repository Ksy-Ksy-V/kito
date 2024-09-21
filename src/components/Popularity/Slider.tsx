import React, { useState } from 'react';
import { Box, Typography, IconButton, Grid2, Skeleton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StyledButton from '../StyledButton';
import { sliderItems as items } from '../../data/sliderContent';

const Slider: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(1);

	const [imageLoaded, setImageLoaded] = useState(
		Array(items.length).fill(false)
	);

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

	const handleImageLoad = (index: number) => {
		setImageLoaded((prevLoaded) => {
			const updatedLoaded = [...prevLoaded];
			updatedLoaded[index] = true;
			return updatedLoaded;
		});
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
				marginTop: '2rem',
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
							transform:
								index === currentIndex
									? 'translateX(0)'
									: index < currentIndex
									? 'translateX(-100%)'
									: 'translateX(100%)',
							transition: 'transform 2.00s ease-in-out',
						}}
					>
						{!imageLoaded[index] && (
							<Skeleton
								variant="rectangular"
								width="100%"
								height="100%"
								sx={{ position: 'absolute' }}
							/>
						)}
						<Box
							component="img"
							src={item.backgroundImage}
							alt={item.title}
							onLoad={() => handleImageLoad(index)}
							sx={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								display: imageLoaded[index] ? 'block' : 'none',
							}}
						/>
					</Box>
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
					sx={{
						marginTop: '2rem',
						marginLeft: '10%',
					}}
				>
					{!imageLoaded[currentIndex] ? (
						<>
							<Skeleton variant="text" width="30%" height={20} />
							<Skeleton variant="text" width="70%" height={50} />
							{[...Array(3)].map((_, index) => (
								<Skeleton
									key={index}
									variant="text"
									width="90%"
									height={20}
									sx={{
										marginTop: '10px',
									}}
								/>
							))}
						</>
					) : (
						<>
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
						</>
					)}
				</Grid2>

				<Grid2
					container
					direction="row"
					sx={{
						position: 'absolute',
						right: '10px',
						zIndex: 2,
						marginRight: '10%',
					}}
				>
					{items.map((thumbItem, thumbIndex) => (
						<Box
							key={thumbIndex}
							sx={{
								width: '150px',
								height: '250px',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								borderRadius: '10px',
								margin: '1rem',
								cursor: 'pointer',
								border: `2px solid`,
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
						>
							{!imageLoaded[thumbIndex] && (
								<Skeleton
									variant="rectangular"
									width="100%"
									height="100%"
								/>
							)}
							<Box
								component="img"
								src={thumbItem.thumbnailImage}
								alt={`Thumbnail ${thumbIndex + 1}`}
								onLoad={() => handleImageLoad(thumbIndex)}
								sx={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									display: imageLoaded[thumbIndex]
										? 'block'
										: 'none',
								}}
							/>
						</Box>
					))}
				</Grid2>
			</Grid2>

			<IconButton
				sx={{
					position: 'absolute',
					top: '50%',
					left: '10px',
					transform: 'translateY(-50%)',
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
					zIndex: 2,
				}}
				onClick={handleNext}
			>
				<ArrowForwardIcon />
			</IconButton>
		</Box>
	);
};

export default Slider;
