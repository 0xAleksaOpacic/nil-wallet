import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from './onboardingSlice';
import blockchainReducer from "./blockchainSlice"

const store = configureStore({
	reducer: {
		onboarding: onboardingReducer,
		blockchain: blockchainReducer,
	},
});

// Type for the root state
export type RootState = ReturnType<typeof store.getState>;

export default store;
