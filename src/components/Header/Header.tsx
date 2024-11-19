import { AppBar, Grid2, useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';

import NavBar from './NavBar';
import AccountMenu from './AccountMenu';
import Logo from '../Logo';

import AuthButtons from '../Authentication/AuthenticationButtons';
import SearchInputField from '../Search/SearchInputField';
import MenuSmall from '../Header/MenuSmall';
import theme from '../../styles/theme';
import TokenService from '../../services/tokenService';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/reducers/authSlice';

const Header = () => {
	const location = useLocation();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

	const isSearchOrHomePage =
		location.pathname === '/search' || location.pathname === '/';

	const { isLoggedIn } = useAppSelector(selectAuth);

	const handleSignOut = () => {
		TokenService.removeUser(); // TODO: Wait until BE implement token
	};

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
			<Grid2 container alignItems="center" spacing={2} size={{ xs: 12 }}>
				{isLargeScreen ? (
					<>
						<Grid2
							size={2}
							sx={{
								marginLeft: { sm: '1rem' },
							}}
						>
							<Logo />
						</Grid2>
						<Grid2 size={1}>
							<NavBar />
						</Grid2>
						{!isSearchOrHomePage && (
							<Grid2 size={{ xs: 4 }} offset={{ xs: 3 }}>
								<SearchInputField />
							</Grid2>
						)}
						{isLoggedIn ? (
							<Grid2
								size={{ xs: 1 }}
								offset={
									isSearchOrHomePage
										? { md: 7, lg: 7, xl: 7 }
										: { md: 0 }
								}
							>
								<AccountMenu onSignOut={handleSignOut} />
							</Grid2>
						) : (
							<Grid2
								size={{ xs: 2 }}
								offset={
									isSearchOrHomePage
										? { md: 6, lg: 6, xl: 6 }
										: { md: 0 }
								}
							>
								<AuthButtons />
							</Grid2>
						)}
					</>
				) : (
					<>
						<Grid2 size={{ xs: 10 }}>
							<Logo />
						</Grid2>

						<Grid2 size={{ xs: 2 }}>
							<MenuSmall
								userAuthorized={isLoggedIn}
								onSignOut={handleSignOut}
							/>
						</Grid2>
					</>
				)}
			</Grid2>
		</AppBar>
	);
};

export default Header;
