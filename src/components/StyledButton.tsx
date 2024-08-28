import React from 'react';
import { Button, ButtonProps, useTheme } from '@mui/material';

const StyledButton: React.FC<ButtonProps> = ({ children, sx, ...props }) => {
	const theme = useTheme();

	return (
		<Button
			variant="outlined"
			fullWidth
			sx={{
				backgroundColor: theme.palette.action.hover,
				color: theme.palette.secondary.main,
				borderColor: theme.palette.secondary.main,
				'&:hover': {
					backgroundColor: theme.palette.background.default,
					borderColor: theme.palette.secondary.main,
				},
				...sx,
			}}
			{...props}
		>
			{children}
		</Button>
	);
};

export default StyledButton;
