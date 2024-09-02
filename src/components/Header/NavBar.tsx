import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { menuStyles, menuItemStyles } from '../../styles/menuStyles';

const NavBar = () => {
	const [anchorElBrowse, setAnchorElBrowse] = useState<null | HTMLElement>(
		null
	);

	const theme = useTheme();

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElBrowse(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorElBrowse(null);
	};

	return (
		<>
			<Button
				color="inherit"
				onClick={handleMenuClick}
				endIcon={
					<ArrowDropDownIcon
						sx={{
							color: theme.palette.primary.main,
						}}
					/>
				}
				sx={{
					color: theme.palette.primary.main,
					'&:hover': {
						color: theme.palette.secondary.main,
					},
				}}
			>
				<Typography variant="body1" sx={{ color: 'inherit' }}>
					Browse
				</Typography>
			</Button>
			<Menu
				anchorEl={anchorElBrowse}
				open={Boolean(anchorElBrowse)}
				onClose={handleMenuClose}
				sx={menuStyles}
			>
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
					to="/popularity"
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
					to="/randomiser"
					onClick={handleMenuClose}
					sx={menuItemStyles(theme)}
				>
					Randomiser
				</MenuItem>
				<MenuItem
					component={Link}
					to="/news"
					onClick={handleMenuClose}
					sx={menuItemStyles(theme)}
				>
					News
				</MenuItem>
			</Menu>
		</>
	);
};

export default NavBar;
