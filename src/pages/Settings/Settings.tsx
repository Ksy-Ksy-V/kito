import { Grid2 } from '@mui/material';
import { useUserContext } from '../../context/UserContext';
import NotFound from '../Error/NotFound';
import PersonalInfoSettings from '../../components/Settings/PersonalInfoSettings';
import ChangePasswordSettings from '../../components/Settings/ChangePasswordSettings';
import DeleteSettings from '../../components/Settings/DeleteSettings';

function Settings() {
	const { state } = useUserContext();
	const { user } = state;

	if (!user) return <NotFound />;

	return (
		<>
			<Grid2 container spacing={2} size={12}>
				<PersonalInfoSettings />
				<ChangePasswordSettings />
				<DeleteSettings />
			</Grid2>
		</>
	);
}

export default Settings;
