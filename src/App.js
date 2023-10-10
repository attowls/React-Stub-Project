import React from 'react';
import Router from './routes/Router';
import './assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
	return (
		<React.Suspense>
			<Router />
		</React.Suspense>
	);
}

export default App;
