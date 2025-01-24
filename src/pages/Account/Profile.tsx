import { Grid2 } from '@mui/material';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import AnimeTabs from '../../components/Profile/AnimeTab';
import { useUserContext } from '../../context/UserContext';
import NotFound from '../Error/NotFound';

const Profile = () => {
	const { state } = useUserContext();
	const { user } = state;

	if (!user) return <NotFound />;

	return (
		<Grid2 container spacing={2} size={12}>
			<ProfileHeader user={user} />
			<AnimeTabs user={user} />
		</Grid2>
	);
};

export default Profile;
