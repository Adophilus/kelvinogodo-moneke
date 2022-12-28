const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Token = require('../models/token.model')

const verify = async (req, res) => {
  const token = req.headers['x-access-token']
  try {
    const decode = jwt.verify(token, 'secret1258')
    const email = decode.email
    const user = await User.findOne({ email: email })
    if(user.rememberme){
      res.json({
        status: 'ok',
      })
    }
    else{
      res.json({
        status: 'false',
      })
    }
  } catch (error) {
    res.json({ status: `error ${error}` })
  }
}

const loginUser = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password
  })
  if (user) {
    const token = jwt.sign(
      {
        email: user.email,
        password: user.password
      },
      'secret1258'
    )
    return res.json({ status: 'ok', user: token })
  } else {
    return res.json({ status: 'error', user: false })
  }
}

const registerUser = async (req, res) => {
  try {
     await User.create({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      funded: 0,
      investment: 0,
      transaction: [],
      withdraw: [],
      lapTime: 0,
      rememberme:false
    });
    let user = await User.findOne({email:req.body.email})
    const token = await Token.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex")
    })

    const url= `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`
    console.log(process.env)
    // console.log(process.env)
    await sendEmail(user.email,'verify email',url)
    return res.json({ status: 'ok' })
  } catch (error) {
    console.log(error)
    return res.json({ status: 'error', error: 'duplicate email' })
  }
}


module.exports = { verifyUser, loginUser, registerUser }
