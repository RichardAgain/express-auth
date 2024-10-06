import jwt from "jsonwebtoken"
import User from "../models/user.js"

const getRequestToken = (req, res, next) => {
  const authorization = req.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "")
  } else {
    console.log("no token")
  }

  next()
}

const getRequestUser =  async (req, res, next) => {
  const decoded = jwt.verify(req.token, process.env.SECRET_KEY)
  req.user_id = decoded.id

  const user = await User.findById(req.user_id)
  if (!user) {
    return res.status(401).json({ error: "Token invalid" })
  }

  next()
}

const checkAdmin = (req, res, next) => {
  const user = req.user_id

  console.log(user, " Admin?")
  next()
}

export { getRequestToken, getRequestUser, checkAdmin }
