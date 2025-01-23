import { FC, useState } from 'react';
import {
	Box,
	Typography,
	IconButton,
	Grid2,
	Skeleton,
	useMediaQuery,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MainButton from '../Buttons/MainButton';
import { sliderItems as items } from '../../data/sliderContent';
import { useNavigate } from 'react-router-dom';
import theme from '../../styles/theme';

const Slider: FC = () => {
	const [currentIndex, setCurrentIndex] = useState(1);
	const navigate = useNavigate();

	const [imageLoaded, setImageLoaded] = useState(
		Array(items.length).fill(false)
	);

	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
							transition: {
								xs: 'transform 0.50s ease-in-out',
								sm: 'transform 1.00s ease-in-out',
								md: 'transform 1.00s ease-in-out',
								lg: 'transform 1.30s ease-in-out',
								xl: 'transform 2.00s ease-in-out',
							},
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
					alignItems: {
						xs: 'flex-end',
						sm: 'flex-end',
						md: 'center',
						lg: 'center',
						xl: 'center',
					},
					paddingLeft: isSmallScreen ? '2%' : '5%',
					paddingRight: isSmallScreen ? '2%' : '5%',
					backgroundColor: 'rgba(0, 0, 0, 0.7)',
					position: 'relative',
					zIndex: 1,
					flexDirection: isSmallScreen ? 'column' : 'row',
				}}
			>
				<Grid2
					size={isSmallScreen ? 12 : 4}
					sx={{
						alignItems: {
							xs: 'flex-end',
							sm: 'flex-end',
							md: 'flex-end',
							lg: 'center',
							xl: 'center',
						},
						marginLeft: {
							xs: '0%',
							sm: '0%',
							md: '0%',
							lg: '5%',
							xl: '10%',
						},
						textAlign: {
							xs: 'center',
							sm: 'center',
							md: 'left',
							lg: 'left',
							xl: 'left',
						},
					}}
				>
					{!imageLoaded[currentIndex] ? (
						<>
							<Skeleton
								variant="text"
								width="30%"
								height={20}
								sx={{
									marginTop: {
										xs: '100%',
										sm: '50%',
										md: '0%',
										lg: '0%',
										xl: '0%',
									},
									mx: isSmallScreen ? 'auto' : 'left',
								}}
							/>
							<Skeleton
								variant="text"
								width="70%"
								height={50}
								sx={{ mx: isSmallScreen ? 'auto' : 'left' }}
							/>
							{!isSmallScreen &&
								[...Array(3)].map((_, index) => (
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
						<Grid2
							sx={{
								marginTop: {
									xs: '100%',
									sm: '50%',
									md: '0%',
									lg: '0%',
									xl: '0%',
								},
							}}
						>
							<Typography variant="body1">
								#{currentIndex + 1} by Kito opinion
							</Typography>
							<Typography
								variant={isSmallScreen ? 'h4' : 'h3'}
								sx={{ color: theme.palette.secondary.main }}
							>
								{items[currentIndex].title}
							</Typography>

							{!isSmallScreen && (
								<Typography
									variant="body1"
									sx={{
										marginTop: '10px',
										marginBottom: '20px',
									}}
								>
									{items[currentIndex].description}
								</Typography>
							)}

							<MainButton
								sx={{
									backgroundColor: 'transparent',
									borderColor: 'primary.main',
								}}
								onClick={() =>
									navigate(
										`/anime/${items[currentIndex].mal_id}`
									)
								}
							>
								Read More
							</MainButton>
						</Grid2>
					)}
				</Grid2>

				<Grid2
					container
					direction="row"
					sx={{
						position: 'absolute',
						right: '10px',
						zIndex: 2,
						marginRight: {
							xs: '5%',
							sm: '25%',
							md: '0%',
							lg: '5%',
							xl: '10%',
						},
					}}
				>
					{items.map((thumbItem, thumbIndex) => (
						<Box
							key={thumbIndex}
							sx={{
								width: {
									xs: '4.5rem',
									sm: '6rem',
									md: '7rem',
									lg: '10rem',
									xl: '10rem',
								},
								height: {
									xs: '7rem',
									sm: '9rem',
									md: '11rem',
									lg: '15rem',
									xl: '15rem',
								},

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
