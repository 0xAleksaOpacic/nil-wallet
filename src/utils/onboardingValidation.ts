const DEFAULT_SHARDS = 5;

// Validates if the given shard ID is within the valid range
export const validateShardId = (shardId: number): boolean => {
	return shardId >= 1 && shardId <= DEFAULT_SHARDS;
};

// Validates if the provided wallet address is valid address
export const validateWalletAddress = (walletAddress: string): boolean => {
	const isValidLength = walletAddress.length === 42;
	const isHex = /^0x[a-fA-F0-9]{40}$/.test(walletAddress);
	const validPrefixes = Array.from({ length: DEFAULT_SHARDS }, (_, i) => `0x${(i + 1).toString().padStart(4, '0')}`);
	const hasValidPrefix = validPrefixes.some(prefix => walletAddress.startsWith(prefix));

	console.log(validPrefixes)
	return isValidLength && isHex && hasValidPrefix;
};

// Validates if the provided private key is of valid ECDSA private Key
export const validatePrivateKey = (privateKey: string): boolean => {
	const isValidLength =  privateKey.length === 64;
	const isHex = /^[0-9a-fA-F]+$/.test(privateKey);
	return isHex && isValidLength;
};

// Validates if the provided RPC endpoint matches the expected format
// The format should be: https://api.devnet.nil.foundation/api/$NAME/$TOKEN
export const validateRpcEndpoint = (rpcEndpoint: string): boolean => {
	const regex = /^https:\/\/api\.devnet\.nil\.foundation\/api\/.+\/.+$/;
	return regex.test(rpcEndpoint);
};

// Checks if the provided password and confirmation password match
export const validatePasswordsMatch = (password: string, confirmPassword: string): boolean => {
	return password === confirmPassword;
};
