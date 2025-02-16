import { JsonRpcProvider } from 'ethers'

export function getProvider() {
  return new JsonRpcProvider('https://rpc.testnet.humanity.org')
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function retry(fn, times = 0, delay = 0) {
  return (...args) =>
    new Promise((resolve, reject) => {
      const attempt = async () => {
        try {
          resolve(await fn(...args))
        } catch (err) {
          console.log(err)
          if (times-- <= 0) {
            reject(err)
          } else {
            setTimeout(attempt, delay)
          }
        }
      }
      attempt()
    })
}
