import { Box, Grid2, Typography } from '@mui/material';
import errorImg from '../images/not-found.png';
import StyledButton from './StyledButton';
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
			}}
		>
			<Grid2 size={{ xs: 4 }}>
				<Box
					sx={{
						width: '100%',
						height: '400px',
						backgroundImage: `url(${errorImg})`,
						backgroundSize: 'contain',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
					}}
				></Box>
			</Grid2>
			<Grid2 size={{ xs: 5 }} offset={{ xs: 1 }}>
				<Typography
					variant="h3"
					sx={{
						color: theme.palette.primary.main,
					}}
				>
					Something went wrong ...
				</Typography>

				<StyledButton sx={{ marginTop: '2rem' }} onClick={handleReload}>
					Try again
				</StyledButton>
			</Grid2>
		</Grid2>
	);
};

export default Errors;
