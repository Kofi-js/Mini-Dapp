import { useState } from 'react';
import { ethers } from 'ethers';
import abi from './abi.json';

function App() {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const contractAddress = '0x77D2d583518bd593AC3193198661b73a59255Ab6';
  const contractABI = abi;

  // Request Wallet Connection
  async function requestAccounts() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      console.log("Failed to connect wallet", err);
    }
  }

  // To Deposit
  async function handleDeposit() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccounts(); // Ensure wallet is connected

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const tx = await contract.deposit(ethers.parseEther(depositAmount));
        await tx.wait(); // Wait for confirmation
        console.log("Deposit successful");
      } catch (err) {
        console.log("Deposit Failed", err);
      }
    } else {
      console.log("MetaMask is not installed.");
    }
  }

  // To Withdraw
  async function handleWithdraw() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccounts(); // Ensure wallet is connected

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const tx = await contract.withdraw(ethers.parseEther(withdrawAmount));
        await tx.wait(); // Wait for confirmation
        console.log("Withdrawal successful");
      } catch (err) {
        console.log("Withdrawal Failed", err);
      }
    } else {
      console.log("MetaMask is not installed.");
    }
  }

  return (
    <>
      <h1>Mini Dapp</h1>
      <input
        type="text"
        placeholder="Deposit Amount"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit</button>
      <input
        type="text"
        placeholder="Withdraw Amount"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
      />
      <button onClick={handleWithdraw}>Withdraw</button>
    </>
  );
}

export default App;