import { Box, Skeleton, Typography } from '@mui/material';
import theme from '../../styles/theme';
import { Anime } from '@tutkli/jikan-ts';

interface RaitingLabelProps {
	anime: Anime | null;
	loading: boolean;
}

const RaitingLabel: React.FC<RaitingLabelProps> = ({ anime, loading }) => {
	return (
		<Box
			sx={{
				height: '8rem',
				width: '5rem',
				backgroundColor: 'rgba(38, 71, 71, 0.85)',
				borderEndStartRadius: '1rem',
				borderEndEndRadius: '1rem',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{loading ? (
				<Skeleton variant="text" />
			) : (
				<Typography
					variant="h5"
					sx={{
						color: theme.palette.text.secondary,
						textAlign: 'center',
					}}
				>
					{anime?.rating?.split(' - ')[0]}
				</Typography>
			)}
		</Box>
	);
};

export default RaitingLabel;
