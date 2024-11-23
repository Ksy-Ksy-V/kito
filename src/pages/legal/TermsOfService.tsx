import { Grid2 } from '@mui/material';
import termsBackground from '../../images/termsBackground.jpg';
import {
	termsOfService,
	welcomeTermsOfService,
} from '../../data/termsOfService';
import BackgroundImg from '../../components/BackgroundImg';
import TextBlock from '../../components/legal/TextBlock';

const TermsOfService = () => {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={12}>
				<BackgroundImg
					title={'Terms of Service'}
					backgroundImage={termsBackground}
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
				welcomeText={welcomeTermsOfService}
				itemText={termsOfService}
			/>
		</Grid2>
	);
};

export default TermsOfService;
