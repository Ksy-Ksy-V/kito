import { Grid2, Skeleton, Box, Typography } from '@mui/material';
import { RandomAnime } from '../../models/randomAnime';

interface RandDescriptionSectionProps {
	randomAnime: RandomAnime | null;
	loading: boolean;
}

const RandDescriptionSection: React.FC<RandDescriptionSectionProps> = ({
	randomAnime,
	loading,
}) => {
	if (!randomAnime) {
		return null;
	}

	return (
		<>
			{loading ? (
				<Skeleton
					variant="text"
					width="40%"
					height={40}
					sx={{ marginTop: '1rem' }}
				/>
			) : (
				<Typography
					variant="h3"
					sx={{
						marginTop: '1rem',
						color: 'theme.palette.text.secondary',
						textAlign: randomAnime.trailer ? 'left' : 'center',
					}}
				>
					Description
				</Typography>
			)}

			<Grid2 container spacing={2} size={12}>
				<Grid2 size={randomAnime.trailer ? 5 : 12}>
					<Typography
						variant="body1"
						marginBottom="2rem"
						sx={{
							marginTop: '1rem',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							textAlign: randomAnime.trailer ? 'left' : 'center',
						}}
					>
						{loading ? (
							<>
								{[...Array(6)].map((_, index) => (
									<Skeleton key={index} variant="text" />
								))}
							</>
						) : (
							randomAnime.synopsis
						)}
					</Typography>
				</Grid2>

				{randomAnime.trailer && (
					<Grid2 size={6} offset={1}>
						{loading ? (
							<Skeleton
								variant="rectangular"
								width="100%"
								height={0}
								sx={{ paddingTop: '56.25%' }}
							/>
						) : (
							<Box
								sx={{
									marginTop: '1rem',
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
				)}
			</Grid2>
		</>
	);
};

export default RandDescriptionSection;
