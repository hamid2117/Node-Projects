const jwt = require('jsonwebtoken')

const AuthMiddleware = async (req, _, next) => {
  const authHeader = req.headers.authorization
  console.log('run')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('No Token provided', 401)
  }
  const token = authHeader.split(' ')[1]
  console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    throw new CustomError('Unauthorized ', 401)
  }
}

module.exports = AuthMiddleware
