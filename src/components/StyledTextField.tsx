import {
	TextField,
	BaseTextFieldProps,
	SelectProps,
	TextFieldProps,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';

export type MyTextFieldProps = TextFieldProps & {
	children: React.ReactNode;
};

const StyledTextField: FC<MyTextFieldProps> = ({ ...props }) => {
	const theme = useTheme();

	return (
		<TextField
			variant="filled"
			fullWidth
			sx={{
				margin: '1rem',
				color: theme.palette.secondary.main,
				backgroundColor: theme.palette.background.default,
				borderColor: theme.palette.secondary.main,
				borderRadius: '5px',
				'&:hover': {
					backgroundColor: theme.palette.action.hover,
					borderColor: theme.palette.secondary.main,
				},
			}}
			{...props}
		>
			{props.children}
		</TextField>
	);
};

export default StyledTextField;
