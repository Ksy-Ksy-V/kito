import { Grid2, Skeleton } from '@mui/material';
import { JikanResource } from '@tutkli/jikan-ts';
import { RandomAnime } from '../../models/randomAnime';
import StyledInformation from './StyledInformation';

interface AnimeDetailsProps {
	randomAnime: RandomAnime;
	loading: boolean;
}

const AnimeDetails: React.FC<AnimeDetailsProps> = ({
	randomAnime,
	loading,
}) => {
	return (
		<Grid2 container spacing={2} sx={{ marginTop: '1rem' }}>
			{loading ? (
				<>
					{[...Array(6)].map((_, index) => (
						<Grid2 key={index} size={12}>
							<Skeleton variant="text" width="100%" height={40} />
						</Grid2>
					))}
				</>
			) : (
				randomAnime && (
					<>
						<Grid2 size={12}>
							<StyledInformation
								label="Rating:"
								value={randomAnime.rating || 'Unknown'}
							/>
						</Grid2>

						<Grid2 size={12}>
							<StyledInformation
								label="Type:"
								value={randomAnime.type || 'Unknown'}
							/>
						</Grid2>

						<Grid2 size={12}>
							<StyledInformation
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
						</Grid2>

						<Grid2 size={12}>
							<StyledInformation
								label="Status:"
								value={randomAnime.status || 'Unknown'}
							/>
						</Grid2>

						<Grid2 size={12}>
							<StyledInformation
								label="Airing Dates:"
								value={randomAnime.aired?.string || 'Unknown'}
							/>
						</Grid2>

						<Grid2 size={12}>
							<StyledInformation
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
						</Grid2>
					</>
				)
			)}
		</Grid2>
	);
};

export default AnimeDetails;
