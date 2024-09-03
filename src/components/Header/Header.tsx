import { AppBar, Toolbar, IconButton, Grid, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import NavBar from './NavBar';
import AccountMenu from './AccountMenu';
import Logo from '../Logo';

const Header = () => {
	const theme = useTheme();
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
			}}
		>
			<Toolbar>
				<Grid container alignItems="center" spacing={2}>
					<Grid item xs={2}>
						<Logo />
					</Grid>

					<Grid item xs={2}>
						<NavBar />
					</Grid>

					<Grid item xs={6} />

					<Grid item xs={1}>
						<IconButton
							component={Link}
							to="/search"
							sx={{
								color: theme.palette.primary.main,
								'&:hover': {
									color: theme.palette.secondary.main,
								},
							}}
						>
							<SearchIcon sx={{ fontSize: '2rem' }} />
						</IconButton>
					</Grid>

					<Grid item xs={1}>
						<AccountMenu />
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
