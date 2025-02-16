import axios from 'axios'

export async function faucet(address) {
  try {
    const res = await axios.post('https://faucet.testnet.humanity.org/api/claim', {
      address,
    })
    return res.data
  } catch (e) {
    return e.response.data.msg
  }
}
