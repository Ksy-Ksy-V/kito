import { Typography, Grid2, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import randomiserImg from '../../images/randomiserImg.jpg';

import StyledButton from '../StyledButton';

const RandomiserSection = () => {
	return (
		<Box
			sx={{
				position: 'relative',
				width: '100vw',
				left: '50%',
				right: '50%',
				marginLeft: '-50vw',
				marginRight: '-50vw',
				height: '250px',
				overflow: 'hidden',
				marginTop: '3rem',
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					backgroundImage: `url(${randomiserImg})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					zIndex: 1,
				}}
			></Box>

			<Box
				sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.7)',
					zIndex: 2,
				}}
			></Box>

			<Grid2
				container
				justifyContent="center"
				alignItems="center"
				sx={{
					position: 'relative',
					height: '100%',
					zIndex: 3,
				}}
			>
				<Grid2
					size={12}
					sx={{
						textAlign: 'center',
					}}
				>
					<Typography
						variant="h2"
						sx={{
							marginBottom: '2rem',
						}}
					>
						Don't know what to watch?
					</Typography>

					<Link
						component={RouterLink}
						to="/randomiser"
						sx={{
							textDecoration: 'none',
						}}
					>
						<StyledButton
							sx={{
								width: 'auto',
								padding: '0.3rem 4rem',
							}}
						>
							Try Randomiser
						</StyledButton>
					</Link>
				</Grid2>
			</Grid2>
		</Box>
	);
};

export default RandomiserSection;
