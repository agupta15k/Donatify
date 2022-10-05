import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import LeftOver from './leftOver';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<LeftOver />
		</Provider>
	</React.StrictMode>
);
