import React from 'react';
import { Button, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddButtonProps } from '../../models/Interfaces';

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
			endIcon={
				<AddIcon
					sx={{
						marginLeft: 'auto',
						fontSize: {
							xs: '1rem',
							sm: '1.25rem',
							md: '1.5rem',
						},
					}}
				/>
			}
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				backgroundColor: theme.palette.primary.dark,
				color: theme.palette.secondary.main,
				borderColor: theme.palette.secondary.main,
				fontSize: {
					md: theme.typography.body2.fontSize,
					sm: '0.7rem',
					xs: '0.6rem',
				},

				marginBottom: '1rem',
				textAlign: 'left',

				height: '3rem',

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
