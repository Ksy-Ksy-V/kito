import { Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { JikanResource } from '@tutkli/jikan-ts';
import StyledInformation from '../StyledInformation';
import { AbstractAnime } from '../../models/AbstractAnime';

interface MainInformationProps {
	anime: AbstractAnime | null;
	loading: boolean;
}

const MainInformation: React.FC<MainInformationProps> = ({
	anime,
	loading,
}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
	return (
		<>
			{loading ? (
				<>
					{[...Array(5)].map((_, index) => (
						<Skeleton
							key={index}
							variant="text"
							width="12rem"
							height="2rem"
						/>
					))}
				</>
			) : (
				anime && (
					<>
						{!isLargeScreen && (
							<StyledInformation
								label="Title:"
								value={anime?.title_japanese || 'Not rated'}
							/>
						)}
						{!isLargeScreen && (
							<StyledInformation
								label="Rating:"
								value={anime.rating || 'Not rated'}
							/>
						)}

						{!isLargeScreen && (
							<StyledInformation
								label="Score:"
								value={anime?.score.toString() || 'Not score'}
							/>
						)}

						<StyledInformation
							label="Type:"
							value={anime.type || 'Unknown'}
						/>

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

						<StyledInformation
							label="Status:"
							value={anime.status || 'Unknown'}
						/>

						<StyledInformation
							label="Airing Dates:"
							value={anime.aired?.string || 'Unknown'}
						/>

						<StyledInformation
							label="Number of Episodes:"
							value={
								anime.episodes
									? `${anime.episodes} episodes, ${
											anime.duration || 'Unknown duration'
									  }`
									: 'Unknown'
							}
						/>

						{!isLargeScreen && (
							<StyledInformation
								label="Genres:"
								value={
									anime?.genres
										.map((genre) => genre.name)
										.join(', ') || 'No genres available'
								}
							/>
						)}
					</>
				)
			)}
		</>
	);
};

export default MainInformation;
