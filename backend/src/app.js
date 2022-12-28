const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()
const config = require('./config')

const routes = require('./routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("combined"))
app.use(routes)

module.exports = {
  start() {
    mongoose.connect(config.db.url).then(() =>
      app.listen(config.app.port, () => {
        console.log(`Server is running on port: ${config.app.port}`)
      })
    )
  }
}

// // const change = (users, now) => {
// //   users.forEach(async (user) => {
// //     if (user.funded > 0) {
// //       await User.updateOne(
// //         { email: user.email },
// //         {
// //           investment: user.investment + 100
// //         }
// //       )
// //       console.log(`laptime: ${user.lapTime} now:${now}`)
// //     }
// //   })
// // }

// // setInterval(async () => {
// //   const users = (await User.find()) ?? []
// //   const now = Date.now()
// //   change(users, now)
// // }, 600000)

// closeInterval=(users,now)=>{
//   users.forEach(async(user) =>{
//     if(user.funded > 0 && now - 60480000 <= user.lapTime){
//     await User.updateOne(
//       { email: user.email },
//       {funded: user.funded + user.investment,
//         investment: 0
//       })}
// })}
// setInterval(async() => {
//   const d = new Date
//   const now = d.getTime()
//   const users = await User.find()
//   closeInterval(users,now)
// }, 60480000);
