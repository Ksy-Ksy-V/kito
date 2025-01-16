import { Grid2, Skeleton, Typography, useMediaQuery } from '@mui/material';
import { Anime } from '@tutkli/jikan-ts';
import theme from '../../styles/theme';
import CardAnimeDetails from '../Cards/CardAnimeDetails';
import AddToList from '../AnimeInfo/AddToList';

interface AnimeCardContainerProps {
	loading: boolean;
	randomAnime: Anime | null;
}

const AnimeCardContainer: React.FC<AnimeCardContainerProps> = ({
	loading,
	randomAnime,
}) => {
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

	return (
		<Grid2
			container
			size={{ md: 3, sm: 5, xs: 10 }}
			sx={{
				marginTop: '2rem',
				position: 'relative',
				zIndex: 3,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				alignContent: 'flex-start',
			}}
		>
			<Grid2
				size={12}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{loading && !isLargeScreen && (
					<Skeleton variant="rectangular" width="80%" height="2rem" />
				)}
				{!loading && !isLargeScreen && (
					<Typography
						variant="h4"
						sx={{
							color: theme.palette.secondary.main,
							textAlign: 'center',
							marginTop: '1.5rem',
						}}
					>
						{randomAnime?.title}
					</Typography>
				)}
			</Grid2>

			<Grid2
				size={12}
				sx={{
					display: 'flex',
					justifyContent: { xs: 'center', sm: 'left' },
					alignContent: 'flex-start',
					marginTop: { xs: '2rem', sm: '0rem' },
				}}
			>
				<CardAnimeDetails
					title={randomAnime?.title}
					imageUrl={randomAnime?.images.jpg.image_url}
					mal_id={randomAnime?.mal_id}
					loading={loading}
				/>
			</Grid2>

			<>
				<Grid2
					size={12}
					sx={{
						display: 'flex',
						justifyContent: { xs: 'center', sm: 'left' },
						alignItems: 'center',
						marginTop: {
							md: '1rem',
							xs: '0rem',
						},
					}}
				>
					{randomAnime && (
						<AddToList loading={loading} anime={randomAnime} />
					)}
				</Grid2>
			</>
		</Grid2>
	);
};

export default AnimeCardContainer;
