import {
	Box,
	Divider,
	Grid2,
	TextField,
	Typography,
	useMediaQuery,
} from '@mui/material';
import theme from '../../styles/theme';
import { useUserContext } from '../../context/UserContext';
import NotFound from '../Error/NotFound';
import AvatarDefault from '../../images/ProfileAvatar.png';
import backgroundDefault from '../../images/accountBackground.jpg';
import ButtonWithIcon from '../../components/Buttons/ButtonWithIcon';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useState } from 'react';
import { textFieldStyles } from '../../styles/AuthStyles';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import ProfileHeader from '../../components/Profile/ProfileHeader';

function Settings() {
	const { state } = useUserContext();
	const { user } = state;

	// const [newAvatar, setNewAvatar] = useState('');
	// const [newCover, setNewCover] = useState('');
	// const [newName, setNewName] = useState('');
	// const [newStatus, setNewStatus] = useState('');

	const profileAvatar = user?.avatar || AvatarDefault;
	const finalBackground = user?.background || backgroundDefault;

	const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

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
				<ProfileHeader user={user} />

				<Grid2
					container
					spacing={2}
					size={{ xs: 12, sm: 5, md: 4 }}
					sx={{
						flexDirection: 'column',
						marginTop: { xs: '17rem', sm: '10rem', md: '4rem' },
					}}
				>
					<ButtonWithIcon
						// onClick={() => {
						// 	setOpen(true);
						// }}
						// loading={loading}
						icon={<CreateOutlinedIcon />}
					>
						Change avatar
					</ButtonWithIcon>
					<ButtonWithIcon
						// onClick={() => {
						// 	setOpen(true);
						// }}
						// loading={loading}
						icon={<CreateOutlinedIcon />}
					>
						Change cover photo
					</ButtonWithIcon>
				</Grid2>
				<Grid2
					container
					size={1}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: { xs: '0rem', sm: '10rem', md: '3rem' },
					}}
				>
					{isLargeScreen && (
						<Divider
							orientation="vertical"
							variant="middle"
							sx={{
								borderColor: theme.palette.secondary.main,
								borderWidth: '0.1rem',
							}}
						/>
					)}
				</Grid2>

				<Grid2
					container
					size={{ xs: 12, sm: 6, md: 7 }}
					sx={{
						marginTop: { xs: '1rem', sm: '10rem', md: '4rem' },
						width: '100%',
					}}
				>
					<Grid2 size={12} sx={{ width: '100%' }}>
						<form
							style={{ width: '100%' }}
							// onSubmit={handleSubmit}
						>
							<TextField
								id="name"
								fullWidth
								label="Name"
								type="name"
								value={user.name}
								name="name" // onChange={handleChange}
								// helperText={validationsErrors.email}
								sx={textFieldStyles}
							/>
							<TextField
								id="status"
								fullWidth
								label="Status"
								type="status"
								value={user.status}
								inputProps={{ maxLength: 300 }}
								name="status" // onChange={handleChange}
								// helperText={validationsErrors.email}
								sx={textFieldStyles}
								multiline
								rows={4}
							/>
						</form>
					</Grid2>
				</Grid2>
				<Grid2
					size={4}
					offset={{ xs: 0, sm: 6, md: 8 }}
					sx={{
						marginTop: '2rem',
						width: '100%',
						display: 'flex',
						justifyContent: 'flex-end',
					}}
				>
					<ButtonWithIcon
						// onClick={() => {
						// 	setOpen(true);
						// }}
						// loading={loading}
						icon={<DoneOutlineOutlinedIcon />}
						sx={{
							minWidth: '10rem',
							ml: 'auto',
						}}
					>
						Save changes
					</ButtonWithIcon>
				</Grid2>
			</Grid2>
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
		</>
	);
}

export default Settings;
