import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
	walletAddress: string;
	privateKey: string;
	rpcEndpoint: string;
	password: string;
	confirmPassword: string;
	shardId: number | null;
}

const initialState: OnboardingState = {
	walletAddress: '',
	privateKey: '',
	rpcEndpoint: '',
	password: '',
	confirmPassword: '',
	shardId: null
};

const onboardingSlice = createSlice({
	name: 'onboarding',
	initialState,
	reducers: {
		setWalletAddress(state, action: PayloadAction<string>) {
			state.walletAddress = action.payload;
		},
		setPrivateKey(state, action: PayloadAction<string>) {
			state.privateKey = action.payload;
		},
		setRpcEndpoint(state, action: PayloadAction<string>) {
			state.rpcEndpoint = action.payload;
		},
		setPassword(state, action: PayloadAction<string>) {
			state.password = action.payload;
		},
		setConfirmPassword(state, action: PayloadAction<string>) {
			state.confirmPassword = action.payload;
		},
		setShardId(state, action: PayloadAction<number>) {
			state.shardId = action.payload;
		},
	},
});

export const {
	setWalletAddress,
	setPrivateKey,
	setRpcEndpoint,
	setPassword,
	setConfirmPassword,
	setShardId
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
