import { AppBar, Toolbar, Grid2 } from '@mui/material';
import { useLocation } from 'react-router-dom';

import NavBar from './NavBar';
// import AccountMenu from './AccountMenu';
import Logo from '../Logo';

import AnimeSearchField from '../Search/AnimeSearchField';
import AuthButtons from '../Authentication/AuthenticationButtons';

const Header = () => {
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
						size={{ xs: 2 }}
						offset={isSearchPage ? { xs: 6 } : { xs: 0 }}
					>
						{/* <AccountMenu /> */}
						<AuthButtons />
					</Grid2>
				</Grid2>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
