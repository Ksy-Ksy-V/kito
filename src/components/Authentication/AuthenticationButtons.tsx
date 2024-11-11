import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthBtnStyled from '../../styles/AuthBtnStyled';
import theme from '../../styles/theme';

const AuthButtons: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-evenly',
				gap: '0.1rem',
			}}
		>
			<AuthBtnStyled size="small" onClick={() => navigate('/signin')}>
				Sign In
			</AuthBtnStyled>

			<AuthBtnStyled
				size="small"
				sx={{
					backgroundColor: theme.palette.background.default,
					color: theme.palette.secondary.main,
				}}
				onClick={() => navigate('/signup')}
			>
				Sign Up
			</AuthBtnStyled>
		</Box>
	);
};

export default AuthButtons;
