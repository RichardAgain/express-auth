import jwt from "jsonwebtoken"
import { Router } from "express"
import User from "../models/user.js"

import { authUser, checkAdmin } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/", authUser, checkAdmin, (req, res) => {
  res.json({ user: req.user })
})

router.post("/", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (!user) return res.status(401).json({ message: "Username not valid "})

  const dataForToken = {
    username: user.username,
    id: user._id
  }

  const token = 
    jwt.sign(dataForToken, process.env.SECRET_KEY, {
      expiresIn: 240
    })

  res.json({ token, username })
})

export default router
