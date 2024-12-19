import { Grid2 } from '@mui/material';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import AnimeTabs from '../../components/Profile/AnimeTab';

const Profile = () => {
	return (
		<Grid2 container spacing={2} size={12}>
			<ProfileHeader />
			<AnimeTabs />
		</Grid2>
	);
};

export default Profile;
