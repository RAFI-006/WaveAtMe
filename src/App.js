import { ethers } from "ethers";
import Navbar from './components/Navbar.js';
import MainPart from './components/Main.js';
import './App.css';
import React, { useEffect, useState } from "react";
import abi from "./util/WavePortal.json";
export default function App() {
 const [currentAccount, setCurrentAccount] = useState("");
const [allWaves, setAllWaves] = useState([]);
const contractAddress = 
  "0x48E136839bC15cEf43f567C36d972f7D6F251650";
  const contractABI = abi.abi;

    const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }
  
const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves = await wavePortalContract.getAllWaves();


        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let wavesCleaned = [];
        waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });

        /*
         * Store our data in React State
         */
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
        alert("Something Went Wrong , Please Try Again");
      console.log(error);
    }
  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask Extension!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  

//     useEffect(async() =>  {
//  if (window.ethereum)
//  {  
//      if(window.ethereum.networkVersion == 4)
//      {
      
//       getAllWaves();
//      }
//     else
//        alert("Change network to Rinkeby Test Network");

//        return () => {
//         console.log("This will be logged on unmount");
//       }
//  }
 
//     let wavePortalContract;

//     const onNewWave = (from, timestamp, message) => {
//       console.log('NewWave', from, timestamp, message);
//       setAllWaves((prevState) => [
//         ...prevState,
//         {
//           address: from,
//           timestamp: new Date(timestamp * 1000),
//           message: message,
//         },
//       ]);
//     };

//     if (window.ethereum) {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();

//       wavePortalContract = new ethers.Contract(
//         contractAddress,
//         contractABI,
//         signer
//       );
//       wavePortalContract.on('NewWave', onNewWave);
//     }

//     return () => {
//       if (wavePortalContract) {
//         wavePortalContract.off('NewWave', onNewWave);
//       }
//     };
//   }, []);


 const wave = async (message) => {
   if(message == "")
   {
     console.log(message);
     alert("Please enter message");
     return;
   }
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
         console.log("My Message", message)
        console.log("Retrieved total wave count...", count.toNumber());
      const waveTxn = await wavePortalContract.wave(message, {
          gasLimit: 300000,
        });
        console.log("Mining..." , waveTxn.hash);
        alert("Mining..." +  waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- { waveTxn.hash}");
        alert("Mined -- " + waveTxn.hash);
        
        // console.log("Contract Balance -- ", provider.getBalance);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
          alert("Ethereum object doesn't exist!");
      }
    } catch (error) {
      alert("Something Went Wrong , Please Try Again");
      console.log(error);
    }
}
  
  return (
    <div className="mainContainer">

        <Navbar account={currentAccount} connectWallet={connectWallet} />

            <MainPart sendWave={wave} />
      
  
      <div className="dataContainer">
      

       
  
    
  
         {allWaves.map((wave, index) => {
          return (
            <div  key={index} style={{ backgroundColor: "#f2f2f2", marginTop: "16px", padding: "8px" }}>
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}
      </div>
    </div>
  );
}
