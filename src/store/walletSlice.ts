import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Wallet state
interface WalletState {
  balance: string;
}

// Initial state
const initialState: WalletState = {
  balance: "0", // Default balance is 0
};

// Create the slice
const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setBalance(state, action: PayloadAction<string>) {
      state.balance = action.payload;
    },
  },
});

// Export actions and reducer
export const { setBalance } = walletSlice.actions;
export default walletSlice.reducer;
