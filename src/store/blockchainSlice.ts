import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PublicClient, LocalECDSAKeySigner, WalletV1, Faucet } from '@nilfoundation/niljs';

// Define the state structure
interface BlockchainState {
  client: PublicClient | null;
  signer: LocalECDSAKeySigner | null;
  wallet: WalletV1 | null;
  faucet: Faucet | null; // Include Faucet
}

const initialState: BlockchainState = {
  client: null,
  signer: null,
  wallet: null,
  faucet: null,
};

// Create the slice
const blockchainSlice = createSlice({
  name: 'blockchain',
  initialState,
  reducers: {
    setClient(state, action: PayloadAction<PublicClient | null>) {
      state.client = action.payload;
    },
    setSigner(state, action: PayloadAction<LocalECDSAKeySigner | null>) {
      state.signer = action.payload;
    },
    setWallet(state, action: PayloadAction<WalletV1 | null>) {
      state.wallet = action.payload;
    },
    setFaucet(state, action: PayloadAction<Faucet | null>) {
      state.faucet = action.payload;
    },
  },
});

// Export actions and reducer
export const { setClient, setSigner, setWallet, setFaucet } = blockchainSlice.actions;
export default blockchainSlice.reducer;
