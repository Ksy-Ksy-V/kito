import { Box, Grid2, Typography } from '@mui/material';
import BackgroundCover from './BackgroundCover';

import ProfileAvatar from '../../images/ProfileAvatar.png';

const ProfileHeader = () => {
	const profileAvatar = ProfileAvatar;
	const name = 'Catch Me';
	const status =
		"Sometimes good people make bad choices. It doesn't mean they are bad people. It means they're human.";

	return (
		<Grid2
			container
			spacing={2}
			size={12}
			sx={{
				position: 'relative',
				width: '100vw',
				height: '15rem',
				marginTop: '2rem',
			}}
		>
			<BackgroundCover />

			<Grid2 container spacing={2} size={12}>
				<Grid2 size={2} offset={{ xs: 1 }}>
					<Box
						component="img"
						src={profileAvatar}
						sx={{
							position: 'relative',
							width: '10rem',
							height: '10rem',
							objectFit: 'cover',
							borderRadius: '50%',
							marginTop: '5rem',
							zIndex: 3,
						}}
					/>
				</Grid2>

				<Grid2 size={5}>
					<Typography
						variant="h3"
						sx={{
							zIndex: 3,
							position: 'relative',
							marginTop: '10rem',
						}}
					>
						{name}
					</Typography>
					<Typography
						variant="body1"
						sx={{
							marginTop: '0.5rem',
							zIndex: 3,
							position: 'relative',
						}}
					>
						{status}
					</Typography>
				</Grid2>
			</Grid2>
		</Grid2>
	);
};

export default ProfileHeader;
