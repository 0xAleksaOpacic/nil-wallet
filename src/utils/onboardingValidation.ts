// Validates if the given shard ID is within the valid range
import { DEFAULT_SHARDS, RPC_REGEX } from '../config.ts';

export type ValidationResult = {
	error: string;
	isValid: boolean;
};

export const validateShardId = (shardId: number):ValidationResult  => {
	if (shardId >= 1 && shardId <= DEFAULT_SHARDS) {
		return { isValid: true, error: "" };
	}
	return { isValid: false, error: `Shard ID must be between 1 and ${DEFAULT_SHARDS}` };
};

// Validates if the provided wallet address is valid
export const validateWalletAddress = (walletAddress: string):ValidationResult => {
	const isValidLength = walletAddress.length === 42;
	const isHex = /^0x[a-fA-F0-9]{40}$/.test(walletAddress);
	const validPrefixes = Array.from({ length: DEFAULT_SHARDS }, (_, i) => `0x${(i + 1).toString().padStart(4, '0')}`);
	const hasValidPrefix = validPrefixes.some(prefix => walletAddress.startsWith(prefix));

	if (isValidLength && isHex && hasValidPrefix) {
		return { isValid: true, error: "" };
	}
	return { isValid: false, error: 'Invalid wallet address' };
};

// Validates if the provided private key is of valid ECDSA private key
export const validatePrivateKey = (privateKey: string):ValidationResult => {
	const isValidLength = privateKey.length === 64;
	const isHex = /^[0-9a-fA-F]+$/.test(privateKey);
	if (isHex && isValidLength) {
		return { isValid: true, error: "" };
	}
	return { isValid: false, error: 'Private Key must be a valid ECDSA private key' };
};

// Validates if the provided RPC endpoint matches the expected format
export const validateRpcEndpoint = (rpcEndpoint: string):ValidationResult => {
	if (RPC_REGEX.test(rpcEndpoint)) {
		return { isValid: true, error: "" };
	}
	return { isValid: false, error: 'Invalid RPC endpoint format' };
};

// Checks if the provided password and confirmation password match
export const validatePasswordsMatch = (password: string, confirmPassword: string):ValidationResult => {
	if (password === confirmPassword) {
		return { isValid: true, error: "" };
	}
	return { isValid: false, error: 'Passwords do not match' };
};
