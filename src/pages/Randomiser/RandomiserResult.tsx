import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid2, Typography } from '@mui/material';
import { JikanResponse, Anime, AnimeClient } from '@tutkli/jikan-ts';
import StyledButton from '../../components/StyledButton';
import RandomCard from '../../components/RandomCard';
import { useNavigate } from 'react-router-dom';

function RandomiserResult() {
	const location = useLocation();
	const animeClient = new AnimeClient();
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [randomAnime, setRandomAnime] = useState<Anime | null>(null);
	const navigate = useNavigate();

	const getQueryParams = (query: string) => {
		return new URLSearchParams(query);
	};

	const getRandomPage = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const getRandomAnimeFromList = (list: Anime[]) => {
		const randomIndex = Math.floor(Math.random() * list.length);
		return list[randomIndex];
	};

	useEffect(() => {
		const animeClient = new AnimeClient();
		const queryParams = getQueryParams(location.search);
		const genreId = queryParams.get('genre');
		const randomPage = getRandomPage(1, 5);

		if (genreId && animeList.length === 0) {
			animeClient
				.getAnimeSearch({
					page: randomPage,
					limit: 25,
					sort: 'asc',
					order_by: 'popularity',
					genres: genreId,
				})
				.then((response: JikanResponse<Anime[]>) => {
					console.log(response, 'resp');
					console.log(response.data, 'res');
					setAnimeList(response.data);

					const randomAnime = getRandomAnimeFromList(response.data);
					setRandomAnime(randomAnime);
					console.log(randomAnime, 'randomAnime');
				})
				.catch((err) => {
					console.log(err, 'err');
				});
		}
	}, [location.search, animeClient, animeList]);

	const handleRandomize = () => {
		if (animeList.length > 0) {
			const randomAnime = getRandomAnimeFromList(animeList);
			setRandomAnime(randomAnime);
		}
	};

	const handleReturnToFilter = () => {
		navigate(`/randomiser`);
	};

	return (
		<Grid2
			container
			spacing={2}
			sx={{
				minHeight: '80vh',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Grid2 size={{ xs: 3 }} offset={{ xs: 2 }}>
				{randomAnime && (
					<RandomCard
						title={randomAnime.title}
						imageUrl={randomAnime.images.jpg.image_url}
					/>
				)}
			</Grid2>
			<Grid2 size={{ xs: 4 }} offset={{ xs: 1 }}>
				<Typography variant="h3">
					{randomAnime ? randomAnime.title : 'Title'}
				</Typography>
				<Typography
					variant="body1"
					margin="1rem"
					sx={{
						display: '-webkit-box',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						WebkitLineClamp: 9,
						WebkitBoxOrient: 'vertical',
					}}
				>
					{randomAnime ? randomAnime.synopsis : 'NOT FOUND'}
				</Typography>

				<Grid2 container spacing={2}>
					<Grid2 size={{ xs: 6 }}>
						<StyledButton onClick={handleRandomize}>
							Randomize
						</StyledButton>
					</Grid2>

					<Grid2 size={{ xs: 6 }}>
						<StyledButton onClick={handleReturnToFilter}>
							New Filter
						</StyledButton>
					</Grid2>
				</Grid2>
			</Grid2>
		</Grid2>
	);
}

export default RandomiserResult;
