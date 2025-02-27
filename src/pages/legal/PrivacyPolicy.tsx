import { Grid2 } from '@mui/material';
import BackgroundImg from '../../components/BackgroundImg';
import policyBackground from '../../images/policyBackground.jpg';
import TextBlock from '../../components/legal/TextBlock';
import { privacyPolicy, welcomePrivacyPolicy } from '../../data/privacyPolicy';

const PrivacyPolicy = () => {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={12}>
				<BackgroundImg
					title={'Privacy Policy'}
					backgroundImage={policyBackground}
					height={{
						xs: '150px',
						sm: '250px',
						md: '300px',
						lg: '400px',
						xl: '400px',
					}}
				/>
			</Grid2>

			<TextBlock
				welcomeText={welcomePrivacyPolicy}
				itemText={privacyPolicy}
			/>
		</Grid2>
	);
};

export default PrivacyPolicy;
