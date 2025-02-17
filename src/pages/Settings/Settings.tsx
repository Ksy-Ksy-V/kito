import { Grid2, Typography } from '@mui/material';
import theme from '../../styles/theme';
import { useUserContext } from '../../context/UserContext';
import NotFound from '../Error/NotFound';
import PersonalInfoSettings from '../../components/Settings/PersonalInfoSettings';

function Settings() {
	const { state } = useUserContext();
	const { user } = state;

	if (!user) return <NotFound />;

	return (
		<>
			<Grid2 container spacing={2} size={12}>
				<Grid2 size={12}>
					<Typography
						variant="h2"
						sx={{
							textAlign: 'center',
							marginTop: '2rem',
							fontSize: {
								xs: theme.typography.h4.fontSize,
								sm: theme.typography.h3.fontSize,
								md: theme.typography.h3.fontSize,
								lg: theme.typography.h2.fontSize,
								xl: theme.typography.h2.fontSize,
							},
						}}
					>
						Personal information
					</Typography>
				</Grid2>

				<Grid2 size={12}>
					<Typography
						variant="body1"
						sx={{
							textAlign: 'center',
							fontSize: {
								xs: theme.typography.body1.fontSize,
								sm: theme.typography.body1.fontSize,
								md: theme.typography.body1.fontSize,
								lg: theme.typography.body1.fontSize,
								xl: theme.typography.body1.fontSize,
							},
						}}
					>
						This is a preview of your profile. Don't forget to click
						'Save changes' to apply your changes!
					</Typography>
				</Grid2>

				<PersonalInfoSettings />

				<Grid2 container spacing={2} size={12}>
					<Grid2 size={12}>
						<Typography
							variant="h2"
							sx={{
								textAlign: 'center',
								marginTop: '2rem',
								fontSize: {
									xs: theme.typography.h4.fontSize,
									sm: theme.typography.h3.fontSize,
									md: theme.typography.h3.fontSize,
									lg: theme.typography.h2.fontSize,
									xl: theme.typography.h2.fontSize,
								},
							}}
						>
							Account settings
						</Typography>
					</Grid2>
				</Grid2>
			</Grid2>
		</>
	);
}

export default Settings;
