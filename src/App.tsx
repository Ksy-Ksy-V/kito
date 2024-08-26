import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import { Typography } from '@mui/material';

import './App.css';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div style={{ padding: '20px' }}>
				<Typography variant="h1">This is Kito</Typography>
			</div>
		</ThemeProvider>
	);
}

export default App;
