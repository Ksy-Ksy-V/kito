import axios from 'axios';

export const http = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json',
	},
});

export const httpPublic = axios.create({
	baseURL: 'http://localhost:8082',
	headers: {
		'Content-Type': 'application/json',
	},
});
