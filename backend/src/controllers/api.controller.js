const User = require('../models/user.model')

const getData = async (req, res) => {
  const token = req.headers['x-access-token']
  try {
    const decode = jwt.verify(token, 'secret1258')
    const email = decode.email
    const user = await User.findOne({ email: email })
    res.json({
      status: 'ok',
      name: user.firstname,
      email: user.email,
      funded: user.funded,
      invest: user.investment,
      transaction: user.transaction,
      withdraw: user.withdraw
    })
  } catch (error) {
    res.json({ status: 'error' })
  }
}

const fundWallet = async (req, res) => {
  try {
    const email = req.body.email
    const incomingAmount = req.body.amount
    const user = await User.findOne({ email: email })
    await User.updateOne(
      { email: email },
      {
        funded: incomingAmount + user.funded,
        transaction: user.transaction + 1
      }
    )
    res.json({ status: 'ok', funded: req.body.amount })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error' })
  }
})

const invest = async (req, res) => {
  const token = req.headers['x-access-token']
  try {
    const decode = jwt.verify(token, 'secret1258')
    const email = decode.email
    const user = await User.findOne({ email: email })

    const money = (() => {
      switch (req.body.amount.percent) {
        case '14%':
          return (req.body.amount.value * 14) / 100
        case '28%':
          return (req.body.amount.value * 28) / 100
        case '35%':
          return (req.body.amount.value * 35) / 100
      }
    })()
    console.log(money)
    const date = new Date()
    if (
      req.body.amount.value >= req.body.amount.min &&
      req.body.amount.value <= req.body.amount.max
    ) {
      if (user.funded > req.body.amount.value) {
        await User.updateOne(
          { email: email },
          {
            $set: {funded: user.funded - req.body.amount.value}
          }
        )
        await User.updateOne(
          { email: email },
          {
            $set: {investment: req.body.amount.value + money}
          }
        )
        await User.updateOne(
          { email: email },
          {
            $set: {lapTime: date.getTime()}
          }
        )
        res.json({ status: 'ok', amount: money })
        return { status: 'ok' }
      } else {
        res.json({
          message: 'you do not have sufficient amount in your account'
        })
      }
    } else {
      res.json({
        status: 'error',
        message: ' you entered an amount either less or beyond investmet range'
      })
    }
  } catch (error) {
    res.json({ status: 'error' })
  }
}

const withdraw = async (req, res) => {
  const token = req.headers['x-access-token']
  try {
    const decode = jwt.verify(token, 'secret1258')
    const email = decode.email
    const user = await User.findOne({ email: email })
    if (user.funded >= req.body.WithdrawAmount) {
      await User.updateOne(
        { email: email },
        { $set: { funded: user.funded - req.body.WithdrawAmount } }
      )
      await User.updateOne(
        { email: email },
        { $set: { withdraw: user.withdraw + req.body.WithdrawAmount } }
      )
      res.json({ status: 'ok', withdraw: req.body.WithdrawAmount })
      console.log({ status: req.body.WithdrawAmount })
    } else {
      res.json({ message: 'you do not have sufficient amount in your account' })
    }
  } catch (error) {
    console.log(error)
    res.json({ status: 'error' })
  }
})

const getUsers = async (req, res) => {
  const users = await User.find()
  res.json(users)
  console.log(users)
})

module.exports = { getData, fundWallet, invest, withdraw, getUsers }
