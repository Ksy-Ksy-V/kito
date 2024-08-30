import {
	AppBar,
	Toolbar,
	Grid2,
	Typography,
	useTheme,
	Button,
	Box,
	IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';

import logo from '../../images/logoBig.png';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
	const theme = useTheme();

	// const pages = [
	// 	{ name: 'Home', path: '/' },
	// 	{ name: 'Search ', path: '/search' },
	// 	{ name: 'Popularity', path: '/popularity' },
	// 	{ name: 'Airing', path: '/airing' },
	// ];

	// const importantLinks = [
	// 	{ name: 'About Project', path: '/' },
	// 	{ name: 'Privacy Policy', path: '/' },
	// 	{ name: 'Terms of Service', path: '/' },
	// ];

	// const profileLinks = [
	// 	{ name: 'Profile', path: '/profile' },
	// 	{ name: 'Settings', path: '/settings' },
	// ];

	return (
		<AppBar
			position="static"
			sx={{
				background: 'rgba(29, 51, 53, 0.51)',
				borderRadius: '5px',
				boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
				backdropFilter: 'blur(4.9px)',
				webkitBackdropFilter: 'blur(4.9px)',
				border: '1px solid rgba(29, 51, 53, 0.3)',
				marginTop: '1rem',
			}}
		>
			<Toolbar>
				<Grid2
					container
					alignItems="center"
					spacing={2}
					size={{ xs: 12 }}
				>
					<Grid2 size={{ xs: 2 }}>
						<Button
							component={Link}
							to="/"
							color="inherit"
							sx={{
								'&:hover': {
									backgroundColor: 'transparent',
								},
							}}
						>
							<img
								src={logo}
								alt="Logo"
								style={{ width: '8rem' }}
							/>
						</Button>

						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<IconButton
								component="a"
								href="https://instagram.com"
								target="_blank"
								sx={{
									color: theme.palette.primary.main,
									'&:hover': {
										color: theme.palette.secondary.main,
									},
								}}
							>
								<InstagramIcon sx={{ fontSize: 32 }} />
							</IconButton>

							<IconButton
								component="a"
								href="https://twitter.com"
								target="_blank"
								sx={{
									color: theme.palette.primary.main,
									'&:hover': {
										color: theme.palette.secondary.main,
									},
								}}
							>
								<XIcon sx={{ fontSize: 28 }} />
							</IconButton>

							<IconButton
								component="a"
								href="https://facebook.com"
								target="_blank"
								sx={{
									color: theme.palette.primary.main,
									'&:hover': {
										color: theme.palette.secondary.main,
									},
								}}
							>
								<FacebookIcon sx={{ fontSize: 32 }} />
							</IconButton>
						</Box>
					</Grid2>

					<Grid2 size={{ xs: 2 }} offset={{ xs: 2 }}>
						<Typography
							variant="body1"
							sx={{ marginTop: '1rem', marginBottom: '1rem' }}
						>
							{' '}
							Pages:
						</Typography>

						<Typography
							component={Link}
							to="/"
							sx={{
								display: 'block',
								color: theme.palette.primary.main,
								textDecoration: 'none',
								'&:hover': {
									color: theme.palette.secondary.main,
									textDecoration: 'none',
								},
							}}
						>
							Home
						</Typography>
						<Typography
							component={Link}
							to="/search"
							sx={{
								display: 'block',
								color: theme.palette.primary.main,
								textDecoration: 'none',
								'&:hover': {
									color: theme.palette.secondary.main,
									textDecoration: 'none',
								},
							}}
						>
							Search
						</Typography>
						<Typography
							component={Link}
							to="/popularity"
							sx={{
								display: 'block',
								color: theme.palette.primary.main,
								textDecoration: 'none',
								marginBottom: '1rem',
								'&:hover': {
									color: theme.palette.secondary.main,
									textDecoration: 'none',
								},
							}}
						>
							Popularity
						</Typography>
					</Grid2>

					<Grid2 size={{ xs: 2 }}>
						<Typography
							component={Link}
							to="/randomizer"
							sx={{
								display: 'block',
								color: theme.palette.primary.main,
								textDecoration: 'none',
								marginTop: '1rem',
								'&:hover': {
									color: theme.palette.secondary.main,
									textDecoration: 'none',
								},
							}}
						>
							Randomizer
						</Typography>
						<Typography
							component={Link}
							to="/news"
							sx={{
								display: 'block',
								color: theme.palette.primary.main,
								textDecoration: 'none',
								'&:hover': {
									color: theme.palette.secondary.main,
									textDecoration: 'none',
								},
							}}
						>
							News
						</Typography>
						<Typography
							component={Link}
							to="/airing"
							sx={{
								display: 'block',
								color: theme.palette.primary.main,
								textDecoration: 'none',
								'&:hover': {
									color: theme.palette.secondary.main,
									textDecoration: 'none',
								},
							}}
						>
							Airing
						</Typography>
					</Grid2>

					<Grid2 size={{ xs: 2 }}>
						<Typography
							variant="body1"
							sx={{ marginTop: '1rem', marginBottom: '1rem' }}
						>
							{' '}
							Important Links:
						</Typography>

						<Typography
							component={Link}
							to="/"
							sx={{
								display: 'block',
								color: theme.palette.primary.main,
								textDecoration: 'none',
								'&:hover': {
									color: theme.palette.secondary.main,
									textDecoration: 'none',
								},
							}}
						>
							About Project
						</Typography>
						<Typography
							component={Link}
							to="/"
							sx={{
								display: 'block',
								color: theme.palette.primary.main,
								textDecoration: 'none',
								'&:hover': {
									color: theme.palette.secondary.main,
									textDecoration: 'none',
								},
							}}
						>
							Privacy Policy
						</Typography>
						<Typography
							component={Link}
							to="/"
							sx={{
								display: 'block',
								color: theme.palette.primary.main,
								textDecoration: 'none',
								marginBottom: '1rem',
								'&:hover': {
									color: theme.palette.secondary.main,
									textDecoration: 'none',
								},
							}}
						>
							Terms of Service
						</Typography>
					</Grid2>

					<Grid2 size={{ xs: 2 }}>
						<Typography
							variant="body1"
							sx={{ marginTop: '1rem', marginBottom: '1rem' }}
						>
							{' '}
							Profile:{' '}
						</Typography>

						<Typography
							component={Link}
							to="/profile"
							sx={{
								display: 'block',
								color: theme.palette.primary.main,
								textDecoration: 'none',
								'&:hover': {
									color: theme.palette.secondary.main,
									textDecoration: 'none',
								},
							}}
						>
							Profile
						</Typography>
						<Typography
							component={Link}
							to="/settings"
							sx={{
								display: 'block',
								color: theme.palette.primary.main,
								textDecoration: 'none',
								'&:hover': {
									color: theme.palette.secondary.main,
									textDecoration: 'none',
								},
							}}
						>
							Settings
						</Typography>

						<Typography
							variant="body2"
							sx={{
								color: theme.palette.primary.main,
								marginBottom: '1rem',
							}}
						>
							{' '}
							Copyright Ⓒ 2024 Kito. All Rights Reserved{' '}
						</Typography>
					</Grid2>
				</Grid2>
			</Toolbar>
		</AppBar>
	);
};

export default Footer;
