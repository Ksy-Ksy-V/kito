import axios from 'axios';

export const http = axios.create({
	baseURL: import.meta.env.VITE_HTTP_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const httpPublic = axios.create({
	baseURL: import.meta.env.VITE_HTTP_PUBLIC_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});
