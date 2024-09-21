import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../components/pages/Home/Home';

const AppRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route>
				<Route path={'/'} element={<Home />} />
			</Route>
			<Route path="*" element={<Navigate to={'/'} />} />
		</Routes>
	</BrowserRouter>
);

export default AppRouter;