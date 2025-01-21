import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { menuStyles, menuItemStyles } from '../../styles/menuStyles';
import { signout } from '../../store/reducers/authSlice';
import { useAppDispatch } from '../../store/hooks';
import { MenuProps } from '../../models/Interfaces';

const AccountMenu: React.FC<MenuProps> = ({ onSignOut }) => {
	const dispatch = useAppDispatch();
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const theme = useTheme();

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorElUser(null);
	};

	const handleSignOut = () => {
		dispatch(signout());
		setAnchorElUser(null);
		onSignOut();
	};

	return (
		<>
			<IconButton
				color="inherit"
				onClick={handleMenuClick}
				sx={{
					color: theme.palette.primary.main,
					'&:hover': {
						color: theme.palette.secondary.main,
					},
				}}
			>
				<AccountCircle sx={{ fontSize: '2rem' }} />
				<ArrowDropDownIcon sx={{ fontSize: '1.5rem' }} />
			</IconButton>
			<Menu
				anchorEl={anchorElUser}
				open={Boolean(anchorElUser)}
				onClose={handleMenuClose}
				sx={menuStyles}
			>
				<MenuItem
					component={Link}
					to="/profile"
					onClick={handleMenuClose}
					sx={menuItemStyles(theme)}
				>
					Profile
				</MenuItem>
				<MenuItem
					component={Link}
					to="/settings"
					onClick={handleMenuClose}
					sx={menuItemStyles(theme)}
				>
					Settings
				</MenuItem>
				<MenuItem onClick={handleSignOut} sx={menuItemStyles(theme)}>
					Sign out
				</MenuItem>
			</Menu>
		</>
	);
};

export default AccountMenu;
