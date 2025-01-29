import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './abi.json';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  // const notify = () => toast("Wow so easy!");
  const notify = (message) => {
    toast(message);
  }
  const [isConnected, setIsConnected] = useState(false);
  const contractAddress = '0x77D2d583518bd593AC3193198661b73a59255Ab6';

// Request Wallet Connection
async function requestAccounts() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}

// Wallet connect button
async function handleConnectWallet() {
  if(typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' }); 
      setIsConnected(true)
      const message1 = "Wallet Connected";
      notify(message1);
    } catch (error) {
      const message2 = "Wallet Connection Failed";
      notify(message2);
    }
  } else { 
    const message2 = "MetaMask is not installed.";
    notify(message2);
  }
}

  // To Deposit
  async function handleDeposit() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccounts(); // Ensure wallet is connected
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const tx = await contract.deposit(ethers.parseEther(depositAmount));
        await tx.wait(); // Wait for confirmation
        const message2 = "Deposit successful";
        notify(message2);
      } catch (err) {
        const message3 = "Deposit Failed";
        notify(message3, err);
      }
    }   else {
        const message4 = "MetaMask is not installed.";
        notify(message4);
  }}

  // To Withdraw
  async function handleWithdraw() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccounts(); // Ensure wallet is connected

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const tx = await contract.withdraw(ethers.parseEther(withdrawAmount));
        await tx.wait(); // Wait for confirmation
        const message5 = "Withdrawal successful";
        notify(message5);
     } catch (err) {
       const message6 = "Withdrawal Failed";
       notify(message6, err);
     }
   } else {
      const message7 = "MetaMask is not installed.";
      notify(message7);
  }}

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md space-y-6">
      <h1 className='text-3xl font-bold text-center text-white mb-8'>Mini Dapp</h1>
      <button onClick={handleConnectWallet} className='w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors duration-200 ease-in-out mb-4'>{isConnected ? "Wallet Connected" : "Connect Wallet"}</button>
      <div className='spave-y-4'>

        <div className='space-y-2'>
        <input
        type="text"
        placeholder="Deposit Amount"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        className='w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 placeholder-gray-400'/>
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
      <ToastContainer/>
      </div>
      </div>
    </div>
  );
}

export default App;