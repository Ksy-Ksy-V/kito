import {
	AppBar,
	Toolbar,
	Grid2,
	Typography,
	useTheme,
	Box,
	IconButton,
	useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
	pagesLinks,
	randomizerLinks,
	importantLinks,
	profileLinks,
} from './footerLinksData';

import { socialLinks } from './socialLinksData';
import Logo from '../Logo';
import MenuSmall from '../MenuSmall';

const Footer = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<AppBar
			position="static"
			sx={{
				background: 'rgba(29, 51, 53, 0.51)',
				borderRadius: '0.3rem',
				boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
				backdropFilter: 'blur(4.9px)',
				border: '1px solid rgba(29, 51, 53, 0.3)',
				marginTop: '2rem',
				height: '10rem',
			}}
		>
			<Toolbar>
				<Grid2
					container
					alignItems="center"
					spacing={2}
					size={{ xs: 12 }}
				>
					<Grid2
						size={{ xs: 6, sm: 6, md: 2, lg: 2, xl: 2 }}
						sx={{
							flexDirection: 'column',
							alignItems: 'flex-start',
						}}
					>
						<Logo />

						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								marginTop: '1rem',
							}}
						>
							{socialLinks.map((social) => (
								<IconButton
									key={social.name}
									component="a"
									href={social.href}
									target="_blank"
									sx={{
										color: theme.palette.primary.main,
										'&:hover': {
											color: theme.palette.secondary.main,
										},
									}}
								>
									{social.icon}
								</IconButton>
							))}
						</Box>
					</Grid2>

					{isLargeScreen ? (
						<>
							<Grid2 size={{ xs: 2 }} offset={{ xs: 2 }}>
								<Typography
									variant="body1"
									sx={{ marginBottom: '1rem' }}
								>
									Pages:
								</Typography>

								{pagesLinks.map((link) => (
									<Typography
										key={link.name}
										component={Link}
										to={link.path}
										sx={{
											display: 'block',
											color: theme.palette.primary.main,
											textDecoration: 'none',
											'&:hover': {
												color: theme.palette.secondary
													.main,
												textDecoration: 'none',
											},
										}}
									>
										{link.name}
									</Typography>
								))}
							</Grid2>

							<Grid2
								size={{ xs: 2 }}
								sx={{ marginTop: '2.40rem' }}
							>
								{randomizerLinks.map((link) => (
									<Typography
										key={link.name}
										component={Link}
										to={link.path}
										sx={{
											display: 'block',
											color: theme.palette.primary.main,
											textDecoration: 'none',
											'&:hover': {
												color: theme.palette.secondary
													.main,
												textDecoration: 'none',
											},
										}}
									>
										{link.name}
									</Typography>
								))}
							</Grid2>

							<Grid2 size={{ xs: 2 }}>
								<Typography
									variant="body1"
									sx={{ marginBottom: '1rem' }}
								>
									Important Links:
								</Typography>

								{importantLinks.map((link) => (
									<Typography
										key={link.name}
										component={Link}
										to={link.path}
										sx={{
											display: 'block',
											color: theme.palette.primary.main,
											textDecoration: 'none',
											'&:hover': {
												color: theme.palette.secondary
													.main,
												textDecoration: 'none',
											},
										}}
									>
										{link.name}
									</Typography>
								))}
							</Grid2>

							<Grid2 size={{ xs: 2 }}>
								<Typography
									variant="body1"
									sx={{
										marginTop: '1rem',
										marginBottom: '1rem',
									}}
								>
									Profile:
								</Typography>

								{profileLinks.map((link) => (
									<Typography
										key={link.name}
										component={Link}
										to={link.path}
										sx={{
											display: 'block',
											color: theme.palette.primary.main,
											textDecoration: 'none',
											'&:hover': {
												color: theme.palette.secondary
													.main,
												textDecoration: 'none',
											},
										}}
									>
										{link.name}
									</Typography>
								))}

								<Typography
									variant="body2"
									sx={{
										marginTop: '0.5rem',
										color: theme.palette.primary.main,
									}}
								>
									Copyright Ⓒ 2024 Kito.
								</Typography>
								<Typography
									variant="body2"
									sx={{
										color: theme.palette.primary.main,
									}}
								>
									All Rights Reserved
								</Typography>
							</Grid2>
						</>
					) : (
						<Grid2
							size={{ xs: 6 }}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-end',
							}}
						>
							<MenuSmall />

							<Typography
								variant="body2"
								sx={{
									marginTop: '0.5rem',
									color: theme.palette.primary.main,
								}}
							>
								Copyright Ⓒ 2024 Kito.
							</Typography>
							<Typography
								variant="body2"
								sx={{
									color: theme.palette.primary.main,
								}}
							>
								All Rights Reserved
							</Typography>
						</Grid2>
					)}
				</Grid2>
			</Toolbar>
		</AppBar>
	);
};

export default Footer;
