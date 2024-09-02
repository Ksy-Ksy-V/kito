import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../images/logoBig.png';

const Logo = () => {
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
