import { useEffect, useState } from 'react';
import { JikanResponse, Anime, RandomClient } from '@tutkli/jikan-ts';
import { Grid, Typography } from '@mui/material';

import RandomCard from '../../components/RandomCard';
import StyledButton from '../../components/StyledButton';

function RandomizerResult() {
	const [randomAnime, setRandomAnime] = useState<Anime | null>(null);

	useEffect(() => {
		const fetchRandomAnime = async () => {
			try {
				const randomClient = new RandomClient();
				const response: JikanResponse<Anime> =
					await randomClient.getRandomAnime();
				setRandomAnime(response.data);
			} catch (error) {
				console.error('Failed to fetch random anime:', error);
			}
		};

		fetchRandomAnime();
	}, []);

	const handleRandomize = () => {
		const fetchRandomAnime = async () => {
			try {
				const randomClient = new RandomClient();
				const response: JikanResponse<Anime> =
					await randomClient.getRandomAnime();
				console.log('Received data:', response.data);
				setRandomAnime(response.data);
			} catch (error) {
				console.error('Failed to fetch random anime:', error);
			}
		};

		fetchRandomAnime();
	};

	return (
		<Grid
			container
			spacing={2}
			sx={{
				minHeight: '80vh',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Grid item xs={2} />
			<Grid item xs={3}>
				{randomAnime && (
					<RandomCard
						imageUrl={randomAnime.images.jpg.image_url}
						title={randomAnime.title}
					/>
				)}
			</Grid>
			<Grid item xs={1} />
			<Grid item xs={4}>
				<Typography variant="h3">
					{randomAnime?.title || 'Title'}
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
					{randomAnime?.synopsis ||
						'Reach the top, and everything will be yours. At the top of the tower exists everything in this world, and all of it can be yours. You can become a god. This is the story of the beginning and the end of Rachel, the girl who climbed the tower so she could see the stars, and Bam, the boy who needed nothing but her.'}
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<StyledButton onClick={handleRandomize}>
							Randomize
						</StyledButton>
					</Grid>
					<Grid item xs={6}>
						<StyledButton>New Filter</StyledButton>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={2} />
		</Grid>
	);
}

export default RandomizerResult;
