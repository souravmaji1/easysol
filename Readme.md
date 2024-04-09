
# EasySol

Simple and Easy to use Web3 SDK 


## Documentation

Steps to Call Write Smart Contract Function in your Frontend:

1) Initialize The SDK:

const solSDK = new EasySol();




2) Call the function:

const writeFunctionTest = async () => {
    try {
     
      solSDK.connectWallet();

      solSDK.setContract(contractAddress, contractABI);

      // Call the write function (without value or arguments)
      const transactionHash = await solSDK.callWriteFunction('mint',undefined, [connectedAddress,"1000000"]);
      console.log('Write Transaction Hash:', transactionHash);
    } catch (error) {
      setSdkError(error.message);
    }
  };


## Usage/Examples

```javascript
// YourNextJSComponent.js
import { useState } from 'react';
import EasySol from 'EasySol';

const YourNextJSComponent = () => {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [sdkError, setSdkError] = useState(null);
  const [smartContractSource, setSmartContractSource] = useState('');
  const [contractAddress, setContractAddress] = useState('');

  const solSDK = new EasySol();

  const connectWallet = async () => {
    try {
      const address = await solSDK.connectWallet();
      setConnectedAddress(address);
    } catch (error) {
      setSdkError(error.message);
    }
  };

  const deployContract = async () => {
    try {
      
      // Deploy the smart contract using your SDK
      const deployedContractAddress = await solSDK.deploySmartContract(smartContractSource);

      setContractAddress(deployedContractAddress);
    } catch (error) {
      setSdkError(error.message);
    }
  };

  const writeFunctionTest = async () => {
    try {
      // Set the contract details in the SDK
      solSDK.connectWallet();


      const contractAddress = "0x921a4B906EF4Da0951ec91A15789A9Ff59144238";
      const contractABI = [
        {
          "type": "function",
          "name": "mint",
          "inputs": [
            {
              "type": "address",
              "name": "to",
              "internalType": "address"
            },
            {
              "type": "uint256",
              "name": "amount",
              "internalType": "uint256"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        }
      ];


      solSDK.setContract(contractAddress, contractABI);

      // Call the write function (without value or arguments)
      const transactionHash = await solSDK.callWriteFunction('mint',undefined, [connectedAddress,"1000000"]);
      console.log('Write Transaction Hash:', transactionHash);
    } catch (error) {
      setSdkError(error.message);
    }
  };


  return (
    <div>
      <h1>Your Next.js Component</h1>
      <button onClick={connectWallet}>Connect wallet</button>
      <br />
      {connectedAddress && <p>Connected Address: {connectedAddress}</p>}

      <div style={{ marginTop: '1.5rem' }}>
        <label>
          Enter Smart Contract Source Code:
          <textarea
            rows="8"
            value={smartContractSource}
            onChange={(e) => setSmartContractSource(e.target.value)}
            placeholder="Enter your smart contract source code here..."
            style={{
              width: '100%',
              background: 'white',
              border: '2px solid #ccc',
              color: 'black',
              borderRadius: '4px',
              padding: '8px',
              marginTop: '8px',
            }}
          />
        </label>
      </div>

      <button onClick={deployContract}>
        Deploy Contract
      </button>
<br></br>
      <button onClick={writeFunctionTest}>
        Write contract
      </button>

      {contractAddress && (
        <div style={{ marginTop: '1rem' }}>
          <p>Contract Address: {contractAddress}</p>
        </div>
      )}

      {sdkError && <p>Error: {sdkError}</p>}
    </div>
  );
};

export default YourNextJSComponent;


```

