import { Box, Grid2, Typography, useMediaQuery } from '@mui/material';
import BackgroundCover from './BackgroundCover';

import avatarDefault from '../../images/ProfileAvatar.png';
import theme from '../../styles/theme';
import { UserInfoProps } from '../../models/Interfaces';
import { FC } from 'react';

const ProfileHeader: FC<UserInfoProps> = ({
	user,
	hideStats,
	isSettingsPage,
	newName,
	newStatus,
	newAvatar,
	newCover,
}) => {
	const { name, status, animeList, avatar, background } = user;

	const stats = hideStats
		? []
		: [
				{ label: 'Anime', value: animeList.length },
				{
					label: 'Episodes',
					value: animeList.reduce(
						(sum, anime) => sum + anime.episodesWatched,
						0
					),
				},
				{
					label: 'Movies',
					value: animeList.filter((anime) => anime.type === 'Movie')
						.length,
				},
		  ];

	const profileAvatar = newAvatar || avatar || avatarDefault;
	const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
	return (
		<Grid2
			container
			spacing={2}
			size={12}
			sx={{
				position: 'relative',
				width: '100vw',
				height: { xs: '10rem', sm: '16rem' },
				marginTop: isSettingsPage ? '0rem' : '2rem',
			}}
		>
			<BackgroundCover backgroundImage={newCover || background} />

			<Grid2 container spacing={2} size={12}>
				<Grid2
					size={{ xs: 12, md: 2 }}
					offset={{ xs: 0, md: 1 }}
					sx={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Box
						component="img"
						src={profileAvatar}
						sx={{
							position: 'relative',
							width: { xs: '8rem', md: '10rem' },
							height: { xs: '8rem', md: '10rem' },
							objectFit: 'cover',
							borderRadius: '50%',
							marginTop: { xs: '1rem', md: '5rem' },
							zIndex: 3,
						}}
					/>
				</Grid2>

				<Grid2 size={{ xs: 12, md: 5 }}>
					<Typography
						variant="h3"
						sx={{
							zIndex: 3,
							position: 'relative',
							marginTop: {
								xs: '0rem',
								md: newName === '' ? '12.8rem' : '10rem',
							},
							marginLeft: { xs: '0rem', md: '2rem', lg: '0rem' },
							display: 'flex',
							justifyContent: { xs: 'center', md: 'left' },
							fontSize: {
								xs: theme.typography.h4.fontSize,
								sm: theme.typography.h3.fontSize,
							},
						}}
					>
						{newName ?? name}
					</Typography>
					<Typography
						variant="body1"
						sx={{
							zIndex: 3,
							position: 'relative',
							marginTop: {
								xs: '2.5rem',
								sm: '1rem',
								md: '0.5rem',
							},
							marginLeft: { xs: '0rem', md: '2rem', lg: '0rem' },
							textAlign: { xs: 'center', md: 'left' },
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: !isSmallScreen ? 4 : 3,
							WebkitBoxOrient: 'vertical',
							whiteSpace: 'pre-line',
						}}
					>
						{newStatus?.slice(0, 130) ?? status?.slice(0, 130)}
					</Typography>
				</Grid2>

				{!(hideStats || user.isPrivate) && (
					<Grid2
						size={{ xs: 12, md: 3 }}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
							marginTop: { xs: '1rem', sm: '2rem', md: '11rem' },
							zIndex: 3,
							marginLeft: { xs: '0rem', md: '3rem' },
						}}
					>
						{stats.map((stat) => (
							<Box
								key={stat.label}
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									textAlign: 'center',
								}}
							>
								<Typography
									variant="h5"
									sx={{ color: theme.palette.secondary.main }}
								>
									{stat.value}
								</Typography>
								<Typography variant="body1">
									{stat.label}
								</Typography>
							</Box>
						))}
					</Grid2>
				)}
			</Grid2>
		</Grid2>
	);
};

export default ProfileHeader;
