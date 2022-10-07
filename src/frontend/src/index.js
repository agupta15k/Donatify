import React from 'react';
import { createRoot } from 'react-dom/client';
import LeftOver from './leftOver';
import './index.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<LeftOver />
	</React.StrictMode>
);
