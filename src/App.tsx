import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';

import './App.css';
import PageWrapper from './components/PageWrapper';
import NotFound from './pages/Error/NotFound';
import { routes } from './data/routesContent';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Container>
					<Routes>
						{routes.map(({ path, element }) => (
							<Route
								key={path}
								path={path}
								element={<PageWrapper>{element}</PageWrapper>}
							/>
						))}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Container>
			</Router>
		</ThemeProvider>
	);
}

export default App;
