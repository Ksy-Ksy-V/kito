import { Box, Typography } from '@mui/material';
import { Anime } from '@tutkli/jikan-ts';

import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import theme from '../../styles/theme';

interface TitleInformationProps {
	anime: Anime | null;
	loading?: boolean;
}

const TitleInformation: React.FC<TitleInformationProps> = ({ anime }) => {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					marginTop: '4rem',
				}}
			>
				<Typography variant="h3" sx={{ marginRight: '1rem' }}>
					{anime?.title_english}
				</Typography>

				{anime && anime.score && (
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
								marginTop: '0.25rem',
							}}
						/>
						{anime.score}
					</Typography>
				)}
			</Box>

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
							backgroundColor: 'rgba(56, 113, 113, 0.7)',
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
		</>
	);
};

export default TitleInformation;
