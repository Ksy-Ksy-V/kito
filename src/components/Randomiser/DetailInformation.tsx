import { Typography, Divider, Box } from '@mui/material';
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
		<Box sx={{ position: 'relative', marginBottom: '1rem' }}>
			<Typography
				variant="body1"
				sx={{
					color: theme.palette.secondary.main,
				}}
			>
				<b>{label}</b>
			</Typography>

			<Typography
				variant="body1"
				sx={{
					color: theme.palette.primary.main,
					position: 'absolute',
					right: 0,
				}}
			>
				{value}
			</Typography>

			<Divider
				sx={{
					width: '100%',
					backgroundColor: theme.palette.primary.main,
					marginTop: '0.5rem',
				}}
			/>
		</Box>
	);
};

export default DetailInformation;
