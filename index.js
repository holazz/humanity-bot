import { CronJob } from 'cron'
import { run as faucet } from './faucet.js'
import { run as claim } from './claim.js'
import { run as bridge } from './bridge.js'

// CronJob.from({
//   // 每 2 分钟执行一次
//   cronTime: '0 */2 * * * *',
//   async onTick() {
//     try {
//       await faucet()
//     } catch {}
//   },
//   start: true,
//   timeZone: 'Asia/Shanghai',
// })

CronJob.from({
  // 每 10 分钟执行一次
  cronTime: '0 */10 * * * *', 
  async onTick() {
    try {
      await claim()
    } catch {}
  },
  start: true,
  timeZone: 'Asia/Shanghai',
})

CronJob.from({
  // 每 6 小时执行一次
  cronTime: '0 0 */6 * * *',
  async onTick() {
    try {
      await bridge()
    } catch {}
  },
  start: true,
  timeZone: 'Asia/Shanghai',
})
