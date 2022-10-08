import axios from 'axios';

const fetchClient = () => {
	const defaultOptions = {
		baseURL: 'http://localhost:5001',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	// Create instance
	let instance = axios.create(defaultOptions);

	// Set the token for any request
	instance.interceptors.request.use(function (config) {
		const token = localStorage.getItem('token');
		config.headers.token = token ? token : '';
		return config;
	});

	return instance;
};

export default fetchClient();