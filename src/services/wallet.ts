import { setBalance } from '../store/walletSlice.ts';
import { bytesToHex, convertEthToWei, Faucet, Hex, PublicClient, waitTillCompleted } from '@nilfoundation/niljs';

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