import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from './onboardingSlice';
import blockchainReducer from "./blockchainSlice";
import walletReducer from "./walletSlice";

const store = configureStore({
	reducer: {
		onboarding: onboardingReducer,
		blockchain: blockchainReducer,
		wallet: walletReducer,
	},
});

// Type for the root state
export type RootState = ReturnType<typeof store.getState>;

export default store;
