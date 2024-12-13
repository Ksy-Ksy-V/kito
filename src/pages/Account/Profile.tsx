import { Grid2 } from '@mui/material';
import ProfileHeader from '../../components/Profile/ProfileHeader';

const Profile = () => {
	return (
		<Grid2 container spacing={2} size={12}>
			<ProfileHeader />

			<Grid2
				container
				spacing={2}
				size={12}
				sx={{ marginTop: '15rem' }}
			></Grid2>
		</Grid2>
	);
};

export default Profile;
