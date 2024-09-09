import jwt from "jsonwebtoken"

const getTokenFrom = (request) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "")
  }

  return null
}

const authUser = (req, res, next) => {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET_KEY)

  req.user = decodedToken

  next()
}

const checkAdmin = (req, res, next) => {
  const user = req.user

  console.log(user, " Admin?")

  next()
}

export { authUser, checkAdmin }
