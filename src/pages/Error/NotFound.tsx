import { Grid2, Typography, useTheme, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MainButton from '../../components/Buttons/MainButton';
import notFoundImg from '../../images/error.png';

const NotFound = () => {
	const theme = useTheme();
	return (
		<Grid2
			container
			spacing={2}
			sx={{
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Grid2 size={{ xs: 4 }}>
				<Box
					sx={{
						width: '100%',
						height: '31.25rem',
						backgroundImage: `url(${notFoundImg})`,
						backgroundSize: 'contain',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
					}}
				></Box>
			</Grid2>
			<Grid2 size={{ xs: 5 }} offset={{ xs: 1 }}>
				<Typography variant="h1">Ooops...</Typography>
				<Typography
					variant="h3"
					sx={{
						color: theme.palette.primary.main,
						marginTop: '2rem',
					}}
				>
					That page cannot be found
				</Typography>
				<Link
					component={RouterLink}
					to="/"
					sx={{
						textDecoration: 'none',
					}}
				>
					<MainButton sx={{ marginTop: '2rem' }}>
						Back to the homepage
					</MainButton>
				</Link>
			</Grid2>
		</Grid2>
	);
};

export default NotFound;
