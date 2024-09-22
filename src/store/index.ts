import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from './onboardingSlice';

const store = configureStore({
	reducer: {
		onboarding: onboardingReducer,
	},
});

// Type for the root state
export type RootState = ReturnType<typeof store.getState>;

export default store;
