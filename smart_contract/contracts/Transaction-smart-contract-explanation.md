 ## Transactions: A Simple Blockchain Application

This is a simple blockchain application that allows users to send transactions to each other. The application is built using Solidity, a programming language specifically designed for writing smart contracts.

### Getting Started

To get started, you will need to install the following dependencies:

* Node.js
* npm
* Truffle

Once you have installed the dependencies, you can clone the repository and run the following commands:

```
$ npm install
$ truffle compile
$ truffle migrate
```

This will compile the smart contract and deploy it to the blockchain.

### Using the Application

To use the application, you will need to create a web3 instance. You can do this by using the following code:

```
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
```

Once you have created a web3 instance, you can interact with the smart contract by using the following methods:

* `addToBlockChain(receiver, amount, message, keyword)`: This method allows you to send a transaction to another user. The `receiver` parameter is the address of the recipient, the `amount` parameter is the amount of the transaction, the `message` parameter is a message that will be included in the transaction, and the `keyword` parameter is a keyword that will be associated with the transaction.
* `getAllTransaction()`: This method allows you to get all of the transactions that have been sent.
* `getTransactionCount()`: This method allows you to get the number of transactions that have been sent.

### Code Explanation

The following is a step-by-step explanation of the code:

1. The `Transactions` contract is defined. This contract contains the logic for sending transactions.
2. The `transactionCount` variable is defined. This variable keeps track of the number of transactions that have been sent.
3. The `Transfer` event is defined. This event is emitted when a transaction is sent.
4. The `TransferStruct` struct is defined. This struct stores the information about a transaction.
5. The `transactions` array is defined. This array stores all of the transactions that have been sent.
6. The `addToBlockChain()` function is defined. This function allows you to send a transaction to another user.
7. The `getAllTransaction()` function is defined. This function allows you to get all of the transactions that
