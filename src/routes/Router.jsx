import React from 'react';

// routes
import { Routes, Route } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';

// pages
import MainPage from '../pages/MainPage';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />

			{/* Private Routes Example */}
			{/* <Route
				path="/*"
				exact
				element={<PrivateRoute component={<LayoutComponent />}/>}
			>
				<Route path="path/*">
					<Route path="inner-path" exact element={<InnerComponent />} />
				</Route>
			</Route> */}
		</Routes>
	);
}

export default Router;
