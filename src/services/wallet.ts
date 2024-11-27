import { setBalance } from '../store/walletSlice.ts';
import {
  bytesToHex,
  convertEthToWei,
  Faucet,
  Hex,
  PublicClient,
  waitTillCompleted,
  WalletV1
} from '@nilfoundation/niljs';

// Fetches the balance of a wallet, and dispatches it to Redux
export async function getBalance(client: PublicClient, address: string, dispatch): Promise<void> {
  try {
    const balance = await client.getBalance((address as Hex), "latest");
    console.log(`Balance for address ${address}:`, balance.toString());

    // Dispatch balance to Redux
    dispatch(setBalance(balance.toString()));
  } catch (error) {
    console.error("Failed to fetch balance:", error);
    throw new Error("Failed to fetch balance.");
  }
}


// Tops up the specified wallet using the faucet
export async function topUp(
  client: PublicClient,
  faucet: Faucet,
  address: string,
  valueInEth: number
): Promise<void> {
  try {
    const valueInWei = convertEthToWei(valueInEth);
    const faucetHash = await faucet.withdrawTo(address as Hex, valueInWei);
    await waitTillCompleted(client, bytesToHex(faucetHash));

    console.log(`Topped up wallet ${address} with ${valueInEth} ETH successfully.`);
  } catch (error) {
    console.error("Failed to top up wallet:", error);
    throw new Error("Failed to top up wallet");
  }
}

// Method to send tokens
export async function sendTokens({
                                   wallet,
                                   client,
                                   toAddress,
                                   amount
                                 }: {
  wallet: WalletV1;
  client: PublicClient;
  toAddress: string;
  amount: string;
}): Promise<void> {
  try {
    // Convert amount to bigint
    const value = BigInt(amount);

    // Send message
    const hash = await wallet.sendMessage({
      to: toAddress as Hex,
      value,
      feeCredit: 100_000n, // Default fee
    });

    // Wait for the transaction to complete
    await waitTillCompleted(client, hash);

    console.log("Receipt hash: ", hash)
    console.log("Tokens sent successfully!");
  } catch (error) {
    console.error("Error sending tokens:", error);
    throw error;
  }
}