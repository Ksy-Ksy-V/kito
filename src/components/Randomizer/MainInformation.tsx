import { Grid2, Skeleton } from '@mui/material';
import { JikanResource } from '@tutkli/jikan-ts';
import StyledInformation from '../../styles/StyledInformation';
import { AbstractAnimeProps } from '../../models/Interfaces';
import { FC } from 'react';

const MainInformation: FC<AbstractAnimeProps> = ({ anime, loading }) => {
	return (
		<Grid2 container spacing={2} sx={{ marginTop: '1rem' }}>
			{loading ? (
				<>
					{[...Array(5)].map((_, index) => (
						<Grid2 key={index} size={12}>
							<Skeleton variant="text" width="100%" height={40} />
						</Grid2>
					))}
				</>
			) : (
				anime && (
					<>
						<Grid2 size={12}>
							<StyledInformation
								label="Rating:"
								value={anime.rating || 'Unknown'}
							/>
						</Grid2>

						<Grid2 size={12}>
							<StyledInformation
								label="Type:"
								value={anime.type || 'Unknown'}
							/>
						</Grid2>

						<Grid2 size={12}>
							<StyledInformation
								label="Studio:"
								value={
									anime.studios && anime.studios.length > 0
										? anime.studios
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
								value={anime.status || 'Unknown'}
							/>
						</Grid2>

						<Grid2 size={12}>
							<StyledInformation
								label="Airing Dates:"
								value={anime.aired?.string || 'Unknown'}
							/>
						</Grid2>

						<Grid2 size={12}>
							<StyledInformation
								label="Number of Episodes:"
								value={`${anime?.episodes} episodes, ${
									anime.duration || 'Unknown duration'
								}`}
							/>
						</Grid2>
					</>
				)
			)}
		</Grid2>
	);
};

export default MainInformation;
