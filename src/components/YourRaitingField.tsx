import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import theme from '../styles/theme';

const YourRaitingField = () => {
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
			<FormControl fullWidth variant="filled">
				<InputLabel sx={{ color: theme.palette.secondary.main }}>
					Your Rating
				</InputLabel>
				<Select
					value={yourRatingValue}
					onChange={(event) => setYourRatingValue(event.target.value)}
					sx={{
						border: 'solid 1px  ',
						borderRadius: '0.25rem',
						borderColor: theme.palette.secondary.main,
						'&:hover': {},
						'&.Mui-focused': {},
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

export default YourRaitingField;
