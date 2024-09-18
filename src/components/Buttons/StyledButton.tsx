import React from 'react';
import { Button, ButtonProps, useTheme } from '@mui/material';

const StyledButton: React.FC<ButtonProps> = ({ children, sx, ...props }) => {
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
				...sx,
			}}
			{...props}
		>
			{children}
		</Button>
	);
};

export default StyledButton;
