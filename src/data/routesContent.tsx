import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import Popularity from '../pages/Popularity/Popularity';
import Airing from '../pages/Airing/Airing';
import Randomizer from '../pages/Randomizer/Randomizer';
import RandomizerSearch from '../pages/Randomizer/RandomizerSearch';
import News from '../pages/News/News';
import Settings from '../pages/Settings/Settings';
import Profile from '../pages/Profile/Profile';

interface RouteContent {
	path: string;
	element: JSX.Element;
}

export const routes: RouteContent[] = [
	{ path: '/', element: <Home /> },
	{ path: '/search', element: <Search /> },
	{ path: '/popular', element: <Popularity /> },
	{ path: '/randomizer', element: <Randomizer /> },
	{ path: '/randomizer-search', element: <RandomizerSearch /> },
	{ path: '/airing', element: <Airing /> },
	{ path: '/news', element: <News /> },
	{ path: '/settings', element: <Settings /> },
	{ path: '/profile', element: <Profile /> },
];
