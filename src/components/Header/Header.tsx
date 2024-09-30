import { AppBar, Toolbar, Grid2 } from '@mui/material';
import { useLocation } from 'react-router-dom';

import NavBar from './NavBar';
import AccountMenu from './AccountMenu';
import Logo from '../Logo';

import SearchInputField from '../Search/SearchInputField';

const Header = () => {
	const location = useLocation();

	const isSearchOrHomePage =
		location.pathname === '/search' || location.pathname === '/';

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
					{!isSearchOrHomePage && (
						<Grid2 size={{ xs: 4 }} offset={{ xs: 3 }}>
							<SearchInputField />
						</Grid2>
					)}

					<Grid2
						size={{ xs: 1 }}
						offset={!isSearchOrHomePage ? { xs: 0 } : { xs: 7 }}
					>
						<AccountMenu />
					</Grid2>
				</Grid2>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
