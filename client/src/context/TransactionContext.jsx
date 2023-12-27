import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    console.log({
      provider,
      signer,
      transactionsContract
    });
  } else {
    console.log(
      "Ethereum is not available. Please install MetaMask or another Ethereum provider."
    );
  }
};

const dummyFunc = () => {
  console.log("first jkdjkdjk");
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    adressTo: "",
    amount: "",
    keyword: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const handleChange = (e, name) => {
    setFormData(prev => ({ ...prev, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please Install MetaMask!");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No authorized account found");
      }

      console.log(accounts);
    } catch (error) {
      console.log(error);
      throw new Error("NO ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please Install MetaMask!");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("NO ethereum object");
    }
  };

  // const sendTransaction = async () => {
  //   try {
  //     if (!ethereum) return alert("Please Install MetaMask!");

  //     // get Data from the form...
  //     const { adressTo, amount, keyword, message } = formData;
  //     const transactionContract = getEthereumContract();
  //     const parsedAmount = ethers.utils.parseEther(amount);

  //     await ethereum.request({
  //       method: "eth_sendTransaction",
  //       params: [
  //         {
  //           from: currentAccount,
  //           to: adressTo,
  //           gas: "0x5208",
  //           value: parsedAmount._hex
  //         }
  //       ]
  //     });

  //     const transactionHash = await transactionContract.addToBlockChain(
  //       adressTo,
  //       parsedAmount,
  //       message,
  //       keyword
  //     );

  //     setIsLoading(true);
  //     console.log(`Loading - ${transactionHash.hash}`);
  //     await transactionHash.wait();
  //     setIsLoading(false);
  //     console.log(`Success - ${transactionHash.hash}`);

  //     const transactionCount = await transactionContract.getTransactionCount();

  //     setTranactionCount(transactionCount.toNumber());
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("NO ethereum object");
  //   }
  // };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { adressTo, amount, keyword, message } = formData;
        const transactionsContract = getEthereumContract();
        const parsedAmount = ethers.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: adressTo,
              gas: "0x5208",
              value: parsedAmount
            }
          ]
        });

        const transactionHash = await transactionsContract.addToBlockchain(
          adressTo,
          parsedAmount,
          message,
          keyword
        );

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// export default TransactionContext;
