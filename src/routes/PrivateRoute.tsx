import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectAuth } from '../store/reducers/authSlice';
import { history } from '../models/history';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	const { isLoggedIn } = useAppSelector(selectAuth);

	if (!isLoggedIn) {
		return <Navigate to="/signin" state={{ from: history.location }} />;
	}

	return children;
};

export default PrivateRoute;
