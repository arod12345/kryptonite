import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";

import { contractABI, contractAdress } from "../utils/constants";

export const TransactionContext = createContext({
    
});

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAdress,
    contractABI,
    signer
  );

  console.log({
    provider,
    signer,
    transactionContract
  });
};

export const TransactionProvider = ({ childern }) => {
  <TransactionContext.Provider value={{}}>
    {childern}
  </TransactionContext.Provider>;
};
