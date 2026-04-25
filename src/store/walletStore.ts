import { create } from 'zustand';
import type { WalletState, WalletProvider, EIP1193Provider } from '../types/wallet';

interface WalletStore extends WalletState {
  connect: (provider: WalletProvider) => Promise<void>;
  disconnect: () => void;
  clearError: () => void;
}

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function generateDemoAddress(): string {
  const chars = '0123456789abcdef';
  let addr = '0x';
  for (let i = 0; i < 40; i++) {
    addr += chars[Math.floor(Math.random() * chars.length)];
  }
  return addr;
}

async function connectEIP1193(ethereum: EIP1193Provider): Promise<string> {
  const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[];
  if (!accounts || accounts.length === 0) throw new Error('No accounts returned');
  return accounts[0];
}

export const useWalletStore = create<WalletStore>((set) => ({
  isConnected: false,
  isConnecting: false,
  address: null,
  displayAddress: null,
  chainId: null,
  error: null,
  provider: null,

  connect: async (provider: WalletProvider) => {
    set({ isConnecting: true, error: null });

    try {
      if (provider === 'demo') {
        // Simulate a short connection delay
        await new Promise(r => setTimeout(r, 900));
        const address = generateDemoAddress();
        set({
          isConnected: true,
          isConnecting: false,
          address,
          displayAddress: truncateAddress(address),
          chainId: 1,
          provider: 'demo',
          error: null,
        });
        return;
      }

      if (!window.ethereum) {
        throw new Error('No Web3 wallet detected. Install MetaMask or use Demo mode.');
      }

      const ethereum = window.ethereum;

      if (provider === 'metamask' && !ethereum.isMetaMask) {
        throw new Error('MetaMask not detected. Please install MetaMask.');
      }

      if (provider === 'coinbase' && !ethereum.isCoinbaseWallet) {
        throw new Error('Coinbase Wallet not detected.');
      }

      const address = await connectEIP1193(ethereum);
      const chainIdHex = (await ethereum.request({ method: 'eth_chainId' })) as string;
      const chainId = parseInt(chainIdHex, 16);

      // Listen for account/chain changes
      const handleAccountsChanged = (accounts: unknown) => {
        const accs = accounts as string[];
        if (!accs || accs.length === 0) {
          useWalletStore.getState().disconnect();
        } else {
          set({
            address: accs[0],
            displayAddress: truncateAddress(accs[0]),
          });
        }
      };

      const handleChainChanged = (chainIdHex: unknown) => {
        set({ chainId: parseInt(chainIdHex as string, 16) });
      };

      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);

      set({
        isConnected: true,
        isConnecting: false,
        address,
        displayAddress: truncateAddress(address),
        chainId,
        provider,
        error: null,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Connection failed';
      set({ isConnecting: false, error: message });
    }
  },

  disconnect: () => {
    set({
      isConnected: false,
      isConnecting: false,
      address: null,
      displayAddress: null,
      chainId: null,
      provider: null,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
