import { Button, ButtonProps } from '@mui/material';
import theme from './theme';
import { FC } from 'react';

const AuthBtnStyled: FC<ButtonProps> = ({ children, sx, ...props }) => {
	return (
		<Button
			variant="outlined"
			size="small"
			sx={{
				backgroundColor: theme.palette.secondary.main,
				color: theme.palette.background.default,
				fontSize: '0.625rem',
				padding: '2px 6px',
				...sx,
			}}
			{...props}
		>
			{children}
		</Button>
	);
};

export default AuthBtnStyled;
