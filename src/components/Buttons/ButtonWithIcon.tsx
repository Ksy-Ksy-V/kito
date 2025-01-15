import React from 'react';
import { Button, ButtonProps, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface ButtonWithIconProps extends ButtonProps {
	loading?: boolean;
	icon?: React.ReactNode;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
	children,
	sx,
	loading,
	icon,
	...props
}) => {
	const theme = useTheme();

	return (
		<Button
			variant="outlined"
			fullWidth
			endIcon={
				icon || (
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
				)
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

export default ButtonWithIcon;
