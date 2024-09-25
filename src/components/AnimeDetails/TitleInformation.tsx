import {
	Box,
	Grid2,
	Skeleton,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { Anime } from '@tutkli/jikan-ts';

import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

interface TitleInformationProps {
	anime: Anime | null;
	loading?: boolean;
}

const TitleInformation: React.FC<TitleInformationProps> = ({
	anime,
	loading,
}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<Grid2 size={10}>
			<Grid2
				sx={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				{' '}
				{loading ? (
					<Skeleton variant="text" width="19rem" height="4rem" />
				) : (
					<Typography
						variant={isLargeScreen ? 'h2' : 'h3'}
						sx={{
							marginRight: '1rem',
							width: '100%',  
							textAlign: {
								xs: 'center',  
								md: 'left',
								sm: 'left', 
							},
						}}
					>
						{anime?.title_english || anime?.title_japanese}
					</Typography>
				)}
				{loading ? (
					<Skeleton
						variant="rectangular"
						width="5rem"
						height="2.5rem"
						sx={{ marginLeft: '1rem' }}
					/>
				) : (
					anime &&
					anime.score &&
					isLargeScreen && (
						<Typography
							variant="h4"
							sx={{
								color: theme.palette.text.primary,
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<StarOutlinedIcon
								sx={{
									marginRight: '0.5rem',
								}}
							/>
							{anime.score}
						</Typography>
					)
				)}
			</Grid2>

			{isLargeScreen && anime?.title_english && (
				<>
					{loading ? (
						<Skeleton
							variant="text"
							width="15rem"
							height="2.5rem"
						/>
					) : (
						<Typography
							variant="h4"
							sx={{
								fontFamily: 'Noto Sans JP, sans-serif',
								fontWeight: 400,
								fontSize: '1.777rem',
								color: '#dbfeff',
								marginTop: '0.5rem',
							}}
						>
							{anime?.title_japanese}
						</Typography>
					)}
				</>
			)}

			{isLargeScreen && (
				<>
					{loading ? (
						<>
							<Skeleton
								variant="rectangular"
								width="5rem"
								height="1.5rem"
								sx={{ borderRadius: '8px' }}
							/>
						</>
					) : (
						<Box
							sx={{
								marginTop: '1.5rem',
								display: 'flex',
								flexWrap: 'wrap',
								gap: '0.5rem',
							}}
						>
							{anime?.genres.map((genre) => (
								<Box
									key={genre.mal_id}
									sx={{
										backgroundColor:
											'rgba(56, 113, 113, 0.7)',
										padding: '0.25rem 0.5rem',
										borderRadius: '8px',
										fontSize: '0.875rem',
										display: 'inline-block',
										color: theme.palette.text.primary,
									}}
								>
									{genre.name}
								</Box>
							))}
						</Box>
					)}
				</>
			)}
		</Grid2>
	);
};

export default TitleInformation;
