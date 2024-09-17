import jwt from "jsonwebtoken"
import { Router } from "express"
import User from "../models/user.js"
import bcrypt from "bcrypt"

const router = Router()

router.post("/", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (!user) return res.status(401).json({ message: "Username not valid" })
  
  const match = 
    await bcrypt.compare(password, user.passwordHash)

  if (!match) return res.status(401).json({ message: "Password not valid" })

  const forToken = {
    id: user._id,
    username: user.username,
    email: user.email,
    name: user.name,
    gender: user.gender,
    dob: user.dob,
    phone: user.phone,
    cell: user.cell,
    nat: user.nat,
    location: user.location,
  }

  const access_token = jwt.sign(forToken, process.env.SECRET_KEY, {
    expiresIn: 60*60,
  })

  res.json({ message: 'User logged in', access_token })
})

export default router
