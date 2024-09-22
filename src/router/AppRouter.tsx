import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Landing from '../components/pages/Onboarding/Landing';
import CreateWallet from '../components/pages/Onboarding/CreateWallet';
import ImportWallet from '../components/pages/Onboarding/ImportWallet';
import SetPassword from '../components/pages/Onboarding/SetPassword';
import AllSet from '../components/pages/Onboarding/AllSet';
import OnboardingLayout from '../components/layouts/OnboardingLayout';
import SetEndpoint from "../components/pages/Onboarding/SetEndpoint.tsx";
import { OnboardingRoutes } from './routes.ts';

const AppRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route path={OnboardingRoutes.BASE} element={<OnboardingLayout />}>
				<Route index element={<Landing />} />
				<Route path={OnboardingRoutes.CREATE_WALLET}  element={<CreateWallet />} />
				<Route path={OnboardingRoutes.IMPORT_WALLET} element={<ImportWallet />} />
				<Route path={OnboardingRoutes.SET_ENDPOINT} element={<SetEndpoint />} />
				<Route path={OnboardingRoutes.SET_PASSWORD} element={<SetPassword />} />
				<Route path={OnboardingRoutes.ALL_SET} element={<AllSet />} />
			</Route>
			<Route path="*" element={<Navigate to={OnboardingRoutes.BASE}  />} />
		</Routes>
	</BrowserRouter>
);

export default AppRouter;
