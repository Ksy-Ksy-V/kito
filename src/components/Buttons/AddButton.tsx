import React from 'react';
import { Button, ButtonProps, useTheme } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

const AddButton: React.FC<ButtonProps> = ({ children, sx, ...props }) => {
	const theme = useTheme();

	return (
		<Button
			variant="outlined"
			fullWidth
			endIcon={<AddIcon />}
			sx={{
				backgroundColor: 'transparent',
				color: theme.palette.secondary.main,
				borderColor: theme.palette.secondary.main,
				marginTop: '1rem',
				marginBottom: '1rem',
				height: '56px',
				width: '17rem',
				border: 'solid 1px',
				'&:hover': {
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

export default AddButton;
