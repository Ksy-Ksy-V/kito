import { Grid2, Typography } from '@mui/material';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import StatisticsAccount from '../../components/Profile/StatisticsAccount';
import theme from '../../styles/theme';

const Profile = () => {
	return (
		<Grid2 container spacing={2} size={12}>
			<ProfileHeader />
			<StatisticsAccount />

			<Grid2 container spacing={2} size={12}>
				<Grid2
					size={12}
					sx={{
						marginTop: '0.5rem',
						backgroundColor: 'rgba(29, 51, 53, 0.7)',
						height: '5rem',
						borderRadius: '0.5rem',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-evenly',
					}}
				>
					<Grid2 size={4}>
						<Typography
							variant="h4"
							sx={{
								textAlign: 'center',
								marginTop: '1.5rem',
								color: theme.palette.secondary.main,
							}}
						>
							Complete
						</Typography>
					</Grid2>
					<Grid2 size={4}>
						<Typography
							variant="h4"
							sx={{
								textAlign: 'center',
								marginTop: '1.5rem',
								color: theme.palette.secondary.main,
							}}
						>
							Plan to Watch
						</Typography>
					</Grid2>
					<Grid2 size={4}>
						<Typography
							variant="h4"
							sx={{
								textAlign: 'center',
								marginTop: '1.5rem',
								color: theme.palette.secondary.main,
							}}
						>
							On Hold
						</Typography>
					</Grid2>
					<Grid2 size={4}>
						<Typography
							variant="h4"
							sx={{
								textAlign: 'center',
								marginTop: '1.5rem',
								color: theme.palette.secondary.main,
							}}
						>
							Dropped
						</Typography>
					</Grid2>
				</Grid2>
			</Grid2>
		</Grid2>
	);
};

export default Profile;
