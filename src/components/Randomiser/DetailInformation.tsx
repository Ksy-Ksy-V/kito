import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface DetailInformationProps {
	label: string;
	value: string;
}

const DetailInformation: React.FC<DetailInformationProps> = ({
	label,
	value,
}) => {
	const theme = useTheme();

	return (
		<Typography variant="body1" sx={{ marginTop: '1rem' }}>
			<b
				style={{
					color: theme.palette.secondary.main,
				}}
			>
				{label}
			</b>{' '}
			<span
				style={{
					color: theme.palette.primary.main,
				}}
			>
				{value}
			</span>
		</Typography>
	);
};

export default DetailInformation;
