import { Box, Grid2, Typography } from '@mui/material';
import errorImg from '../images/error.png';
import StyledButton from './Buttons/StyledButton';
import theme from '../styles/theme';

const Errors = () => {
	const handleReload = () => {
		window.location.reload();
	};

	return (
		<Grid2
			container
			spacing={2}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: { xs: 'column', md: 'row' },
				position: 'relative',
				height: { xs: '100vh', md: 'auto' },
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
					Something went wrong ...
				</Typography>

				<StyledButton
					sx={{
						marginTop: '2rem',
						zIndex: 1,
						width: '23rem',
					}}
					onClick={handleReload}
				>
					Try again
				</StyledButton>
			</Grid2>

			<Grid2
				size={{ xs: 12, md: 4 }}
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
						backgroundImage: `url(${errorImg})`,
						backgroundSize: 'contain',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
					}}
				/>
			</Grid2>
		</Grid2>
	);
};

export default Errors;
