import jwt from "jsonwebtoken"
import { Router } from "express"
import User from "../models/user.js"

const router = Router()

router.post("/", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (!user) return res.status(401).json({ message: "Username not valid " })

  const dataForToken = {
    username: user.username,
    id: user._id,
  }

  const access_token = jwt.sign(dataForToken, process.env.SECRET_KEY, {
    expiresIn: 60*5,
  })

  res.json({ access_token, username })
})

export default router
