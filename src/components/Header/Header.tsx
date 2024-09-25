import { AppBar, Toolbar, IconButton, useTheme, Grid2 } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import NavBar from './NavBar';
import AccountMenu from './AccountMenu';
import Logo from '../Logo';

import AnimeSearchField from '../Search/AnimeSearchField';

const Header = () => {
	const theme = useTheme();
	const location = useLocation();

	const isSearchPage = location.pathname === '/search';

	return (
		<AppBar
			position="static"
			sx={{
				background: 'rgba(29, 51, 53, 0.51)',
				borderRadius: '5px',
				boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
				backdropFilter: 'blur(4.9px)',
				border: '1px solid rgba(29, 51, 53, 0.3)',
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
						<Logo />
					</Grid2>

					<Grid2 size={{ xs: 2 }}>
						<NavBar />
					</Grid2>

					{!isSearchPage && (
						<Grid2 size={{ xs: 4 }} offset={{ xs: 2 }}>
							<AnimeSearchField />
						</Grid2>
					)}

					<Grid2
						size={{ xs: 1 }}
						offset={isSearchPage ? { xs: 6 } : { xs: 0 }}
					>
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
					</Grid2>

					<Grid2 size={{ xs: 1 }}>
						<AccountMenu />
					</Grid2>
				</Grid2>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
