import Web3 from 'web3'
import MulticallAbi from '../contracts/MulticallAbi.json'
import { networks } from '../constants/networksInfo'
import { Interface as AbiInterface } from '@ethersproject/abi'

import ERC20 from "../contracts/ERC20.json"
import IDOPool from "../contracts/IDOPool.json"
import IDOPoolERC20 from "../contracts/IDOERC20Pool.json"

import BigNumber from "bignumber.js"

const processValue = (val) => {
  if (val && val._isBigNumber) val = val.toString()

  if (val instanceof Array) {
    const newVal = {}
    Object.keys(val).forEach((valKey) => {
      newVal[valKey] = val[valKey]
      if (val[valKey] && val[valKey]._isBigNumber) newVal[valKey] = val[valKey].toString()
      if (val[valKey] instanceof Array) {
        newVal[valKey] = processValue(val[valKey])
      }
    })
    return newVal
  }
  return val
}

const PromiseChunksCall = (options) => {
  const {
    args,
    chunkSize,
    func,
    onFetching,
    chunkDelay,
    onErrorDelay,
    onErrorRetry,
  } = {
    onErrorDelay: 100,
    onErrorRetry: 1,
    chunkSize: 100,
    chunkDelay: 100,
    onFetching: (cursorPos, total) => {},
    ...options
  }
  
  const delay = (timeout) => {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve()
      }, timeout)
    })
  }

  return new Promise(async (resolve, reject) => {
    const ret = []
    for (let i = 0; i < args.length; i += chunkSize) {
      const _processChunk = async () => {
        const chunk = args.slice(i, i + chunkSize);
        const chunkResult = await func(chunk, i)
        ret.push(...chunkResult)
        onFetching(i, args.length)
        await delay(chunkDelay)
      }
      try {
        await _processChunk()
      } catch (err) {
        let skip = false
        for (let retryCount = 0; retryCount < onErrorRetry; retryCount++) {
          try {
            await delay(onErrorDelay)
            await _processChunk()
            skip = true
            break;
          } catch (err) {}
        }
        if (!skip) {
          reject(err)
          break;
        }
      }
    }
    resolve(ret)
  })
}

export const callMulticall = (options) => {
  const {
    multicall,
    target,
    encoder,
    calls,
    chunkSize,
    onFetching,
  } = {
    chunkSize: 500,
    onFetching: (cursorPos, total) => {},
    ...options
  }

  return new Promise((resolve, reject) => {
    const ret = {}
    const mcCallToValue = []
    const mcCalls = Object.keys(calls).map((targetKey) => {
      const {
        func,
        args,
        encoder: ownEncoder,
        target: ownTarget,
      } = calls[targetKey]
      mcCallToValue.push(targetKey)
      const usedEncoder = ownEncoder || encoder
      return {
        target: (ownTarget || target),
        callData: usedEncoder.encodeFunctionData(func, args)
      }
    })
    PromiseChunksCall({
      args: mcCalls,
      chunkSize,
      onFetching,
      func: async (chunk) => {
        return await multicall.methods.tryAggregate(false, chunk).call()
      },
    }).then((answers) => {
      answers.forEach((retData, index) => {
        if (retData.success) {
          const ownEncoder = calls[mcCallToValue[index]].encoder
          
          let val = (ownEncoder || encoder).decodeFunctionResult(
            calls[mcCallToValue[index]].func,
            retData.returnData
          )
          val = (val.length == 1) ? val[0] : val
          val = processValue(val)

          ret[mcCallToValue[index]] = val
        } else {
          ret[mcCallToValue[index]] = calls[mcCallToValue[index]].default || false
        }
      })
      resolve(ret)
    }).catch((err) => {
      reject(err)
    })
  })
}

const getMulticall = (chainId) => {
  const { rpc, multicall } = networks[chainId]
  const web3 = new Web3(rpc)
  const contract = new web3.eth.Contract(MulticallAbi, multicall)
  return {
    contract,
    address: multicall,
    encoder: new AbiInterface(MulticallAbi)
  }
}

