// Saves wallet balance to Chrome storage
import { setBalance } from '../store/walletSlice.ts';
import { setClient, setFaucet, setSigner, setWallet } from '../store/blockchainSlice.ts';
import {
  createClient,
  createFaucet,
  createSigner,
  initializeOrDeployWallet,
  setupBlockchainResources
} from '../services/config.ts';

export async function saveWalletBalance(balance: string): Promise<void> {
  try {
    await chrome.storage.local.set({ walletBalance: balance });
    console.log("Wallet balance saved:", balance);
  } catch (error) {
    console.error("Error saving wallet balance:", error);
  }
}

// Saves other blockchain fields to Chrome storage
export async function saveUserDetails(fields: {
  rpcEndpoint: string;
  shardId: number;
  privateKey: string;
  walletAddress: string;
}): Promise<void> {
  try {
    await chrome.storage.local.set({ blockchainFields: fields });
    console.log("Blockchain fields saved:", fields);
  } catch (error) {
    console.error("Error saving blockchain fields:", error);
  }
}

export async function initializeFromStorageAndSetup(dispatch): Promise<void> {
  try {
    // Retrieve wallet balance
    const { walletBalance } = await chrome.storage.local.get("walletBalance");
    if (walletBalance) {
      console.log("Loaded wallet balance from storage:", walletBalance);
      dispatch(setBalance(walletBalance));
    } else {
      console.log("No wallet balance found in storage.");
    }

    // Retrieve blockchain fields
    const { blockchainFields } = await chrome.storage.local.get("blockchainFields");
    if (blockchainFields) {
      console.log("Loaded blockchain fields from storage:", blockchainFields);

      const { rpcEndpoint, shardId, privateKey, walletAddress } = blockchainFields;

      const publicClient = await createClient({ rpcEndpoint, shardId })
      const signer = await createSigner(privateKey)
      const faucet = await createFaucet(publicClient)
      const wallet = await initializeOrDeployWallet({client:publicClient,signer,shardId,walletAddress})

      // Save the fields to Redux
      dispatch(setWallet(wallet));
      dispatch(setClient(publicClient));
      dispatch(setSigner(signer));
      dispatch(setFaucet(faucet));

      // Initialize blockchain resources
      await setupBlockchainResources(dispatch, blockchainFields);
    } else {
      console.log("No blockchain fields found in storage.");
    }
  } catch (error) {
    console.error("Error initializing from storage and setting up blockchain resources:", error);
  }
}