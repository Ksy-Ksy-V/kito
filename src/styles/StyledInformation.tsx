import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LabeledOption } from '../models/Interfaces';
import { FC } from 'react';

const StyledInformation: FC<LabeledOption> = ({ label, value }) => {
	const theme = useTheme();

	return (
		<Typography
			variant="body1"
			sx={{
				marginBottom: '0.25rem',
				display: 'flex',
				textAlign: 'center',
				justifyContent: { xs: 'space-between', sm: 'left' },
			}}
		>
			<b
				style={{
					color: theme.palette.text.secondary,
				}}
			>
				{label}
			</b>{' '}
			<span
				style={{
					color: theme.palette.text.primary,
				}}
			>
				{value}
			</span>
		</Typography>
	);
};

export default StyledInformation;
