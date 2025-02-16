import { Contract, Wallet, parseEther, ZeroAddress } from 'ethers'
import { getProvider } from './utils.js'
import wallets from './wallets.js'

const provider = getProvider()

const contract = new Contract('0x5F7CaE7D1eFC8cC05da97D988cFFC253ce3273eF', [
  {
    inputs: [
      { internalType: 'uint32', name: 'destinationNetwork', type: 'uint32' },
      { internalType: 'address', name: 'destinationAddress', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'bool', name: 'forceUpdateGlobalExitRoot', type: 'bool' },
      { internalType: 'bytes', name: 'permitData', type: 'bytes' },
    ],
    name: 'bridgeAsset',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
])

async function bridge(wallet) {
  try {
    const signer = new Wallet(wallet.privateKey, provider)
    const randomAmount = parseEther((Math.random() * 0.04 + 0.01).toFixed(2))
    const res = await contract.connect(signer).bridgeAsset(0, wallet.address, randomAmount, ZeroAddress, true, '0x', {
      value: randomAmount,
    })
    return res
  } catch (e) {
    return e.shortMessage
  }
}

export async function run() {
  const promises = wallets.map(async (wallet) => {
    const res = await bridge(wallet)
    console.log(new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }), wallet.address, res)
  })
  await Promise.all(promises)
}
