export type WalletProvider = 'metamask' | 'coinbase' | 'demo';

export interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  displayAddress: string | null;
  chainId: number | null;
  error: string | null;
  provider: WalletProvider | null;
}

export interface EIP1193Provider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
}

declare global {
  interface Window {
    ethereum?: EIP1193Provider;
  }
}
