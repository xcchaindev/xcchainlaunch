import TokenLockerFactory from '../contracts/TokenLockerFactory.json';
import IDOFactory from '../contracts/IDOFactory.json';
import IDOFactoryV2 from '../contracts/IDOFactoryV2.json'
import ERC20 from '../contracts/ERC20.json'
import { getWeb3Library } from './getLibrary'
import { networks } from '../constants/networksInfo'

export const callTokenLockerFactoryContract = (options) => {
  const {
    library,
    account,
    address,
    method,
    params,
    onHash,
    onReceipt,
  } = options

  try {
    const contract = getContractInstance(library.web3, address, TokenLockerFactory.abi)
    return new Promise(async (resolve, reject) => {
      contract.methods[method](...params)
        .send({ from: account })
        .on('transactionHash', (hash) => {
          if (typeof onHash === 'function') onHash(hash)
        })
        .on('receipt', (receipt) => {
          if (typeof onReceipt === 'function') onReceipt(receipt, receipt?.status)
        })
        .then(resolve)
        .catch(reject)
    });
  } catch (error) {
    throw error
  }
}

export const callIDOFactoryContract = (options) => {
  const {
    library,
    account,
    address,
    method,
    params,
    onHash,
    onReceipt,
  } = options

  try {
    const contract = getContractInstance(library.web3, address, IDOFactoryV2.abi)
    return new Promise(async (resolve, reject) => {
      contract.methods[method](...params)
        .send({ from: account })
        .on('transactionHash', (hash) => {
          if (typeof onHash === 'function') onHash(hash)
        })
        .on('receipt', (receipt) => {
          if (typeof onReceipt === 'function') onReceipt(receipt, receipt?.status)
        })
        .then(resolve)
        .catch(reject)
    });
  } catch (error) {
    throw error
  }
}


export const fetchLockerFactoryInfo = (chainId, address) => {
  return new Promise(async (resolve, reject) => {
    const web3 = getWeb3Library(networks[chainId].rpc)
    const contract = getContractInstance(web3, address, TokenLockerFactory.abi)
    
    const owner = await contract.methods.owner().call()
    const feeAmount = await contract.methods.fee().call()
    
    let onlyOwnerCreate = false
    try {
      onlyOwnerCreate = await contract.methods.onlyOwnerCreate().call()
    } catch (e) {
      /* v 1.0 - no only admin */
    }

    const lockerInfo = {
      owner,
      feeAmount,
      onlyOwnerCreate
    }
    resolve(lockerInfo)
  })
}

export const fetchIDOFactoryInfo = (chainId, address) => {
  return new Promise(async (resolve, reject) => {
    const web3 = getWeb3Library(networks[chainId].rpc)
    const contract = getContractInstance(web3, address, IDOFactoryV2.abi)
    
    const owner = await contract.methods.owner().call()
    const onlyOwnerCreate = await contract.methods.onlyOwnerCreate().call()
    const feeWallet = await contract.methods.feeWallet().call()
    const feeAmount = await contract.methods.feeAmount().call()
    const feeToken = await contract.methods.feeToken().call()
    
    const feeTokenContract = getContractInstance(web3, feeToken, ERC20.abi)
    
    const feeTokenSymbol = await feeTokenContract.methods.symbol().call()
    const feeTokenDecimals = await feeTokenContract.methods.decimals().call()
    
    const idoInfo = {
      owner,
      feeWallet,
      feeAmount,
      feeToken,
      feeTokenDecimals,
      feeTokenSymbol,
      onlyOwnerCreate,
    }
    resolve(idoInfo)
  })
}


export const getContractInstance = (web3, address, abi) => {
  return new web3.eth.Contract(abi, address)
}

const deployContract = async (params) => {
  const { abi, byteCode, library, onDeploy = () => {}, onHash = () => {}, deployArguments } = params;

  let contract;
  let accounts;

  try {
    const { web3 } = library;

    contract = new web3.eth.Contract(abi);

    accounts = await window.ethereum.request({ method: 'eth_accounts' });

    const transaction = contract.deploy({
      data: byteCode,
      arguments: deployArguments,
    });

    const gasLimit = await transaction.estimateGas({ from: accounts[0] });
    const gasPrice = await web3.eth.getGasPrice();

    return await transaction
      .send({
        from: accounts[0],
        gas: gasLimit,
        gasPrice,
      })
      .on('transactionHash', (hash) => onHash(hash))
      .on('receipt', (receipt) => onDeploy(receipt))
      .on('error', (error) => console.error(error));
  } catch (error) {
    throw error;
  }
}

export const deployIDOFactory = async ({ library, onHash, FeeTokenAddress }) => {
  const { abi, data: { bytecode: { object: bytecode } } } = IDOFactoryV2;

  return deployContract({
    abi,
    byteCode: bytecode,
    deployArguments: [FeeTokenAddress, "0", "0"],
    library,
    onHash,
  });
}

export const deployLockerFactory = async ({ library, onHash, idoFactory }) => {
  const { abi, data: { bytecode: { object: bytecode } } } = TokenLockerFactory;
console.log('>> deploy locker', bytecode, idoFactory)
  return deployContract({
    abi,
    byteCode: bytecode,
    deployArguments: [idoFactory],
    library,
    onHash,
  });
}

export const deployLaunchpadContracts = async ({
  chainId,
  library,
  FeeTokenAddress,
  onIDOFactoryHash,
  onLockerFactoryHash,
  onSuccessfulDeploy
}) => {

  try {
    const IDOFactory = await deployIDOFactory({
      onHash: onIDOFactoryHash,
      library,
      FeeTokenAddress,
    });

    const LockerFactory = await deployLockerFactory({
      onHash: onLockerFactoryHash,
      library,
      idoFactory: IDOFactory.options.address,
    });

    if (typeof onSuccessfulDeploy === 'function') {
      onSuccessfulDeploy({
        chainId,
        FeeTokenAddress,
        IDOFactoryAddress: IDOFactory.options.address,
        TokenLockerFactoryAddress: LockerFactory.options.address,
      });
    }

  } catch (error) {
    throw error;
  }
}

export const getDeployedLaunchpadContracts = () => JSON.parse(localStorage.getItem("deployedLaunchpadContracts")) || null;

export const setDeployedLaunchpadContracts = ({ chainId, FeeTokenAddress, IDOFactoryAddress, TokenLockerFactoryAddress }) => {

  const deployedLaunchpadContracts = getDeployedLaunchpadContracts();

  localStorage.setItem("deployedLaunchpadContracts", JSON.stringify({
    ...deployedLaunchpadContracts,
    [chainId]: {
      FeeTokenAddress,
      IDOFactoryAddress,
      TokenLockerFactoryAddress
    }
  }));
}

export const removeDeployedLaunchpadContracts = (chainId) => {
  const deployedLaunchpadContracts = getDeployedLaunchpadContracts();

  localStorage.setItem("deployedLaunchpadContracts", JSON.stringify({
    ...deployedLaunchpadContracts,
    [chainId]: null
  }));
}
