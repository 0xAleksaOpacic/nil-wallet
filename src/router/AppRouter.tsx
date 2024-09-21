import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Landing from '../components/pages/Onboarding/Landing';
import CreateWallet from '../components/pages/Onboarding/CreateWallet';
import ImportWallet from '../components/pages/Onboarding/ImportWallet';
import SetPassword from '../components/pages/Onboarding/SetPassword';
import AllSet from '../components/pages/Onboarding/AllSet';
import OnboardingLayout from '../components/layouts/OnboardingLayout';

const AppRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/onboarding" element={<OnboardingLayout />}>
				<Route index element={<Landing />} />
				<Route path="create-wallet" element={<CreateWallet />} />
				<Route path="import-wallet" element={<ImportWallet />} />
				<Route path="set-password" element={<SetPassword />} />
				<Route path="all-set" element={<AllSet />} />
			</Route>
			<Route path="*" element={<Navigate to="/onboarding" />} />
		</Routes>
	</BrowserRouter>
);

export default AppRouter;
