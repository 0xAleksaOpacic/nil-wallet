
// The number of shards in the =nil; blockchain, used for validation and other logic
const DEFAULT_SHARDS = 4;

// Regular expression to validate the structure of the RPC endpoint URL
// The format should be: https://api.devnet.nil.foundation/api/$NAME/$TOKEN
const RPC_REGEX = /^https:\/\/api\.devnet\.nil\.foundation\/api\/.+\/.+$/;

export { DEFAULT_SHARDS, RPC_REGEX };