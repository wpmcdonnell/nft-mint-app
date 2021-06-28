import React, { Component } from "react";
import MyNFT from "./contracts/MyNFT.json";
// import getWeb3 from "./getWeb3";
import Web3 from 'web3';
import ipfs from './ipfs'

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)

  this.state = {
    ipfsHash: '',
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null
  };
  this.captureFile = this.captureFile.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  this.mintNft = this.mintNft.bind(this);

    }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      // const web3 = await getWeb3();
      const web3 = new Web3(window.ethereum)

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MyNFT.networks[networkId];
      const instance = new web3.eth.Contract(
        MyNFT.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // console.log(deployedNetwork)


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
      // const response = await this.state.contract.methods.get().call();
      // console.log(response)


      // this.setState({ ipfsHash: response})

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;
  //
  //   // Stores a given value, 5 by default.
  //   await contract.methods.set('5').send({ from: accounts[0] });
  //
  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();
  //
  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  //   console.log(response)
  // };

  captureFile(event) {
    event.preventDefault()
    const file  = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

onSubmit(event) {
    event.preventDefault()
    console.log(this.state.contract)
    ipfs.files.add(this.state.buffer, async (error, result) => {
      if (error) {
        console.error(error)
        return
      }
      await this.state.contract.methods._safemint(this.state.accounts[0], ).send({ from: this.state.accounts[0] });
      const response = await this.state.contract.methods.get().call();


      this.setState({ ipfsHash: result[0].hash, storageValue: response })
    })
}

mintNft = async () => {
  // Successfully calls mint function -- need to change Token ID value to a counter in contract
  // const nft = await this.state.contract.methods.pressMintButton(13).send({ from: this.state.accounts[0] })
    // this gets the call of the balance of your NFT tokens, must instantiate contract first
    const monkey = await this.state.contract.methods.ownerOf(12).call();
    console.log(monkey)

}


  render() {
    console.log(this.state.contract)
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
      <nav className='navbar pure-menu pure-menu-horizontal'>
        IPFS File Upload DApp
      </nav>
        <h1>Image</h1>
        <p>Image stored on IPFS and Ethereum Blockchain</p>
        <h2>Smart Contract Example</h2>
        <button  onClick={this.mintNft}>Mint NFT Test</button>
        {this.state.ipfsHash === '' ? '' : <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=''/> }
        <h2>Upload Image</h2>
        <form onSubmit={this.onSubmit}>
          <input type='file' onChange={this.captureFile} />
          <input type='submit' />
        </form>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
