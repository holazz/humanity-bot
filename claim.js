import { Contract, Wallet } from 'ethers'
import { getProvider } from './utils.js'
import wallets from './wallets.js'

const provider = getProvider()

const contract = new Contract('0xa18f6fcb2fd4884436d10610e69db7bfa1bfe8c7', [
  {
    inputs: [],
    name: 'claimReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
])

async function claim(wallet) {
  try {
    const signer = new Wallet(wallet.privateKey, provider)
    const res = await contract.connect(signer).claimReward()
    return res
  } catch (e) {
    return e.shortMessage
  }
}

export async function run() {
  const promises = wallets.map(async (wallet) => {
    const res = await claim(wallet)
    console.log(new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }), wallet.address, res)
  })
  await Promise.all(promises)
}
