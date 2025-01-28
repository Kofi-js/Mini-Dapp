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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md space-y-6">
      <h1 className='text-3xl font-bold text-center text-white mb-8'>Mini Dapp</h1>
      <div className='spave-y-4'>
        <div className='space-y-2'>
        <input
        type="text"
        placeholder="Deposit Amount"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        className='w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 placeholder-gray-400'
      />
        <button onClick={handleDeposit} className='w-full px-4 py-2 bg-green-500 text-white font-medium rounded-md  hover:bg-green-600 duration-200 ease-in-out'>Deposit</button>
      </div>
      <div className='space-y-2'>   
        <input
        type="text"
        placeholder="Withdraw Amount"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        className='w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md border border-gray-600 placeholder-gray-400'/>
        <button onClick={handleWithdraw} className='w-full px-4 py-2 bg-red-500  text-white font-medium rounded-md hover:bg-red-600 duration-200 ease-in-out'>Withdraw</button>
      </div>
      </div>
      </div>
    </div>
  );
}

export default App;