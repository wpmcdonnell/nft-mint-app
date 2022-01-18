const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = "1bc7c10da88c4d76a69ec0c4766dac47";

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  //contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
    provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`),
    network_id: 3,       // Ropsten's id
    gas: 5500000,        // Ropsten has a lower block limit than mainnet
    confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rpc-mainnet.maticvigil.com/v1/c138d9b47b5ebcb98892bf6fd82d7473e0b73557'),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true   // Skip dry run before migrations? (default: false for public nets )
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com/v1/c138d9b47b5ebcb98892bf6fd82d7473e0b73557`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true   // Skip dry run before migrations? (default: false for public nets )
    },

  },
  compilers: {
    solc: {
      version: "0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
