import { Grid2, Link, Typography } from '@mui/material';
import StyledButton from '../Buttons/StyledButton';

const ReviewsSection = () => {
	return (
		<>
			<Grid2 container spacing={2} sx={{ marginTop: '2rem' }}>
				<Grid2 size={4}>
					<Typography
						variant="h2"
						sx={{
							textDecoration: 'none',
							'&:hover': {
								color: 'primary.main',
							},
						}}
					>
						Reviews
					</Typography>
				</Grid2>

				<Grid2 size={3} offset={5}>
					<Link sx={{ textDecoration: 'none' }}>
						<StyledButton
							sx={{
								backgroundColor: 'transparent',
								borderColor: 'primary.main',
								marginTop: '1rem',
							}}
						>
							Add My Review
						</StyledButton>
					</Link>
				</Grid2>
			</Grid2>
			<Grid2
				container
				spacing={2}
				sx={{
					marginTop: '2rem',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Grid2
					size={12}
					sx={{
						backgroundColor: ' theme.palette.primary.main',
					}}
				></Grid2>
			</Grid2>
		</>
	);
};

export default ReviewsSection;
