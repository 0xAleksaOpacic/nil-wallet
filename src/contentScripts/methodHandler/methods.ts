export enum ExtensionMethods {
  eth_sendTransaction = 'eth_sendTransaction',
}

export function isExtensionMethod(method: string): boolean {
  return Object.keys(ExtensionMethods).includes(method)
}