import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import blockchainReducer from "./blockchainSlice";
import walletReducer from "./walletSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		blockchain: blockchainReducer,
		wallet: walletReducer,
	},
});

// Type for the root state
export type RootState = ReturnType<typeof store.getState>;

export default store;
