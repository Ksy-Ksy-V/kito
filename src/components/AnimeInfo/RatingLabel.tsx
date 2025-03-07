import { Grid2, Skeleton, Typography } from '@mui/material';
import theme from '../../styles/theme';
import { AnimeSectionProps } from '../../models/Interfaces';
import { FC } from 'react';

const RatingLabel: FC<AnimeSectionProps> = ({ anime, loading }) => {
	return (
		<Grid2
			sx={{
				height: '8rem',
				width: '5rem',
				backgroundColor: 'rgba(38, 71, 71, 0.85)',
				borderEndStartRadius: '1rem',
				borderEndEndRadius: '1rem',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: '-1rem',
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
		</Grid2>
	);
};

export default RatingLabel;
