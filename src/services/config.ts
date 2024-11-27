import {
  HttpTransport,
  LocalECDSAKeySigner,
  PublicClient,
  WalletV1,
  hexToBytes, Hex, Faucet, convertEthToWei, bytesToHex, waitTillCompleted
} from '@nilfoundation/niljs';
import { setClient, setSigner, setWallet, setFaucet } from "../store/blockchainSlice";
import { generateRandomSalt } from '../utils/salt.ts';
import { setBalance } from '../store/walletSlice.ts';
import { saveUserDetails, saveWalletBalance } from '../background/state.ts';


export function createClient({
                               rpcEndpoint,
                               shardId,
                             }: {
  rpcEndpoint: string;
  shardId: number;
}): PublicClient {
  return new PublicClient({
    transport: new HttpTransport({ endpoint: rpcEndpoint }),
    shardId,
  });
}

// Create a Faucet instance
export function createFaucet(client: PublicClient): Faucet {
  return new Faucet(client);
}

// Create a LocalECDSAKeySigner instance
export function createSigner(privateKey: string): LocalECDSAKeySigner {
  return new LocalECDSAKeySigner({
    privateKey: `0x${privateKey}`,
  });
}

// Initialize or deploy a wallet
export async function initializeOrDeployWallet({
                                                 client,
                                                 signer,
                                                 shardId,
                                                 walletAddress,
                                               }: {
  client: PublicClient;
  signer: LocalECDSAKeySigner;
  shardId: number;
  walletAddress?: string;
}): Promise<WalletV1> {
  const pubkey = signer.getPublicKey();

  if (walletAddress) {
    console.log("Initializing wallet with existing address:", walletAddress);
    return new WalletV1({
      pubkey,
      address: hexToBytes(walletAddress as Hex),
      client,
      signer,
    });
  }

  console.log("Deploying a new wallet...");
  const wallet = new WalletV1({
    pubkey,
    salt: generateRandomSalt(),
    shardId,
    client,
    signer,
  });

  const faucet = new Faucet(client);
  const faucetHash = await faucet.withdrawTo(wallet.address, convertEthToWei(0.1));
  await waitTillCompleted(client, bytesToHex(faucetHash));

  await wallet.selfDeploy(true);
  console.log("Wallet deployed successfully at:", wallet.address);

  return wallet;
}

// Initializes blockchain services and saves them in the Redux store
export async function setupBlockchainResources(dispatch, onboardingState): Promise<void> {
  const { rpcEndpoint, shardId, walletAddress, privateKey } = onboardingState;

  // Validate required fields
  if (!rpcEndpoint) {
    throw new Error("RPC Endpoint is required");
  }
  if (!shardId) {
    throw new Error("Shard ID is required");
  }
  if (!privateKey) {
    throw new Error("Private key is required");
  }

  // Create client
  const client = createClient({ rpcEndpoint, shardId });
  dispatch(setClient(client));

  // Create signer
  const signer = createSigner(privateKey);
  dispatch(setSigner(signer));

  // Create or deploy wallet
  const wallet = await initializeOrDeployWallet({ client, signer, shardId, walletAddress });
  dispatch(setWallet(wallet));

  // Create faucet
  const faucet = createFaucet(client);
  dispatch(setFaucet(faucet));

  await saveUserDetails({
    rpcEndpoint,
    shardId,
    privateKey,
    walletAddress: wallet.address,
  });
  await ensureClientInitialization(client, wallet.address, dispatch)
}

// Ensures the client is initialized and logs balance and code for the given address
export async function ensureClientInitialization(client: PublicClient, address: string, dispatch: Function): Promise<void> {
  try {
    // Fetch balance
    const balance = await client.getBalance((address as Hex), "latest");
    console.log(`Balance for address ${address}:`, balance.toString());

    await saveWalletBalance(balance.toString())

    // Dispatch the balance to Redux
    dispatch(setBalance(balance.toString()));

    // Fetch code
    const code = await client.getCode(address as Hex, "latest");
    console.log(`Code for address ${address}:`, code);

    // Later: Add conditions to validate balance/code if necessary
  } catch (error) {
    console.error("Error ensuring client initialization:", error);
    throw new Error("Client initialization failed. Please check the address or client setup.");
  }
}