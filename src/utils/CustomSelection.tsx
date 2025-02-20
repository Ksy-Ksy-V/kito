import { GlobalStyles } from '@mui/material';
import theme from '../styles/theme';

const CustomSelection = () => {
	return (
		<>
			<GlobalStyles
				styles={{
					'::selection': {
						backgroundColor: theme.palette.secondary.dark,
						color: theme.palette.background.default,
					},
				}}
			/>
		</>
	);
};

export default CustomSelection;
