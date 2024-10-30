import { Grid2, Skeleton, Typography } from '@mui/material';
import { AbstractAnime } from '../../models/AbstractAnime';
import { useEffect, useState } from 'react';

interface AnimeDescriptionSectionProps {
	randomAnime: AbstractAnime | null;
	loading: boolean;
}

const AnimeDescriptionSection: React.FC<AnimeDescriptionSectionProps> = ({
	randomAnime,
	loading,
}) => {
	const [iframeHeight, setIframeHeight] = useState('300px');

	useEffect(() => {
		const updateHeight = () => {
			if (window.innerWidth < 600) {
				setIframeHeight('160px');
			} else if (window.innerWidth < 960) {
				setIframeHeight('200px');
			} else {
				setIframeHeight('300px');
			}
		};

		updateHeight();
		window.addEventListener('resize', updateHeight);
		return () => window.removeEventListener('resize', updateHeight);
	}, []);

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
				<Grid2 size={{ sm: 5, xs: 12 }}>
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
								{[...Array(8)].map((_, index) => (
									<Skeleton key={index} variant="text" />
								))}
							</>
						) : (
							randomAnime.synopsis
						)}
					</Typography>
				</Grid2>

				{randomAnime.trailer && (
					<Grid2 size={{ sm: 6, xs: 12 }} offset={{ sm: 1, xs: 0 }}>
						{loading ? (
							<Skeleton
								variant="rectangular"
								width="100%"
								height="300"
								sx={{ paddingTop: '56.25%' }}
							/>
						) : (
							<>
								<iframe
									width="100%"
									height={iframeHeight}
									loading="lazy"
									allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
									src={`${randomAnime?.trailer.embed_url}?autoplay=0`}
									title="Anime Trailer"
									style={{
										border: 'none',
									}}
								></iframe>
							</>
						)}
					</Grid2>
				)}
			</Grid2>
		</>
	);
};

export default AnimeDescriptionSection;
