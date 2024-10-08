import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Router } from "express"
import User from "../models/user.js"
import Theme from "../models/theme.js"

const router = Router()

router.post("/", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (!user) return res.status(401).json({ message: "Username not valid" })
  
  const match = 
    await bcrypt.compare(password, user.passwordHash)

  if (!match) return res.status(401).json({ message: "Password not valid" })

  const theme = await Theme.findOne({ user: user.id })

  const forToken = {
    id: user._id,
  }

  const access_token = jwt.sign(forToken, process.env.SECRET_KEY, {
    expiresIn: 60*60,
  })

  res.json({ message: 'User logged in', access_token, theme, username })
})

export default router
