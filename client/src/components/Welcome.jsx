import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { TransactionContext } from "../context/TransactionContext";

import { Loader } from "./";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) =>
  <input
    type={type}
    placeholder={placeholder}
    step="0.0001"
    value={value}
    onChange={e => handleChange(e, name)}
    name={name}
    className="my-2 shadow-xl w-full rounded-sm p-2 outline-none bg-transparent text-white border-none"
  />;

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange
  } = useContext(TransactionContext);

  const handleSubmit = async e => {
    e.preventDefault();

    const { adressTo, amount, keyword, message } = formData;

    if (!adressTo || !amount || !keyword || !message) {
      // you can handle the error here by displaying an error message
      console.log("Please fill in all the required fields.");
      return;
    }

    try {
      await sendTransaction();
    } catch (error) {
      // handle the error here, for example, by displaying an error message
      console.log("Failed to send transaction.", error);
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world.buy and Sell crypto currencies in Krypto!
          </p>
          {!currentAccount &&
            <button
              className="flex text-white text-base font-semibold flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reailablity</div>
            <div className={`${commonStyles}`}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div className={`${commonStyles}`}>Low fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum size={21} color="#fff" />
                </div>
                <BsInfoCircle size={17} color="#fff" />
              </div>
              <div className="">
                <p className="text-white font-bold  text-sm">
                  {currentAccount.slice(0, 3)}...{currentAccount.slice(20, 40)}
                </p>
                <p className="text-white font-semibold text-lg">Ethereum</p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Adress to"
              type="text"
              name="adressTo"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              type="number"
              name="amount"
              handleChange={handleChange}
            />
            <Input
              placeholder="keyword (GIF)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {false
              ? <Loader />
              : <button
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursour-pointer"
                >
                  Send now
                </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
