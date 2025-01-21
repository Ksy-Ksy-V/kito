import { Grid2, Skeleton, Typography, useMediaQuery } from '@mui/material';
import theme from '../../styles/theme';
import CardAnimeDetails from '../Cards/CardAnimeDetails';
import AddButton from '../Buttons/AddButton';
import YourRatingField from '../Buttons/YourRatingField';
import { AnimeSectionProps } from '../../models/Interfaces';

const AnimeCardContainer: React.FC<AnimeSectionProps> = ({
	loading,
	anime,
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
						{anime?.title}
					</Typography>
				)}
			</Grid2>

			<Grid2
				size={12}
				sx={{
					display: 'flex',
					justifyContent: { xs: 'center', sm: 'left' },
					alignContent: 'flex-start',
					marginTop: { xs: '2rem', sm: '1rem' },
				}}
			>
				<CardAnimeDetails
					title={anime?.title}
					imageUrl={anime?.images.jpg.image_url}
					mal_id={anime?.mal_id}
					loading={loading || false}
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
					<AddButton
						loading={loading}
						sx={{
							width: {
								xs: '11rem',
								sm: '12rem',
								md: '14rem',
							},
							marginTop: '1rem',
						}}
					>
						Add To List
					</AddButton>
				</Grid2>
				<Grid2
					size={12}
					sx={{
						display: 'flex',
						justifyContent: { xs: 'center', sm: 'left' },
						alignItems: 'center',
					}}
				>
					<YourRatingField
						loading={loading}
						width={{
							xs: '11rem',
							sm: '12rem',
							md: '14rem',
						}}
					/>
				</Grid2>
			</>
		</Grid2>
	);
};

export default AnimeCardContainer;
