import { faucet } from './api.js'
import wallets from './wallets.js'

export async function run() {
  const randomWallet = wallets[Math.floor(Math.random() * wallets.length)]
  const res = await faucet(randomWallet.address)
  console.log(new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }), randomWallet.address, res)
}
