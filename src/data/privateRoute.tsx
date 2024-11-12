import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectAuth } from '../store/reducers/authSlice';
import { history } from '../helpers/history';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	console.log(selectAuth, 'selectAuth');
	const { isLoggedIn } = useAppSelector(selectAuth);

	if (!isLoggedIn) {
		return <Navigate to="/signin" state={{ from: history.location }} />;
	}

	return children;
};

export default PrivateRoute;
