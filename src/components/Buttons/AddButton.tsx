import React from 'react';
import { Button, ButtonProps, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddButtonProps extends ButtonProps {
	loading?: boolean;
}

const AddButton: React.FC<AddButtonProps> = ({
	children,
	sx,
	loading,
	...props
}) => {
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

				marginBottom: '1rem',

				height: {
					xs: '2.5rem',
					sm: '3rem',
					md: '3.5rem',
				},
				width: {
					xs: '12rem',
					sm: '14rem',
					md: '17rem',
				},
				border: 'solid 1px',
				'&:hover': {
					borderColor: theme.palette.secondary.main,
				},
				...sx,
			}}
			disabled={loading}
			{...props}
		>
			{children}
		</Button>
	);
};

export default AddButton;
