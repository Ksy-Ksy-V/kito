import { Grid2, Typography, Box } from '@mui/material';
import { JikanResource } from '@tutkli/jikan-ts';
import { RandomAnime } from '../../models/randomAnime';
import DetailInformation from './DetailInformation';

interface AnimeDetailsProps {
	randomAnime: RandomAnime;
	loading: boolean;
}

const AnimeDetails: React.FC<AnimeDetailsProps> = ({
	randomAnime,
	loading,
}) => {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={12}>
				<Typography
					variant="h3"
					sx={{ textAlign: 'center', marginTop: '1rem' }}
				>
					Learn more about{' '}
					{randomAnime ? randomAnime.title : 'this anime'}
				</Typography>
			</Grid2>

			{!loading && randomAnime && (
				<>
					<Grid2 size={6} sx={{ marginTop: '2rem' }}>
						<DetailInformation
							label="Average Rating:"
							value={
								randomAnime.score
									? `${randomAnime.score}/10`
									: 'Not rated'
							}
						/>

						<DetailInformation
							label="Type:"
							value={randomAnime.type || 'Unknown'}
						/>

						<DetailInformation
							label="Airing Dates:"
							value={randomAnime.aired?.string || 'Unknown'}
						/>

						<DetailInformation
							label="Number of Episodes:"
							value={
								randomAnime.episodes
									? `${randomAnime.episodes} episodes, ${
											randomAnime.duration ||
											'Unknown duration'
									  }`
									: 'Unknown'
							}
						/>

						<DetailInformation
							label="Studio:"
							value={
								randomAnime.studios &&
								randomAnime.studios.length > 0
									? randomAnime.studios
											.map(
												(studio: JikanResource) =>
													studio.name
											)
											.join(', ')
									: 'Unknown'
							}
						/>

						<DetailInformation
							label="Status:"
							value={randomAnime.status || 'Unknown'}
						/>

						<DetailInformation
							label="Source:"
							value={randomAnime.source || 'Unknown'}
						/>
					</Grid2>

					<Grid2 size={6}>
						{randomAnime.trailer?.embed_url && (
							<Box
								sx={{
									marginTop: '2rem',
									position: 'relative',
									paddingTop: '56.25%',
									marginBottom: '2rem',
								}}
							>
								<iframe
									src={randomAnime.trailer.embed_url}
									title="Anime Trailer"
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										height: '100%',
										border: 'none',
									}}
									allowFullScreen
								></iframe>
							</Box>
						)}
					</Grid2>
				</>
			)}
		</Grid2>
	);
};

export default AnimeDetails;
