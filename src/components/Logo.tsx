import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Logo: React.FC = () => {
	return (
		<Button
			component={Link}
			to="/"
			color="inherit"
			sx={{
				'&:hover': {
					backgroundColor: 'transparent',
				},
			}}
		>
			<img src={logo} alt="Logo" style={{ width: '8rem' }} />
		</Button>
	);
};

export default Logo;
