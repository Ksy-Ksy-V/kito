import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, Container, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';

import './App.css';

import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Popularity from './pages/Popularity/Popularity';
import Airing from './pages/Airing/Airing';
import Randomizer from './pages/Randomizer/Randomizer';
import RandomizerResult from './pages/Randomizer/RandomizerResult';
import News from './pages/News/News';
import NewsDetail from './pages/News/NewsDetail';
import Settings from './pages/Settings/Settings';
import Profile from './pages/Profile/Profile';

import Header from './components/Header/Header';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Container>
					<Grid container spacing={3} style={{ padding: '20px' }}>
						<Grid item xs={12}>
							<Header />
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/search" element={<Search />} />
								<Route
									path="/popularity"
									element={<Popularity />}
								/>
								<Route
									path="/randomizer"
									element={<Randomizer />}
								/>
								<Route
									path="/randomizersearch"
									element={<RandomizerResult />}
								/>
								<Route path="/airing" element={<Airing />} />
								<Route path="/news" element={<News />} />
								<Route
									path="/news-detail"
									element={<NewsDetail />}
								/>
								<Route
									path="/settings"
									element={<Settings />}
								/>
								<Route path="/profile" element={<Profile />} />
							</Routes>
						</Grid>
					</Grid>
				</Container>
			</Router>
		</ThemeProvider>
	);
}

export default App;
