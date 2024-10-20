import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import theme from '../styles/theme';

interface YourRatingFieldProps {
	loading?: boolean;
}

const YourRatingField: React.FC<YourRatingFieldProps> = ({ loading }) => {
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
	const [yourRatingValue, setYourRatingValue] = useState<string>('');

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
						color: theme.palette.secondary.main,
						'&:hover': { color: theme.palette.secondary.main },
						'&.Mui-focused': {
							color: theme.palette.secondary.main,
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
					value={yourRatingValue}
					onChange={(event) => setYourRatingValue(event.target.value)}
					disabled={loading}
					sx={{
						height: {
							xs: '2.5rem',
							sm: '2.5rem',
							md: '3rem',
						},
						width: {
							xs: '12rem',
							sm: '14rem',
							md: '17rem',
						},

						border: 'solid 1px  ',
						borderRadius: '0.25rem',

						borderColor: theme.palette.secondary.main,
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
