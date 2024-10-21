import React, { useState } from 'react';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { menuStyles, menuItemStyles } from '../styles/menuStyles';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import theme from '../styles/theme';

const MenuSmall = () => {
	const [anchorElBrowse, setAnchorElBrowse] = useState<null | HTMLElement>(
		null
	);

	const [
		userAuthorised,
		// setUserAuthorised
	] = useState(false);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElBrowse(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorElBrowse(null);
	};

	return (
		<>
			<IconButton
				color="inherit"
				onClick={handleMenuClick}
				aria-controls="simple-menu"
				aria-haspopup="true"
				sx={{
					color: theme.palette.primary.main,
					'&:hover': {
						color: theme.palette.secondary.main,
					},
				}}
			>
				<MenuOutlinedIcon sx={{ fontSize: '2rem' }} />
			</IconButton>
			<Menu
				anchorEl={anchorElBrowse}
				open={Boolean(anchorElBrowse)}
				onClose={handleMenuClose}
				sx={menuStyles}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			>
				{userAuthorised ? (
					<MenuItem
						component={Link}
						to="/profile"
						onClick={handleMenuClose}
						sx={menuItemStyles(theme)}
					>
						Profile
					</MenuItem>
				) : (
					<MenuItem
						component={Link}
						to="/signin"
						onClick={handleMenuClose}
						sx={menuItemStyles(theme)}
					>
						Sign In
					</MenuItem>
				)}

				{userAuthorised ? (
					<MenuItem
						component={Link}
						to="/settings"
						onClick={handleMenuClose}
						sx={menuItemStyles(theme)}
					>
						Settings
					</MenuItem>
				) : (
					<MenuItem
						component={Link}
						to="/signup"
						onClick={handleMenuClose}
						sx={menuItemStyles(theme)}
					>
						Sign Up
					</MenuItem>
				)}

				<Divider
					variant="middle"
					sx={{ backgroundColor: theme.palette.primary.main }}
				/>

				<MenuItem
					component={Link}
					to="/search"
					onClick={handleMenuClose}
					sx={menuItemStyles(theme)}
				>
					Search
				</MenuItem>
				<MenuItem
					component={Link}
					to="/popular"
					onClick={handleMenuClose}
					sx={menuItemStyles(theme)}
				>
					Popularity
				</MenuItem>
				<MenuItem
					component={Link}
					to="/airing"
					onClick={handleMenuClose}
					sx={menuItemStyles(theme)}
				>
					Airing
				</MenuItem>
				<MenuItem
					component={Link}
					to="/randomizer"
					onClick={handleMenuClose}
					sx={menuItemStyles(theme)}
				>
					Randomizer
				</MenuItem>

				<Divider
					variant="middle"
					sx={{ backgroundColor: theme.palette.primary.main }}
				/>

				<MenuItem
					component={Link}
					to="/"
					onClick={handleMenuClose}
					sx={menuItemStyles(theme)}
				>
					About Project
				</MenuItem>

				<MenuItem
					component={Link}
					to="/"
					onClick={handleMenuClose}
					sx={menuItemStyles(theme)}
				>
					Privacy Policy
				</MenuItem>

				<MenuItem
					component={Link}
					to="/"
					onClick={handleMenuClose}
					sx={menuItemStyles(theme)}
				>
					Terms of Service
				</MenuItem>

				{userAuthorised && (
					<Divider
						variant="middle"
						sx={{ backgroundColor: theme.palette.primary.main }}
					/>
				)}

				{userAuthorised && (
					<MenuItem
						onClick={handleMenuClose}
						sx={menuItemStyles(theme)}
					>
						Log Out
					</MenuItem>
				)}
			</Menu>
		</>
	);
};

export default MenuSmall;
