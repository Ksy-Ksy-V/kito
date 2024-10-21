import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './store/reducers/authSlice.tsx';

const store = configureStore({ reducer });

createRoot(document.getElementById('root')!).render(
	<>
		<Provider store={store}>
			<App />
		</Provider>
	</>
);
