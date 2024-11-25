import {
	Grid2,
	Typography,
	useTheme,
	Box,
	IconButton,
	AppBar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { importantLinks } from './footerLinksData';

import { socialLinks } from './socialLinksData';
import Logo from '../Logo';

const Footer = () => {
	const theme = useTheme();

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
				height: { sm: '7rem', xs: '12.5rem' },
			}}
		>
			<Grid2 container spacing={2} size={{ xs: 12 }}>
				<Grid2
					container
					alignItems="center"
					spacing={2}
					size={{ xs: 6 }}
					sx={{
						flexDirection: { xs: 'column', sm: 'row' },
						display: 'flex',
						justifyContent: 'space-evenly',
					}}
				>
					<Grid2
						size={{ xs: 12, sm: 5 }}
						sx={{
							marginTop: '0.5rem',
							marginLeft: { xs: '0', sm: '1rem' },
						}}
					>
						<Logo />
					</Grid2>

					<Grid2 size={{ xs: 12, sm: 6 }}>
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
				</Grid2>

				<Grid2
					container
					alignItems="center"
					spacing={2}
					size={{ xs: 6 }}
					sx={{
						flexDirection: { xs: 'column', sm: 'row' },
						display: 'flex',
						justifyContent: 'space-evenly',
					}}
				>
					<Grid2 size={{ xs: 12, sm: 6 }}>
						<Box
							sx={{
								display: 'flex',
								marginTop: '1rem',
								flexDirection: 'column',
								alignItems: 'flex-start',
								float: 'inline-end',
								marginRight: '1rem',
							}}
						>
							{importantLinks.map((link) => (
								<Typography
									variant="body1"
									key={link.name}
									component={Link}
									to={link.path}
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
									{link.name}
								</Typography>
							))}
						</Box>
					</Grid2>

					<Grid2
						size={{ xs: 12, sm: 6 }}
						sx={{
							marginTop: '1rem',
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column',
							float: 'inline-end',
						}}
					>
						<>
							<Typography
								variant="body2"
								sx={{
									color: theme.palette.primary.main,
									textAlign: 'right',
								}}
							>
								Copyright Ⓒ 2024 Kito.
							</Typography>
							<Typography
								variant="body2"
								sx={{
									marginTop: '0.5rem',
									color: theme.palette.primary.main,
									textAlign: 'right',
									marginRight: '1.25rem',
								}}
							>
								All Rights Reserved
							</Typography>
						</>
					</Grid2>
				</Grid2>
			</Grid2>
		</AppBar>
	);
};

export default Footer;
