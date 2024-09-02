import React, { useState } from 'react';
import { Box, Typography, IconButton, Grid2, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StyledButton from '../StyledButton';

interface SliderItem {
	title: string;
	description: string;
	backgroundImage: string;
}

const SliderHomePage: React.FC = () => {
	// const top = new TopClient();
	// const [topList, setTopList] = useState<Anime[]>([]);
	const theme = useTheme();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [items, setItems] = useState<SliderItem[]>([
		{
			title: 'Lossless Youths',
			description:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi.',
			backgroundImage:
				'https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg',
		},
		{
			title: 'Estrange Bond',
			description:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi.',
			backgroundImage: 'https://i.redd.it/tc0aqpv92pn21.jpg',
		},
		{
			title: 'веапвапвапавп',
			description:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi.',
			backgroundImage:
				'https://wharferj.files.wordpress.com/2015/11/bio_north.jpg',
		},
	]);
	console.log(setItems);
	// useEffect(() => {
	// 	const fetchTopAnime = async () => {
	// 		try {
	// 			const response: JikanResponse<Anime[]> = await top.getTopAnime({
	// 				page: 1,
	// 				limit: 5,
	// 			});

	// 			setTopList(response.data);
	// 		} catch (err) {
	// 			console.error('Failed to fetch anime:', err);
	// 		}
	// 	};

	// 	if (topList.length === 0) {
	// 		fetchTopAnime();
	// 	}
	// }, [topList, TopClient]);

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
						transition: 'opacity 0.75s ease-in-out',
						opacity: index === currentIndex ? 1 : 0,
						zIndex: index === currentIndex ? 1 : 0,
					}}
				>
					{index === currentIndex && (
						<Grid2
							container
							sx={{
								height: '100%',
								alignItems: 'center',
								paddingLeft: '5%',
								paddingRight: '5%',
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
							}}
						>
							<Grid2
								size={{ xs: 3 }}
								sx={{ marginTop: '2rem', marginLeft: '10rem' }}
							>
								<Typography variant="body2">
									№{index + 1} by Kito opinion
								</Typography>
								<Typography variant="h3">
									{item.title}
								</Typography>
								<Typography
									variant="body1"
									sx={{
										marginTop: '10px',
										marginBottom: '20px',
									}}
									color="white"
								>
									{item.description}
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
									marginRight: '13rem',
								}}
							>
								{items.map((thumbItem, thumbIndex) => (
									<Box
										key={thumbIndex}
										sx={{
											width: '150px',
											height: '250px',
											backgroundImage: `url(${thumbItem.backgroundImage})`,
											backgroundSize: 'cover',
											backgroundPosition: 'center',
											borderRadius: '10px',
											marginBottom: '10px',
											cursor: 'pointer',
											border: `2px solid ${theme.palette.secondary.main}`,
											marginLeft:
												thumbIndex > 0 ? '10px' : '0',
											opacity:
												thumbIndex === currentIndex
													? 1
													: 0.5,
										}}
										onClick={() =>
											handleThumbnailClick(thumbIndex)
										}
									/>
								))}
							</Grid2>
						</Grid2>
					)}
				</Box>
			))}

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