//https://eth-sepolia.g.alchemy.com/v2/W27iQks2RBTIq6OBUWSSI4SUdUObrtsj
require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url:
        "https://eth-sepolia.g.alchemy.com/v2/W27iQks2RBTIq6OBUWSSI4SUdUObrtsj",
      accounts: [
        "bc31e53ed33bd4037e66602fb06070a0f9eda78ddec6285864bf745b04530cf2"
      ]
    }
  }
};
