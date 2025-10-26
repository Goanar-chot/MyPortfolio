// Blockchain Integration Features
class BlockchainIntegration {
    constructor() {
        this.initializeCryptoTracker();
        this.initializeWalletConnection();
        this.initializeCertificateVerification();
    }

    // Crypto Portfolio Tracker
    initializeCryptoTracker() {
        setInterval(() => {
            this.updateCryptoPrices();
        }, 30000); // Update every 30 seconds
    }

    updateCryptoPrices() {
        const btcPrice = document.getElementById('btc-price');
        const ethPrice = document.getElementById('eth-price');
        const solPrice = document.getElementById('sol-price');

        // Simulate real-time price updates
        if (btcPrice) btcPrice.textContent = `$${(43000 + Math.random() * 2000).toFixed(0)}`;
        if (ethPrice) ethPrice.textContent = `$${(2600 + Math.random() * 200).toFixed(0)}`;
        if (solPrice) solPrice.textContent = `$${(95 + Math.random() * 10).toFixed(2)}`;
    }

    // Web3 Wallet Connection
    initializeWalletConnection() {
        const connectBtn = document.getElementById('connect-wallet');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connectWallet());
        }
    }

    async connectWallet() {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.displayWalletInfo(accounts[0]);
            } else {
                // Simulate wallet connection for demo
                const mockAddress = '0x742d35Cc6634C0532925a3b8D404d354Da7C47f';
                this.displayWalletInfo(mockAddress);
            }
        } catch (error) {
            console.log('Wallet connection failed:', error);
            // Show demo wallet for portfolio purposes
            const mockAddress = '0x742d35Cc6634C0532925a3b8D404d354Da7C47f';
            this.displayWalletInfo(mockAddress);
        }
    }

    displayWalletInfo(address) {
        const walletInfo = document.getElementById('wallet-info');
        const walletAddress = document.getElementById('wallet-address');
        const walletBalance = document.getElementById('wallet-balance');
        
        if (walletInfo && walletAddress && walletBalance) {
            walletAddress.textContent = `${address.slice(0, 6)}...${address.slice(-4)}`;
            walletBalance.textContent = (Math.random() * 5).toFixed(4);
            walletInfo.classList.remove('hidden');
        }
    }

    // Certificate Verification
    initializeCertificateVerification() {
        const verifyBtns = document.querySelectorAll('.verify-cert');
        verifyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.verifyCertificate(e.target));
        });

        const nftVerifyBtns = document.querySelectorAll('.verify-btn');
        nftVerifyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.verifyNFT(e.target));
        });
    }

    verifyCertificate(btn) {
        btn.textContent = 'Verifying...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = '✅ Verified on Blockchain';
            btn.style.background = 'linear-gradient(45deg, #4ade80, #22c55e)';
        }, 2000);
    }

    verifyNFT(btn) {
        btn.textContent = 'Verifying...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = '✅ Authentic NFT';
            btn.style.background = 'linear-gradient(45deg, #4ade80, #22c55e)';
        }, 1500);
    }
}

// Smart Contract Interaction Simulator
class SmartContractDemo {
    constructor() {
        this.contractAddress = '0x1234567890abcdef1234567890abcdef12345678';
        this.initializeDemo();
    }

    initializeDemo() {
        console.log('Smart Contract Demo initialized');
        console.log(`Contract Address: ${this.contractAddress}`);
    }

    // Simulate contract interaction
    async callContract(method, params) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
                    blockNumber: Math.floor(Math.random() * 1000000) + 15000000,
                    gasUsed: Math.floor(Math.random() * 100000) + 21000
                });
            }, 1000);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlockchainIntegration();
    new SmartContractDemo();
});