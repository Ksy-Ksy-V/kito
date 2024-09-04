import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import Popularity from '../pages/Popularity/Popularity';
import Airing from '../pages/Airing/Airing';
import Randomiser from '../pages/Randomiser/Randomiser';
import RandomiserResult from '../pages/Randomiser/RandomiserResult';
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
	{ path: '/randomiser', element: <Randomiser /> },
	{ path: '/randomiser-search', element: <RandomiserResult /> },
	{ path: '/airing', element: <Airing /> },
	{ path: '/news', element: <News /> },
	{ path: '/settings', element: <Settings /> },
	{ path: '/profile', element: <Profile /> },
];
