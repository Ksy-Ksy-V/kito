import React from 'react';
import { Button, ButtonProps, useTheme } from '@mui/material';

const MainButton: React.FC<ButtonProps> = ({ children, sx, ...props }) => {
	const theme = useTheme();

	return (
		<Button
			variant="outlined"
			fullWidth
			sx={{
				backgroundColor: theme.palette.primary.main,
				color: theme.palette.secondary.main,
				borderColor: theme.palette.secondary.main,
				'&:hover': {
					backgroundColor: theme.palette.background.default,
					borderColor: theme.palette.secondary.main,
				},
				padding: {
					xs: '2px 4px',
					md: '4px 8px',
					lg: '6px 10px',
				},
				fontSize: {
					xs: '0.75rem',
					sm: '0.875rem',
					md: '1rem',
				},
				...sx,
			}}
			{...props}
		>
			{children}
		</Button>
	);
};

export default MainButton;
