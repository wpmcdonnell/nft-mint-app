import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
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
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
    // await console.log(instance.methods.get())

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);


    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set('5').send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

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
    ipfs.files.add(this.state.buffer, (error, result) => {
      if (error) {
        console.error(error)
        return
      }
      this.state.contract.methods.set(result[0].hash).send({ from: this.state.accounts[0] })
        .then((r) => {
        // Get value from contract
          return this.setState({ ipfsHash: result[0].hash })
        })
        .then(() => {
          console.log(this.state.ipfsHash)
          const response = this.state.contract.methods.get().call();
          this.setState({ storageValue: response.toString() });
        })
  })
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
