import {
	Checkbox,
	Divider,
	FormControlLabel,
	Grid2,
	TextField,
	Typography,
	useMediaQuery,
} from '@mui/material';
import ProfileHeader from '../Profile/ProfileHeader';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import theme from '../../styles/theme';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { textFieldStyles } from '../../styles/AuthStyles';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import { ChangeEvent, useRef, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { UserAccount } from '../../models/ProfileModels';

const PersonalInfoSettings = () => {
	const { state, dispatch } = useUserContext();
	const { user } = state;

	const [hideStats, setHideStats] = useState(user?.isPrivate);
	const [newName, setNewName] = useState(user?.name);
	const [newStatus, setNewStatus] = useState(user?.status);

	const [newAvatar, setNewAvatar] = useState(user?.avatar);
	const [newCover, setNewCover] = useState(user?.background);

	const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
	const fileInputRef = useRef<HTMLInputElement>(null);
	const coverInputRef = useRef<HTMLInputElement>(null);

	const handleNamePreviewChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 15) {
			setNewName(e.target.value);
		}
	};

	const handleStatusPreviewChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		const lines = inputValue.split('\n');

		if (lines.length <= 3 && inputValue.length <= 130) {
			setNewStatus(inputValue);
		}
	};

	const handleStatusKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const inputValue = newStatus + e.key;
		const lines = inputValue.split('\n');

		if (e.key === 'Enter' && lines.length >= 3) {
			e.preventDefault();
		}
	};

	const handleImageChange = (
		e: ChangeEvent<HTMLInputElement>,
		type: 'avatar' | 'cover'
	) => {
		const file = e.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			if (type === 'avatar') {
				setNewAvatar(imageUrl);
			} else {
				setNewCover(imageUrl);
			}
		}
	};

	const handleSaveSubmit = () => {
		console.log('user:', user);

		const updatedUser = {
			name: newName || user?.name,
			status: newStatus || user?.status,
			avatar: newAvatar || user?.avatar,
			background: newCover || user?.background,
			isPrivate: hideStats,
		};

		dispatch({
			type: 'UPDATE_USER_INFO',
			payload: updatedUser,
		});

		console.log('Updated user data:', updatedUser);
	};
	return (
		<>
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
			<ProfileHeader
				user={user as UserAccount}
				isSettingsPage={true}
				newName={newName}
				hideStats={hideStats}
				newStatus={newStatus}
				newAvatar={newAvatar}
				newCover={newCover}
			/>

			<Grid2
				container
				spacing={2}
				size={{ xs: 12, sm: 5, md: 4 }}
				sx={{
					flexDirection: 'column',
					marginTop: {
						xs: hideStats ? '10rem' : '17rem',
						sm: hideStats ? '3rem' : '10rem',
						md: '4rem',
					},
				}}
			>
				<input
					type="file"
					accept="image/*"
					style={{ display: 'none' }}
					ref={fileInputRef}
					onChange={(e) => handleImageChange(e, 'avatar')}
				/>
				<ButtonWithIcon
					onClick={() => {
						fileInputRef.current?.click();
					}}
					icon={<CreateOutlinedIcon />}
				>
					Change avatar
				</ButtonWithIcon>

				<input
					type="file"
					accept="image/*"
					style={{ display: 'none' }}
					ref={coverInputRef}
					onChange={(e) => handleImageChange(e, 'cover')}
				/>
				<ButtonWithIcon
					onClick={() => coverInputRef.current?.click()}
					icon={<CreateOutlinedIcon />}
				>
					Change cover photo
				</ButtonWithIcon>
				<FormControlLabel
					control={
						<Checkbox
							checked={hideStats}
							onChange={(e) => setHideStats(e.target.checked)}
						/>
					}
					label="Hide account statistics"
					sx={{
						color: theme.palette.text.primary,
					}}
				/>
			</Grid2>

			<Grid2
				container
				size={1}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: {
						xs: '0rem',
						sm: '10rem',
						md: '3rem',
					},
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
					marginTop: {
						xs: '1rem',
						sm: hideStats ? '3rem' : '10rem',
						md: '4rem',
					},
					width: '100%',
				}}
			>
				<Grid2 size={12} sx={{ width: '100%' }}>
					<TextField
						id="name"
						fullWidth
						label="Name"
						type="text"
						value={newName}
						name="name"
						onChange={handleNamePreviewChange}
						sx={textFieldStyles}
					/>
					<TextField
						id="status"
						fullWidth
						label="Status"
						type="status"
						value={newStatus}
						name="status"
						onChange={handleStatusPreviewChange}
						onKeyDown={handleStatusKeyDown}
						sx={textFieldStyles}
						multiline
						rows={3}
					/>
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
					onClick={() => {
						handleSaveSubmit();
					}}
					icon={<DoneOutlineOutlinedIcon />}
					sx={{
						minWidth: '10rem',
						ml: 'auto',
					}}
				>
					Save changes
				</ButtonWithIcon>
			</Grid2>
		</>
	);
};

export default PersonalInfoSettings;
