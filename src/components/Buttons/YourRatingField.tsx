import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import theme from '../../styles/theme';

interface YourRatingFieldProps {
	loading?: boolean;
	width: {
		xs: string;
		sm: string;
		md: string;
	};
}

const YourRatingField: React.FC<YourRatingFieldProps> = ({
	loading,
	width,
}) => {
	const ratingOptions: string[] = [
		'This is Legendary - 10!!!',
		'Almost Perfect - 9',
		'Impressive - 8',
		'Pretty Good - 7',
		'Decent but Flawed - 6',
		'Just OK - 5',
		'Mediocre at Best - 4',
		'Needs Improvement - 3',
		'Barely Watchable - 2',
		'Complete Disaster - 1',
	];
	const [yourrating, setYourrating] = useState<string>('');

	return (
		<>
			<FormControl
				variant="filled"
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<InputLabel
					sx={{
						color: loading
							? theme.palette.primary.main
							: theme.palette.secondary.main,
						'&:hover': { color: theme.palette.secondary.main },
						'&.Mui-focused': {
							color: theme.palette.secondary.main,
						},
						'& .Mui-disabled': {
							color: theme.palette.primary.main,
						},
						fontSize: {
							md: theme.typography.body2.fontSize,
							sm: '0.7rem',
							xs: '0.6rem',
						},
					}}
				>
					YOUR RATING
				</InputLabel>

				<Select
					value={yourrating}
					onChange={(event) => setYourrating(event.target.value)}
					disabled={loading}
					sx={{
						height: '3rem',
						border: 'solid 1px  ',
						borderRadius: '0.25rem',
						borderColor: loading
							? theme.palette.primary.main
							: theme.palette.secondary.main,
						'& .Mui-disabled': {
							borderColor: theme.palette.primary.main,
						},
						width: { ...width },
					}}
				>
					{ratingOptions.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	);
};

export default YourRatingField;
