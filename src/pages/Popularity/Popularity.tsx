import { Typography, IconButton, Box } from '@mui/material';
import { TopClient, JikanResponse, Anime } from '@tutkli/jikan-ts';
import { useEffect, useState } from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AnimeCard from '../../components/AnimeCard';

function Popularity() {
	const top = new TopClient();
	const [topList, setTopList] = useState<Anime[]>([]);
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const fetchTopAnime = async () => {
			try {
				const response: JikanResponse<Anime[]> = await top.getTopAnime({
					page: 1,
					limit: 10,
				});

				setTopList(response.data);
			} catch (err) {
				console.error('Failed to fetch anime:', err);
			}
		};

		if (topList.length === 0) {
			fetchTopAnime();
		}
	}, [topList, TopClient]);

	const slideCount = 5;

	const handlePrevSlide = () => {
		setCurrentSlide((prev) =>
			prev === 0 ? topList.length - slideCount : prev - 1
		);
	};

	const handleNextSlide = () => {
		setCurrentSlide((prev) =>
			prev === topList.length - slideCount ? 0 : prev + 1
		);
	};

	return (
		<Box sx={{ position: 'relative', width: '100%' }}>
			<Typography
				variant="h1"
				sx={{
					textAlign: 'center',
					marginTop: '1rem',
					marginBottom: '2rem',
				}}
			>
				Top 10 Anime by Popularity
			</Typography>

			<Box
				sx={{
					display: 'flex',
					overflow: 'hidden',
					width: '100%',
					position: 'relative',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						transition: 'transform 0.5s ease-in-out',
						transform: `translateX(-${
							currentSlide * (100 / slideCount)
						}%)`,
						width: `${(topList.length / slideCount) * 100}%`,
					}}
				>
					{topList.map((anime) => (
						<Box
							key={anime.mal_id}
							sx={{
								minWidth: `${100 / slideCount}%`,
								boxSizing: 'border-box',
								padding: '0 8px',
							}}
						>
							<AnimeCard
								title={anime.title}
								image={anime.images.jpg.image_url}
							/>
						</Box>
					))}
				</Box>
			</Box>

			<IconButton
				onClick={handlePrevSlide}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '0',
					transform: 'translateY(-50%)',
					zIndex: 10,
				}}
			>
				<ArrowBackIosIcon />
			</IconButton>

			<IconButton
				onClick={handleNextSlide}
				sx={{
					position: 'absolute',
					top: '50%',
					right: '0',
					transform: 'translateY(-50%)',
					zIndex: 10,
				}}
			>
				<ArrowForwardIosIcon />
			</IconButton>
		</Box>
	);
}

export default Popularity;
