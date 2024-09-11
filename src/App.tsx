import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';

import './App.css';
import PageWrapper from './components/PageWrapper';
import NotFound from './pages/Error/NotFound';
import { routes, routesWide } from './data/routesContent';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<Router>
				<Routes>
					{routes.map(({ path, element }) => (
						<Route
							key={path}
							path={path}
							element={<PageWrapper>{element}</PageWrapper>}
						/>
					))}

					{routesWide.map(({ path, element }) => (
						<Route
							key={path}
							path={path}
							fullWidth={fullWidth}
							element={<PageWrapper>{element}</PageWrapper>}
						/>
					))}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