export const loadPoolInfoByMC = ({
  chainId, 
  idoAddress,
  account
}) => {
  return new Promise((resolve, reject) => {
    try {
      const mcData = getMulticall(chainId)

      const { abi: nativePoolAbi } = IDOPool
      const { abi: erc20PoolAbi } = IDOPoolERC20
      
      const encoderNative = new AbiInterface(nativePoolAbi)
      const encoderErc20 = new AbiInterface(erc20PoolAbi)
      const encoderToken = new AbiInterface(ERC20.abi)
      
      callMulticall({
        multicall: mcData.contract,
        target: idoAddress,
        encoder: encoderNative,
        calls: {
          poolType: { func: 'contractType' },
          owner: { func: 'owner' },
          tokenAddress: { func: 'rewardToken' },
          payTokenAddress: { func: 'payToken', encoder: encoderErc20 },
          metadataURL: { func: 'metadataURL' },
          unsold: { func: 'getNotSoldToken' },
          timestamps: { func: 'timestamps' },
          dexInfo: { func: 'dexInfo' },
          totalInvestedETH: { func: 'totalInvestedETH' },
          totalInvestedERC: { func: 'totalInvested', encoder: encoderErc20 },
          finInfo: { func: 'finInfo' },
          allowRefund: { func: 'allowRefund', encoder: encoderErc20, default: -1 },
          allowSoftWithdraw: { func: 'allowSoftWithdraw', encoder: encoderErc20, default: -1 },
          balance: { func: 'getEthBalance', args: [ idoAddress ], target: mcData.address, encoder: mcData.encoder },
          ...((account) ? {
            userData: { func: 'userInfo', args: [ account ] }
          } : {}),
        }
      }).then((mcAnswer) => {
        const { payTokenAddress } = mcAnswer
        // tokensInfo
        callMulticall({
          multicall: mcData.contract,
          target: mcAnswer.tokenAddress,
          encoder: encoderToken,
          calls: {
            tokenName: { func: 'name' },
            tokenSymbol: { func: 'symbol' },
            tokenDecimals: { func: 'decimals' },
            totalSupply: { func: 'totalSupply' },
            ...((payTokenAddress) ? {
              payTokenName: { func: 'name', target: payTokenAddress },
              payTokenSymbol: { func: 'symbol', target: payTokenAddress },
              payTokenDecimals: { func: 'decimals', target: payTokenAddress },
              payTokenBalance: { func: 'balanceOf', args: [idoAddress], target: payTokenAddress },
              ...((account) ? {
                payAllowance: { func: 'allowance', args: [account, idoAddress], target: payTokenAddress }
              } : {})
            } : {})
          }
        }).then((tokensInfo) => {
          const {
            timestamps: {
              startTimestamp,
              endTimestamp,
              unlockTimestamp,
            },
            finInfo: {
              tokenPrice,
              hardCap,
              softCap,
              minEthPayment,
              maxEthPayment,
              listingPrice,
              lpInterestRate,
            },
            totalInvestedETH,
            totalInvestedERC
          } = mcAnswer

          const progress = parseFloat(
            BigNumber(totalInvestedETH || totalInvestedERC)
              .times(100)
              .dividedBy(BigNumber(hardCap))
          );
          let poolData = {
            ...mcAnswer,
            ...tokensInfo,
            idoType: (mcAnswer.poolType == "2") ? 'ERC20' : 'NATIVE',
            idoAddress,
            tokenRate: tokenPrice,
            listingRate: listingPrice,
            lpPercentage: lpInterestRate,
            start: startTimestamp,
            end: endTimestamp,
            claim: unlockTimestamp,
            min: minEthPayment,
            max: maxEthPayment,
            softCap: softCap,
            hardCap: hardCap,
            totalInvestedETH: totalInvestedETH ||totalInvestedERC,
            progress: progress,
            
            dexInfo: (mcAnswer.dexInfo || {}),
            userData: (mcAnswer.userData || {}),
          }
          if (mcAnswer.poolType == "2") {
            poolData = {
              ...poolData,
              balance: tokensInfo.payTokenBalance,
              payToken: {
                address: payTokenAddress,
                symbol: tokensInfo.payTokenSymbol,
                name: tokensInfo.payTokenName,
                decimals: tokensInfo.payTokenDecimals,
                allowance: tokensInfo.payAllowance,
              }
            }
          }
          resolve(poolData)
        }).catch((err) => {
          console.log('fail fetch tokens info', err)
        })
      }).catch((err) => {
        console.log('>>> Fail fetch pool info', err)
        
      })
    } catch (err) {
      console.log('>>> loadPoolInfoByMC err', err)
    }
  })
  
}