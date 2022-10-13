const jwt = require('jsonwebtoken')
const CustomError = require('../errors/custom-error')
const handleLogin = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new CustomError('Please provide both username & password', 400)
  }

  const id = new Date().getDate()
  console.log(id)

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(201).json({ username, token })
}

const handleDashbaord = (req, res) => {
  res.status(200).json({ msg: 'salam', secret: 'We always work for ALLAH.' })
}

module.exports = {
  handleDashbaord,
  handleLogin,
}
