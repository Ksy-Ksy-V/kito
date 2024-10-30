import { Grid2, Skeleton, useMediaQuery, useTheme } from '@mui/material';
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
		<Grid2 container spacing={2} size={12} sx={{ gap: '0' }}>
			{loading ? (
				<>
					{[...Array(5)].map((_, index) => (
						<Skeleton
							key={index}
							variant="text"
							width="20rem"
							height="2rem"
						/>
					))}
				</>
			) : (
				anime && (
					<>
						<Grid2 size={12}>
							<StyledInformation
								label="Title:"
								value={anime?.title_japanese || 'Not rated'}
							/>
						</Grid2>
						<Grid2 size={12}>
							{!isLargeScreen && (
								<StyledInformation
									label="Rating:"
									value={anime.rating || 'Not rated'}
								/>
							)}
						</Grid2>
						<Grid2 size={12}>
							{!isLargeScreen && (
								<StyledInformation
									label="Score:"
									value={
										anime?.score.toString() || 'Not score'
									}
								/>
							)}
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
								value={
									anime.episodes
										? `${anime.episodes} episodes, ${
												anime.duration ||
												'Unknown duration'
										  }`
										: 'Unknown'
								}
							/>
						</Grid2>
						<Grid2 size={12}>
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
						</Grid2>
					</>
				)
			)}
		</Grid2>
	);
};

export default MainInformation;
