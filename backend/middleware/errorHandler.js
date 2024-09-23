export default (error, req, res, next) => {
  console.error(error)

  switch (error.name) {
    case 'CastError':
      return res.status(400).send({ error: 'malformatted id' })
    case 'MongoServerError':
      if (error.message.includes('E11000 duplicate key error')) return res.status(400).send({ error: 'expected `username` to be unique' })
    case 'ValidationError':
      return res.status(400).json({ error: error.message })

    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'Invalid token' })
    case 'TokenExpiredError':
      return res.status(401).json({ error: 'Token Expired' })
  }
    
  next(error)
}