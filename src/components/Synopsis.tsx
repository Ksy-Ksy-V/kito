import React, { useState } from 'react';
import { Typography, Skeleton, Box, Button } from '@mui/material';

interface SynopsisProps {
	synopsis: string;
	loading: boolean;
}

const Synopsis: React.FC<SynopsisProps> = ({ synopsis, loading }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded((prev) => !prev);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<Typography
				variant="body1"
				marginBottom="2rem"
				sx={{
					marginTop: '1rem',
					display: '-webkit-box',
					WebkitBoxOrient: 'vertical',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					WebkitLineClamp: isExpanded ? 'none' : 3,
					whiteSpace: isExpanded ? 'normal' : 'initial',
				}}
			>
				{loading ? (
					<>
						<Skeleton variant="text" />
						<Skeleton variant="text" />
						<Skeleton variant="text" />
					</>
				) : synopsis ? (
					synopsis
				) : (
					<>
						<Typography variant="body1">
							We couldn't find matching anime.
						</Typography>
						<Typography variant="body1">
							Try changing your filter parameters
						</Typography>
					</>
				)}
			</Typography>

			{!loading && synopsis && (
				<Button
					onClick={toggleExpand}
					sx={{
						textTransform: 'none',
						color: 'primary.main',
					}}
				>
					{isExpanded ? 'See less' : 'See more'}
				</Button>
			)}
		</Box>
	);
};

export default Synopsis;
