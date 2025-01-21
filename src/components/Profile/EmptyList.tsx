import { Box, Grid2, keyframes, Typography } from '@mui/material';
import img from '../../images/notResultFound.png';

import { useMemo } from 'react';
import theme from '../../styles/theme';
import { EmptyListProps } from '../../models/Interfaces';

const EmptyList: React.FC<EmptyListProps> = ({ isFiltrated }) => {
	const pulse = useMemo(
		() => keyframes`
			0% { transform: scale(1); }
			50% { transform: scale(1.2); }
			100% { transform: scale(1); }
		`,
		[]
	);

	const explanatoryText = useMemo(() => {
		if (!isFiltrated) {
			return 'This Cat is not yet ready to share their journey with the world.';
		}
		return 'Oops! We couldn’t find any results matching your filters.';
	}, [isFiltrated]);

	return (
		<Grid2
			container
			spacing={0}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: { xs: 'column', md: 'row' },
				position: 'relative',
				height: {
					xs: '40vh',
					xl: '40vh',
				},
			}}
		>
			<Grid2
				size={{ xs: 12, md: 5 }}
				offset={{ md: 1 }}
				sx={{
					order: { xs: 2, md: 2 },
					textAlign: 'center',
					zIndex: 1,
					position: { xs: 'relative', md: 'initial' },
				}}
			>
				<Typography
					variant="h3"
					sx={{
						color: theme.palette.secondary.main,
						fontSize: { xs: '1.8rem', md: '2.5rem' },
					}}
				>
					{explanatoryText}
				</Typography>
			</Grid2>

			<Grid2
				size={{ xs: 12, md: 6 }}
				sx={{
					order: { xs: 1, md: 1 },
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					position: { xs: 'absolute', md: 'relative' },

					width: '100%',
					height: { xs: '100%', md: '400px' },
					opacity: { xs: 0.2, md: 1 },
					zIndex: 0,
				}}
			>
				<Box
					sx={{
						width: { xs: '80%', md: '100%' },
						height: { xs: '80%', md: '300px' },
						backgroundImage: `url(${img})`,
						backgroundSize: 'contain',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						animation: `${pulse} 5s ease-in-out infinite`,
					}}
				/>
			</Grid2>
		</Grid2>
	);
};

export default EmptyList;
